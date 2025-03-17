// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title IPortfolioToken
 * @dev Interface for the PortfolioToken contract which extends ERC20 functionality with staking
 * @author Michael Bennett
 */
interface IPortfolioToken is IERC20 {
    /**
     * @dev Emitted when a user stakes tokens
     * @param user Address of the user who staked tokens
     * @param amount Amount of tokens staked
     */
    event Staked(address indexed user, uint256 amount);
    
    /**
     * @dev Emitted when a user unstakes tokens and receives rewards
     * @param user Address of the user who unstaked tokens
     * @param amount Amount of tokens unstaked
     * @param reward Amount of reward tokens minted to the user
     */
    event Unstaked(address indexed user, uint256 amount, uint256 reward);

    /**
     * @dev Returns the amount of tokens that the owner is allowed to mint
     */
    function INITIAL_SUPPLY() external view returns (uint256);
    
    /**
     * @dev Returns the amount of tokens staked by a specific address
     * @param account Address to check staked balance for
     * @return The amount of tokens staked by the account
     */
    function stakedBalances(address account) external view returns (uint256);
    
    /**
     * @dev Returns the timestamp when an address staked their tokens
     * @param account Address to check staking timestamp for
     * @return The timestamp when the account staked their tokens
     */
    function stakingTimestamp(address account) external view returns (uint256);
    
    /**
     * @dev Mints new tokens and assigns them to the given account
     * @param to The account that will receive the created tokens
     * @param amount The amount of tokens to mint
     * @return True if the operation was successful
     */
    function mint(address to, uint256 amount) external returns (bool);
    
    /**
     * @dev Destroys tokens from the caller's account, reducing the total supply
     * @param amount The amount of tokens to burn
     * @return True if the operation was successful
     */
    function burn(uint256 amount) external returns (bool);
    
    /**
     * @dev Allows users to stake a specific amount of tokens
     * @param amount The amount of tokens to stake
     * @return True if the staking was successful
     */
    function stake(uint256 amount) external returns (bool);
    
    /**
     * @dev Allows users to unstake their tokens and receive rewards
     * @return The total amount received (original stake + rewards)
     */
    function unstake() external returns (uint256);
}
