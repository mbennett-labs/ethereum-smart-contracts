# Smart Contract Architecture

This document outlines the architecture and design patterns used in the smart contracts of this repository.

## Overview

The smart contracts follow a modular architecture with clear separation of concerns:

- **Interfaces** define the contract APIs
- **Implementations** provide the concrete functionality
- **Libraries** contain shared utility functions

## Design Patterns

### Interface Segregation
Each contract has a dedicated interface that defines its public API. This makes it easier to:
- Maintain backward compatibility
- Allow multiple implementations
- Provide clear documentation

### Access Control
Access control is implemented using OpenZeppelin's Ownable contract, ensuring that:
- Critical functions are owner-restricted
- State-changing operations are properly protected
- Upgrades and withdrawals are secure

### State Management
Contracts follow a clean state management approach:
- Clear distinction between read and write operations
- Events emitted for all state changes
- Consistent error handling

## PortfolioToken Architecture

The token implements a staking mechanism with time-based rewards:
1. Users can stake tokens, which transfers them to the contract
2. Staking time is recorded for each user
3. When unstaking, rewards are calculated based on time elapsed
4. Original tokens plus rewards are returned to the user

## PortfolioNFT Architecture

The NFT contract implements a capped collection with customizable metadata:
1. Limited supply enforced by MAX_SUPPLY constant
2. Configurable minting price that can be updated by the owner
3. Metadata URIs can be set individually for each token
4. Owner can withdraw accumulated ETH from sales
