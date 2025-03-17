const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const PortfolioNFT = await hre.ethers.getContractFactory("PortfolioNFT");
  
  // Deploy the contract
  console.log("Deploying PortfolioNFT...");
  const nft = await PortfolioNFT.deploy();
  
  // Wait for deployment to finish
  await nft.deployed();
  
  console.log("PortfolioNFT deployed to:", nft.address);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
