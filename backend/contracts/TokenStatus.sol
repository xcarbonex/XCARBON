// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title TokenStatus
 * @notice Records token state transitions for compliance
 * @dev Tracks lifecycle: active → locked → retired/soulbound
 */
contract TokenStatus is AccessControl {
    bytes32 public constant STATUS_MANAGER_ROLE = keccak256("STATUS_MANAGER_ROLE");

    enum State {
        Active,        // 0: Transferable, not retired
        Locked,        // 1: Temporarily locked
        Retired,       // 2: Retired, non-transferable
        Soulbound,     // 3: Permanently bound to owner
        Burned         // 4: Destroyed
    }

    struct TokenRecord {
        address token;
        uint256 tokenId;
        State state;
        bytes32 reasonHash;
        bytes32 actionId;      // Links to ComplianceAnchorRegistry
        address updatedBy;
        uint256 updatedAt;
    }

    // tokenKey = keccak256(abi.encodePacked(chainId, token, tokenId))
    mapping(bytes32 => TokenRecord) public tokenRecords;
    mapping(bytes32 => TokenRecord[]) public tokenHistory;
    
    event TokenStateChanged(
        bytes32 indexed tokenKey,
        bytes32 indexed actionId,
        address indexed token,
        uint256 tokenId,
        State previousState,
        State newState,
        bytes32 reasonHash,
        address updatedBy
    );

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(STATUS_MANAGER_ROLE, msg.sender);
    }

    /**
     * @notice Update token state
     * @param chainId Chain identifier
     * @param token Token contract address
     * @param tokenId Token ID (use 0 for ERC20)
     * @param newState New state
     * @param reasonHash Hash of reason/justification
     * @param actionId Compliance action ID from ComplianceAnchorRegistry
     */
    function updateTokenState(
        uint256 chainId,
        address token,
        uint256 tokenId,
        State newState,
        bytes32 reasonHash,
        bytes32 actionId
    ) external onlyRole(STATUS_MANAGER_ROLE) {
        require(token != address(0), "Invalid token address");
        require(actionId != bytes32(0), "Action ID required");

        bytes32 tokenKey = deriveTokenKey(chainId, token, tokenId);
        TokenRecord memory currentRecord = tokenRecords[tokenKey];
        State previousState = currentRecord.state;

        // State transition validation
        _validateTransition(previousState, newState);

        TokenRecord memory newRecord = TokenRecord({
            token: token,
            tokenId: tokenId,
            state: newState,
            reasonHash: reasonHash,
            actionId: actionId,
            updatedBy: msg.sender,
            updatedAt: block.timestamp
        });

        tokenRecords[tokenKey] = newRecord;
        tokenHistory[tokenKey].push(newRecord);

        emit TokenStateChanged(
            tokenKey,
            actionId,
            token,
            tokenId,
            previousState,
            newState,
            reasonHash,
            msg.sender
        );
    }

    /**
     * @notice Batch update token states
     */
    function batchUpdateTokenStates(
        uint256[] calldata chainIds,
        address[] calldata tokens,
        uint256[] calldata tokenIds,
        State[] calldata newStates,
        bytes32[] calldata reasonHashes,
        bytes32[] calldata actionIds
    ) external onlyRole(STATUS_MANAGER_ROLE) {
        uint256 count = chainIds.length;
        require(
            tokens.length == count &&
            tokenIds.length == count &&
            newStates.length == count &&
            reasonHashes.length == count &&
            actionIds.length == count,
            "Array length mismatch"
        );

        for (uint256 i = 0; i < count; i++) {
            bytes32 tokenKey = deriveTokenKey(chainIds[i], tokens[i], tokenIds[i]);
            TokenRecord memory currentRecord = tokenRecords[tokenKey];
            State previousState = currentRecord.state;

            _validateTransition(previousState, newStates[i]);

            TokenRecord memory newRecord = TokenRecord({
                token: tokens[i],
                tokenId: tokenIds[i],
                state: newStates[i],
                reasonHash: reasonHashes[i],
                actionId: actionIds[i],
                updatedBy: msg.sender,
                updatedAt: block.timestamp
            });

            tokenRecords[tokenKey] = newRecord;
            tokenHistory[tokenKey].push(newRecord);

            emit TokenStateChanged(
                tokenKey,
                actionIds[i],
                tokens[i],
                tokenIds[i],
                previousState,
                newStates[i],
                reasonHashes[i],
                msg.sender
            );
        }
    }

    /**
     * @notice Derive deterministic token key
     */
    function deriveTokenKey(uint256 chainId, address token, uint256 tokenId) 
        public 
        pure 
        returns (bytes32) 
    {
        return keccak256(abi.encodePacked(chainId, token, tokenId));
    }

    /**
     * @notice Get current token state
     */
    function getTokenState(uint256 chainId, address token, uint256 tokenId) 
        external 
        view 
        returns (TokenRecord memory) 
    {
        bytes32 tokenKey = deriveTokenKey(chainId, token, tokenId);
        return tokenRecords[tokenKey];
    }

    /**
     * @notice Get token state history
     */
    function getTokenHistory(uint256 chainId, address token, uint256 tokenId) 
        external 
        view 
        returns (TokenRecord[] memory) 
    {
        bytes32 tokenKey = deriveTokenKey(chainId, token, tokenId);
        return tokenHistory[tokenKey];
    }

    /**
     * @notice Check if token can be transferred
     */
    function isTransferable(uint256 chainId, address token, uint256 tokenId) 
        external 
        view 
        returns (bool) 
    {
        bytes32 tokenKey = deriveTokenKey(chainId, token, tokenId);
        State state = tokenRecords[tokenKey].state;
        return state == State.Active;
    }

    /**
     * @notice Validate state transition
     */
    function _validateTransition(State from, State to) internal pure {
        // Active can go anywhere
        if (from == State.Active) return;
        
        // Locked can go to Active or Retired/Soulbound/Burned
        if (from == State.Locked) {
            require(
                to == State.Active || 
                to == State.Retired || 
                to == State.Soulbound || 
                to == State.Burned,
                "Invalid transition from Locked"
            );
            return;
        }
        
        // Retired/Soulbound can only go to Burned
        if (from == State.Retired || from == State.Soulbound) {
            require(to == State.Burned, "Can only burn retired/soulbound tokens");
            return;
        }
        
        // Burned is terminal
        if (from == State.Burned) {
            revert("Cannot change state of burned token");
        }
    }
}
