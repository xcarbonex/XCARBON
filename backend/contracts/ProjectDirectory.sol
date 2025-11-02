// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title ProjectDirectory
 * @notice Canonical on-chain directory of carbon projects
 * @dev Maps (registry, project_id) to deterministic projectKey with metadata pointers
 */
contract ProjectDirectory is AccessControl {
    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");

    struct Project {
        bytes32 projectKey;
        bytes32 registryHash;      // keccak256(lowercase(registry))
        bytes32 projectIdHash;     // keccak256(projectId)
        string registry;           // "VCS", "GS", "Puro", etc.
        string projectId;          // "191", "GS1234", etc.
        string uri;                // Metadata pointer (IPFS/HTTPS)
        bytes32 docHash;           // Hash of canonical project document
        uint256 registeredAt;
        address registeredBy;
    }

    mapping(bytes32 => Project) public projects;
    mapping(bytes32 => bool) public exists;
    bytes32[] public allProjects;

    event ProjectRegistered(
        bytes32 indexed projectKey,
        bytes32 registryHash,
        bytes32 projectIdHash,
        string registry,
        string projectId,
        string uri,
        bytes32 docHash,
        address registrar
    );

    event ProjectUpdated(
        bytes32 indexed projectKey,
        string uri,
        bytes32 docHash
    );

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(REGISTRAR_ROLE, msg.sender);
    }

    /**
     * @notice Register a new project or update existing
     * @param registry Registry name (e.g., "VCS", "Gold Standard")
     * @param projectId Project identifier within registry
     * @param uri Metadata pointer
     * @param docHash Document/metadata hash
     */
    function registerProject(
        string calldata registry,
        string calldata projectId,
        string calldata uri,
        bytes32 docHash
    ) external onlyRole(REGISTRAR_ROLE) returns (bytes32) {
        require(bytes(registry).length > 0, "Registry required");
        require(bytes(projectId).length > 0, "Project ID required");
        require(bytes(uri).length > 0, "URI required");

        // Derive deterministic project key
        bytes32 projectKey = deriveProjectKey(registry, projectId);
        bytes32 registryHash = keccak256(bytes(_toLower(registry)));
        bytes32 projectIdHash = keccak256(bytes(projectId));

        if (!exists[projectKey]) {
            // New registration
            Project memory newProject = Project({
                projectKey: projectKey,
                registryHash: registryHash,
                projectIdHash: projectIdHash,
                registry: registry,
                projectId: projectId,
                uri: uri,
                docHash: docHash,
                registeredAt: block.timestamp,
                registeredBy: msg.sender
            });

            projects[projectKey] = newProject;
            exists[projectKey] = true;
            allProjects.push(projectKey);

            emit ProjectRegistered(
                projectKey,
                registryHash,
                projectIdHash,
                registry,
                projectId,
                uri,
                docHash,
                msg.sender
            );
        } else {
            // Update metadata
            projects[projectKey].uri = uri;
            projects[projectKey].docHash = docHash;

            emit ProjectUpdated(projectKey, uri, docHash);
        }

        return projectKey;
    }

    /**
     * @notice Batch register projects
     */
    function batchRegisterProjects(
        string[] calldata registries,
        string[] calldata projectIds,
        string[] calldata uris,
        bytes32[] calldata docHashes
    ) external onlyRole(REGISTRAR_ROLE) {
        uint256 count = registries.length;
        require(
            projectIds.length == count &&
            uris.length == count &&
            docHashes.length == count,
            "Array length mismatch"
        );

        for (uint256 i = 0; i < count; i++) {
            bytes32 projectKey = deriveProjectKey(registries[i], projectIds[i]);
            bytes32 registryHash = keccak256(bytes(_toLower(registries[i])));
            bytes32 projectIdHash = keccak256(bytes(projectIds[i]));

            if (!exists[projectKey]) {
                Project memory newProject = Project({
                    projectKey: projectKey,
                    registryHash: registryHash,
                    projectIdHash: projectIdHash,
                    registry: registries[i],
                    projectId: projectIds[i],
                    uri: uris[i],
                    docHash: docHashes[i],
                    registeredAt: block.timestamp,
                    registeredBy: msg.sender
                });

                projects[projectKey] = newProject;
                exists[projectKey] = true;
                allProjects.push(projectKey);

                emit ProjectRegistered(
                    projectKey,
                    registryHash,
                    projectIdHash,
                    registries[i],
                    projectIds[i],
                    uris[i],
                    docHashes[i],
                    msg.sender
                );
            }
        }
    }

    /**
     * @notice Derive deterministic project key
     * @dev projectKey = keccak256(abi.encodePacked(lowercase(registry), ":", projectId))
     */
    function deriveProjectKey(string memory registry, string memory projectId) 
        public 
        pure 
        returns (bytes32) 
    {
        return keccak256(abi.encodePacked(_toLower(registry), ":", projectId));
    }

    /**
     * @notice Get project details
     */
    function getProject(bytes32 projectKey) external view returns (Project memory) {
        require(exists[projectKey], "Project not found");
        return projects[projectKey];
    }

    /**
     * @notice Lookup project by registry and ID
     */
    function lookupProject(string calldata registry, string calldata projectId) 
        external 
        view 
        returns (Project memory) 
    {
        bytes32 projectKey = deriveProjectKey(registry, projectId);
        require(exists[projectKey], "Project not found");
        return projects[projectKey];
    }

    /**
     * @notice Get total project count
     */
    function getProjectCount() external view returns (uint256) {
        return allProjects.length;
    }

    /**
     * @notice Get project keys by range
     */
    function getProjectsByRange(uint256 start, uint256 count) 
        external 
        view 
        returns (bytes32[] memory) 
    {
        require(start < allProjects.length, "Start out of bounds");
        
        uint256 end = start + count;
        if (end > allProjects.length) {
            end = allProjects.length;
        }
        
        bytes32[] memory result = new bytes32[](end - start);
        for (uint256 i = start; i < end; i++) {
            result[i - start] = allProjects[i];
        }
        
        return result;
    }

    /**
     * @notice Internal: convert string to lowercase
     */
    function _toLower(string memory str) internal pure returns (string memory) {
        bytes memory bStr = bytes(str);
        bytes memory bLower = new bytes(bStr.length);
        
        for (uint256 i = 0; i < bStr.length; i++) {
            if ((uint8(bStr[i]) >= 65) && (uint8(bStr[i]) <= 90)) {
                bLower[i] = bytes1(uint8(bStr[i]) + 32);
            } else {
                bLower[i] = bStr[i];
            }
        }
        
        return string(bLower);
    }
}
