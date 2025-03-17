// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title IPortfolioNFT
 * @dev Interface for the PortfolioNFT contract which extends ERC721 functionality
 * @author Michael Bennett
 */
interface IPortfolioNFT is IERC721 {
    /**
     * @dev Returns the maximum supply of NFTs
     */
    function MAX_SUPPLY() external view returns (uint256);
    
    /**
     * @dev Returns the current price to mint an NFT
     */
    function mintPrice() external view returns (uint256);
    
    /**
     * @dev Creates a new token for `recipient` with the given `tokenURI`
     * @param recipient The address that will own the minted token
     * @param tokenURI URI pointing to the token's metadata
     * @return The ID of the newly minted token
     */
    function mintNFT(address recipient, string calldata tokenURI) external payable returns (uint256);
    
    /**
     * @dev Updates the price to mint an NFT
     * @param _mintPrice The new mint price
     */
    function setMintPrice(uint256 _mintPrice) external;
    
    /**
     * @dev Updates the base URI for computing {tokenURI}
     * @param baseURI The new base URI
     */
    function setBaseURI(string calldata baseURI) external;
    
    /**
     * @dev Withdraws all ETH from the contract to the owner
     */
    function withdraw() external;
}
