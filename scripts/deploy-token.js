const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const PortfolioToken = await hre.ethers.getContractFactory("PortfolioToken");
  
  // Deploy the contract
  console.log("Deploying PortfolioToken...");
  const token = await PortfolioToken.deploy();
  
  // Wait for deployment to finish
  await token.deployed();
  
  console.log("PortfolioToken deployed to:", token.address);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
