# Ethereum Smart Contracts Portfolio

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue)
![OpenZeppelin](https://img.shields.io/badge/OpenZeppelin-4.9.0-blue)
![Hardhat](https://img.shields.io/badge/Hardhat-2.19.0-yellow)

A collection of Ethereum smart contracts showcasing token implementation, NFT creation, and DeFi mechanics. This repository demonstrates best practices in smart contract development, testing, and deployment.

## 📋 Project Overview

This portfolio includes:

- **ERC-20 Token Implementation** with staking functionality
- **ERC-721 NFT Collection** with customizable metadata
- **Comprehensive Testing Suite** demonstrating contract functionality
- **Deployment Scripts** for various networks
- **Development Environment Documentation**

## 📚 Smart Contracts

### PortfolioToken (ERC-20)

An ERC-20 token with additional functionality:

- Standard ERC-20 compliance
- Token minting (restricted to owner)
- Token burning
- Staking mechanism with time-based rewards
- Access control

### PortfolioNFT (ERC-721)

A customizable NFT collection with:

- ERC-721 standard compliance
- Metadata URI storage
- Limited supply enforcement
- Configurable minting price
- Owner withdrawal function

## 🛠️ Technology Stack

- **Solidity**: Smart contract language (v0.8.20)
- **Hardhat**: Development environment
- **OpenZeppelin Contracts**: Secure, standard implementations
- **Ethers.js**: Ethereum interaction library
- **Waffle/Chai**: Testing framework
- **TypeScript/JavaScript**: Scripting languages

## 👨‍💻 Development Environment

For details on the development environment, see [Development Environment Documentation](docs/development-environment.md).

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/mbennett-labs/ethereum-smart-contracts.git
   cd ethereum-smart-contracts
## Development Process

This repository includes documentation of the full development workflow:

- [Development Environment Setup](docs/development-environment.md)
- [Contract Interaction Examples](docs/contract-interaction.md)

![NFT Minting Example](docs/images/remix-nft-minting.svg)
