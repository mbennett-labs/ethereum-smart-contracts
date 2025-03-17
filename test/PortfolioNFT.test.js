const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PortfolioNFT", function () {
  let portfolioNFT;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here
    const PortfolioNFT = await ethers.getContractFactory("PortfolioNFT");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy a new PortfolioNFT contract before each test
    portfolioNFT = await PortfolioNFT.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await portfolioNFT.owner()).to.equal(owner.address);
    });

    it("Should have the correct name and symbol", async function () {
      expect(await portfolioNFT.name()).to.equal("Portfolio NFT Collection");
      expect(await portfolioNFT.symbol()).to.equal("PNFT");
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint without payment", async function () {
      await portfolioNFT.mintNFT(owner.address, "https://example.com/token/1");
      expect(await portfolioNFT.balanceOf(owner.address)).to.equal(1);
    });

    it("Should require payment for non-owner mint", async function () {
      const mintPrice = await portfolioNFT.mintPrice();
      
      // Try to mint without enough ETH
      await expect(
        portfolioNFT.connect(addr1).mintNFT(addr1.address, "https://example.com/token/1")
      ).to.be.reverted;
      
      // Mint with correct payment
      await portfolioNFT.connect(addr1).mintNFT(
        addr1.address, 
        "https://example.com/token/1",
        { value: mintPrice }
      );
      
      expect(await portfolioNFT.balanceOf(addr1.address)).to.equal(1);
    });
  });

  describe("Admin functions", function () {
    it("Should allow owner to set mint price", async function () {
      const newPrice = ethers.utils.parseEther("0.1");
      await portfolioNFT.setMintPrice(newPrice);
      expect(await portfolioNFT.mintPrice()).to.equal(newPrice);
    });
    
    it("Should allow owner to withdraw", async function () {
      // First, have a user mint an NFT to send ETH to the contract
      const mintPrice = await portfolioNFT.mintPrice();
      await portfolioNFT.connect(addr1).mintNFT(
        addr1.address, 
        "https://example.com/token/1",
        { value: mintPrice }
      );
      
      // Check contract has balance
      const contractBalance = await ethers.provider.getBalance(portfolioNFT.address);
      expect(contractBalance).to.equal(mintPrice);
      
      // Owner withdraws
      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
      await portfolioNFT.withdraw();
      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      
      // Owner should have received funds (minus gas costs)
      expect(ownerBalanceAfter.gt(ownerBalanceBefore)).to.be.true;
    });
  });
});
