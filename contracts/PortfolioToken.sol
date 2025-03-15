// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PortfolioToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18; // 1 million tokens with 18 decimals
    
    constructor() ERC20("Portfolio Token", "PORT") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    // Example of a simple staking mechanism
    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public stakingTimestamp;
    
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);
    
    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Transfer tokens to contract
        _transfer(msg.sender, address(this), amount);
        
        // Update staking records
        stakedBalances[msg.sender] += amount;
        stakingTimestamp[msg.sender] = block.timestamp;
        
        emit Staked(msg.sender, amount);
    }
    
    function unstake() external {
        uint256 stakedAmount = stakedBalances[msg.sender];
        require(stakedAmount > 0, "No tokens staked");
        
        // Calculate reward based on staking duration (simplified example)
        uint256 stakingDuration = block.timestamp - stakingTimestamp[msg.sender];
        uint256 reward = (stakedAmount * stakingDuration * 5) / (365 days * 100); // 5% APY simplified
        
        // Clear staking data
        stakedBalances[msg.sender] = 0;
        
        // Return staked tokens plus reward
        _transfer(address(this), msg.sender, stakedAmount);
        _mint(msg.sender, reward);
        
        emit Unstaked(msg.sender, stakedAmount, reward);
    }
}