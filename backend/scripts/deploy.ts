import { ethers } from "hardhat";

async function main() {
  console.log("Deploying XCARBON Compliance Contracts...");

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy ComplianceAnchorRegistry
  console.log("\n1. Deploying ComplianceAnchorRegistry...");
  const ComplianceAnchorRegistry = await ethers.getContractFactory("ComplianceAnchorRegistry");
  const complianceAnchor = await ComplianceAnchorRegistry.deploy();
  await complianceAnchor.waitForDeployment();
  const complianceAnchorAddress = await complianceAnchor.getAddress();
  console.log("✓ ComplianceAnchorRegistry deployed to:", complianceAnchorAddress);

  // Deploy ProjectDirectory
  console.log("\n2. Deploying ProjectDirectory...");
  const ProjectDirectory = await ethers.getContractFactory("ProjectDirectory");
  const projectDirectory = await ProjectDirectory.deploy();
  await projectDirectory.waitForDeployment();
  const projectDirectoryAddress = await projectDirectory.getAddress();
  console.log("✓ ProjectDirectory deployed to:", projectDirectoryAddress);

  // Deploy TokenStatus
  console.log("\n3. Deploying TokenStatus...");
  const TokenStatus = await ethers.getContractFactory("TokenStatus");
  const tokenStatus = await TokenStatus.deploy();
  await tokenStatus.waitForDeployment();
  const tokenStatusAddress = await tokenStatus.getAddress();
  console.log("✓ TokenStatus deployed to:", tokenStatusAddress);

  // Grant roles (optional - for multi-service architecture)
  console.log("\n4. Setting up roles...");
  
  // ComplianceAnchorRegistry roles
  const ANCHORER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("ANCHORER_ROLE"));
  const AUDITOR_ROLE = ethers.keccak256(ethers.toUtf8Bytes("AUDITOR_ROLE"));
  
  // ProjectDirectory roles
  const REGISTRAR_ROLE = ethers.keccak256(ethers.toUtf8Bytes("REGISTRAR_ROLE"));
  
  // TokenStatus roles
  const STATUS_MANAGER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("STATUS_MANAGER_ROLE"));

  console.log("✓ Deployer has all admin roles by default");
  
  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("DEPLOYMENT COMPLETE");
  console.log("=".repeat(60));
  console.log("\nContract Addresses:");
  console.log("-------------------");
  console.log("ComplianceAnchorRegistry:", complianceAnchorAddress);
  console.log("ProjectDirectory:        ", projectDirectoryAddress);
  console.log("TokenStatus:             ", tokenStatusAddress);
  
  console.log("\nRole Hashes:");
  console.log("------------");
  console.log("ANCHORER_ROLE:        ", ANCHORER_ROLE);
  console.log("AUDITOR_ROLE:         ", AUDITOR_ROLE);
  console.log("REGISTRAR_ROLE:       ", REGISTRAR_ROLE);
  console.log("STATUS_MANAGER_ROLE:  ", STATUS_MANAGER_ROLE);
  
  console.log("\nEnvironment Variables (add to .env):");
  console.log("--------------------------------------");
  console.log(`COMPLIANCE_ANCHOR_ADDRESS=${complianceAnchorAddress}`);
  console.log(`PROJECT_DIRECTORY_ADDRESS=${projectDirectoryAddress}`);
  console.log(`TOKEN_STATUS_ADDRESS=${tokenStatusAddress}`);
  console.log(`DEPLOYER_PRIVATE_KEY=${process.env.DEPLOYER_PRIVATE_KEY || "<your-private-key>"}`);
  
  console.log("\n" + "=".repeat(60));
  console.log("\nNext steps:");
  console.log("1. Update .env with the contract addresses above");
  console.log("2. Grant roles to backend service accounts if needed:");
  console.log("   - ANCHORER_ROLE for compliance service");
  console.log("   - REGISTRAR_ROLE for sync service");
  console.log("   - STATUS_MANAGER_ROLE for tokenization service");
  console.log("3. Verify contracts on block explorer (if on testnet/mainnet)");
  console.log("4. Start the backend API server");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
