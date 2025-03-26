// test/TokenStaking.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PortfolioToken Staking", function () {
  let portfolioToken;
  let owner;
  let staker;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers
    const PortfolioToken = await ethers.getContractFactory("PortfolioToken");
    [owner, staker, ...addrs] = await ethers.getSigners();

    // Deploy a new PortfolioToken contract before each test
    portfolioToken = await PortfolioToken.deploy();
    
    // Transfer 10,000 tokens to staker for testing
    await portfolioToken.transfer(staker.address, ethers.utils.parseEther("10000"));
  });

  describe("Staking Mechanism", function () {
    it("Should allow users to stake tokens", async function () {
      const stakeAmount = ethers.utils.parseEther("1000");
      
      // Get initial balances
      const initialBalance = await portfolioToken.balanceOf(staker.address);
      
      // Stake tokens
      await portfolioToken.connect(staker).stake(stakeAmount);
      
      // Check staked amount is recorded
      const stakedBalance = await portfolioToken.stakedBalances(staker.address);
      expect(stakedBalance).to.equal(stakeAmount);
      
      // Check token balance is reduced
      const finalBalance = await portfolioToken.balanceOf(staker.address);
      expect(finalBalance).to.equal(initialBalance.sub(stakeAmount));
      
      // Check timestamp is recorded
      const timestamp = await portfolioToken.stakingTimestamp(staker.address);
      expect(timestamp).to.be.above(0);
    });

    it("Should not allow staking more tokens than the user has", async function () {
      const stakerBalance = await portfolioToken.balanceOf(staker.address);
      const tooMuch = stakerBalance.add(ethers.utils.parseEther("1"));
      
      // Try to stake more than balance
      await expect(
        portfolioToken.connect(staker).stake(tooMuch)
      ).to.be.reverted;
    });

    it("Should not allow staking zero tokens", async function () {
      await expect(
        portfolioToken.connect(staker).stake(0)
      ).to.be.revertedWith("Cannot stake 0 tokens");
    });
    
    it("Should allow users to unstake tokens with rewards", async function () {
      const stakeAmount = ethers.utils.parseEther("1000");
      
      // Stake tokens
      await portfolioToken.connect(staker).stake(stakeAmount);
      const initialTotalSupply = await portfolioToken.totalSupply();
      
      // Advance time to simulate staking period
      // Move forward 30 days
      await ethers.provider.send("evm_increaseTime", [30 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine");
      
      // Get balance before unstaking
      const balanceBefore = await portfolioToken.balanceOf(staker.address);
      
      // Unstake tokens
      await portfolioToken.connect(staker).unstake();
      
      // Check staked balance is cleared
      const stakedBalance = await portfolioToken.stakedBalances(staker.address);
      expect(stakedBalance).to.equal(0);
      
      // Check tokens returned with reward
      const balanceAfter = await portfolioToken.balanceOf(staker.address);
      
      // User should receive back at least their original stake
      expect(balanceAfter).to.be.above(balanceBefore.add(stakeAmount));
      
      // Total supply should increase due to minted rewards
      const finalTotalSupply = await portfolioToken.totalSupply();
      expect(finalTotalSupply).to.be.above(initialTotalSupply);
    });
    
    it("Should not allow unstaking if no tokens are staked", async function () {
      // Try to unstake without staking first
      await expect(
        portfolioToken.connect(staker).unstake()
      ).to.be.revertedWith("No tokens staked");
    });
  });
});