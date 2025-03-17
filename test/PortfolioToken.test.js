const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PortfolioToken", function () {
  let portfolioToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here
    const PortfolioToken = await ethers.getContractFactory("PortfolioToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy a new PortfolioToken contract before each test
    portfolioToken = await PortfolioToken.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await portfolioToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await portfolioToken.balanceOf(owner.address);
      expect(await portfolioToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await portfolioToken.transfer(addr1.address, 50);
      const addr1Balance = await portfolioToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      // Transfer 50 tokens from addr1 to addr2
      await portfolioToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await portfolioToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await portfolioToken.balanceOf(owner.address);

      // Try to send 1 token from addr1 (0 tokens) to owner
      await expect(
        portfolioToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.reverted;

      // Owner balance shouldn't have changed
      expect(await portfolioToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });

  describe("Staking", function () {
    it("Should allow users to stake tokens", async function () {
      // Transfer 100 tokens from owner to addr1
      await portfolioToken.transfer(addr1.address, 100);
      
      // Stake 50 tokens from addr1
      await portfolioToken.connect(addr1).stake(50);
      
      // Check staked balance
      expect(await portfolioToken.stakedBalances(addr1.address)).to.equal(50);
      
      // Check addr1's token balance decreased
      expect(await portfolioToken.balanceOf(addr1.address)).to.equal(50);
    });
  });
});
