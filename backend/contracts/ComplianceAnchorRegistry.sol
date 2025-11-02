// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ComplianceAnchorRegistry
 * @notice Append-only registry for compliance action anchors
 * @dev Every regulated backend action emits an immutable on-chain anchor
 * 
 * Key principles:
 * - Append-only: no edits, only supersessions
 * - Minimal PII: only hashes and pointers
 * - Deterministic IDs: content-addressable
 * - RBAC: role-based access, no ecrecover reliance
 */
contract ComplianceAnchorRegistry is AccessControl, ReentrancyGuard {
    bytes32 public constant ANCHORER_ROLE = keccak256("ANCHORER_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");

    struct Anchor {
        bytes32 actionId;
        bytes32 caseId;
        bytes32 projectKey;
        bytes32 actionType;
        bytes32 payloadHash;
        bytes32 merkleRoot;
        bytes32 supersedes;
        string uri;
        string jurisdictionCode;
        string[] standards;
        address actor;
        uint256 timestamp;
        uint256 blockNumber;
    }

    // Storage
    mapping(bytes32 => Anchor) public anchors;
    mapping(bytes32 => bool) public exists;
    mapping(bytes32 => bytes32[]) public caseIndex;  // caseId => actionIds[]
    mapping(bytes32 => bytes32[]) public projectIndex; // projectKey => actionIds[]
    
    uint256 public anchorCount;

    // Events
    event Anchored(
        bytes32 indexed actionId,
        bytes32 indexed caseId,
        bytes32 indexed projectKey,
        bytes32 actionType,
        bytes32 payloadHash,
        bytes32 merkleRoot,
        bytes32 supersedes,
        string uri,
        string jurisdictionCode,
        string[] standards,
        address actor,
        uint256 timestamp
    );

    event BatchAnchored(
        bytes32[] actionIds,
        bytes32 merkleRoot,
        uint256 count
    );

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ANCHORER_ROLE, msg.sender);
        _grantRole(AUDITOR_ROLE, msg.sender);
    }

    /**
     * @notice Anchor a single compliance action
     * @param actionId Content-addressable identifier
     * @param caseId Case/session identifier
     * @param projectKey Canonical project key (registry:projectId hash)
     * @param actionType Action type hash (e.g., keccak256("Reservation.Created.v1"))
     * @param payloadHash keccak256 of canonicalized JSON payload
     * @param merkleRoot Optional Merkle root for batched evidence
     * @param supersedes Previous actionId if this corrects/supersedes
     * @param uri Off-chain evidence pointer (IPFS/HTTPS)
     * @param jurisdictionCode ISO code (SG, US, EU, etc.)
     * @param standards Array of applicable standards (PSN02, MiCA, etc.)
     */
    function anchor(
        bytes32 actionId,
        bytes32 caseId,
        bytes32 projectKey,
        bytes32 actionType,
        bytes32 payloadHash,
        bytes32 merkleRoot,
        bytes32 supersedes,
        string calldata uri,
        string calldata jurisdictionCode,
        string[] calldata standards
    ) external onlyRole(ANCHORER_ROLE) nonReentrant {
        require(actionId != bytes32(0), "Invalid actionId");
        require(caseId != bytes32(0), "Invalid caseId");
        require(payloadHash != bytes32(0), "Invalid payloadHash");
        require(!exists[actionId], "Action already anchored");
        require(bytes(uri).length > 0, "URI required");

        if (supersedes != bytes32(0)) {
            require(exists[supersedes], "Superseded action must exist");
        }

        Anchor memory newAnchor = Anchor({
            actionId: actionId,
            caseId: caseId,
            projectKey: projectKey,
            actionType: actionType,
            payloadHash: payloadHash,
            merkleRoot: merkleRoot,
            supersedes: supersedes,
            uri: uri,
            jurisdictionCode: jurisdictionCode,
            standards: standards,
            actor: msg.sender,
            timestamp: block.timestamp,
            blockNumber: block.number
        });

        anchors[actionId] = newAnchor;
        exists[actionId] = true;
        caseIndex[caseId].push(actionId);
        
        if (projectKey != bytes32(0)) {
            projectIndex[projectKey].push(actionId);
        }

        anchorCount++;

        emit Anchored(
            actionId,
            caseId,
            projectKey,
            actionType,
            payloadHash,
            merkleRoot,
            supersedes,
            uri,
            jurisdictionCode,
            standards,
            msg.sender,
            block.timestamp
        );
    }

    /**
     * @notice Anchor multiple actions in a single transaction (gas optimization)
     * @param actionIds Array of action identifiers
     * @param caseIds Array of case identifiers
     * @param projectKeys Array of project keys
     * @param actionTypes Array of action types
     * @param payloadHashes Array of payload hashes
     * @param merkleRoot Single Merkle root covering all payloads
     * @param uris Array of evidence URIs
     * @param jurisdictionCode Single jurisdiction for batch
     * @param standards Standards applicable to all actions
     */
    function batchAnchor(
        bytes32[] calldata actionIds,
        bytes32[] calldata caseIds,
        bytes32[] calldata projectKeys,
        bytes32[] calldata actionTypes,
        bytes32[] calldata payloadHashes,
        bytes32 merkleRoot,
        string[] calldata uris,
        string calldata jurisdictionCode,
        string[] calldata standards
    ) external onlyRole(ANCHORER_ROLE) nonReentrant {
        uint256 count = actionIds.length;
        require(count > 0 && count <= 100, "Invalid batch size");
        require(
            caseIds.length == count &&
            projectKeys.length == count &&
            actionTypes.length == count &&
            payloadHashes.length == count &&
            uris.length == count,
            "Array length mismatch"
        );

        for (uint256 i = 0; i < count; i++) {
            require(actionIds[i] != bytes32(0), "Invalid actionId");
            require(caseIds[i] != bytes32(0), "Invalid caseId");
            require(payloadHashes[i] != bytes32(0), "Invalid payloadHash");
            require(!exists[actionIds[i]], "Action already anchored");

            Anchor memory newAnchor = Anchor({
                actionId: actionIds[i],
                caseId: caseIds[i],
                projectKey: projectKeys[i],
                actionType: actionTypes[i],
                payloadHash: payloadHashes[i],
                merkleRoot: merkleRoot,
                supersedes: bytes32(0),
                uri: uris[i],
                jurisdictionCode: jurisdictionCode,
                standards: standards,
                actor: msg.sender,
                timestamp: block.timestamp,
                blockNumber: block.number
            });

            anchors[actionIds[i]] = newAnchor;
            exists[actionIds[i]] = true;
            caseIndex[caseIds[i]].push(actionIds[i]);
            
            if (projectKeys[i] != bytes32(0)) {
                projectIndex[projectKeys[i]].push(actionIds[i]);
            }

            emit Anchored(
                actionIds[i],
                caseIds[i],
                projectKeys[i],
                actionTypes[i],
                payloadHashes[i],
                merkleRoot,
                bytes32(0),
                uris[i],
                jurisdictionCode,
                standards,
                msg.sender,
                block.timestamp
            );
        }

        anchorCount += count;

        emit BatchAnchored(actionIds, merkleRoot, count);
    }

    /**
     * @notice Get all actions for a case
     */
    function getCaseActions(bytes32 caseId) external view returns (bytes32[] memory) {
        return caseIndex[caseId];
    }

    /**
     * @notice Get all actions for a project
     */
    function getProjectActions(bytes32 projectKey) external view returns (bytes32[] memory) {
        return projectIndex[projectKey];
    }

    /**
     * @notice Verify an anchor exists with expected payload hash
     */
    function verify(bytes32 actionId, bytes32 expectedPayloadHash) external view returns (bool) {
        if (!exists[actionId]) return false;
        return anchors[actionId].payloadHash == expectedPayloadHash;
    }

    /**
     * @notice Get full anchor details
     */
    function getAnchor(bytes32 actionId) external view returns (Anchor memory) {
        require(exists[actionId], "Anchor does not exist");
        return anchors[actionId];
    }

    /**
     * @notice Get case timeline (action sequence)
     */
    function getCaseTimeline(bytes32 caseId) external view returns (Anchor[] memory) {
        bytes32[] memory actionIds = caseIndex[caseId];
        Anchor[] memory timeline = new Anchor[](actionIds.length);
        
        for (uint256 i = 0; i < actionIds.length; i++) {
            timeline[i] = anchors[actionIds[i]];
        }
        
        return timeline;
    }
}
