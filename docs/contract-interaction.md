# Smart Contract Interaction

This document demonstrates how to interact with the smart contracts in this repository.

## NFT Minting Process

The following steps illustrate how to mint an NFT using the PortfolioNFT contract:

1. **Deploy the Contract**
   - Select appropriate environment
   - Deploy with constructor parameters if needed

2. **Mint a New NFT**
   - Provide recipient address
   - Provide token URI (metadata location)
   - Execute the transaction
   
   ![NFT Minting Process](images/remix-nft-minting.svg)

3. **Transaction Results**
   - The transaction emits Transfer and MetadataUpdate events
   - Token ID is returned from the function
   - Contract state is updated to reflect ownership
