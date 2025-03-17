// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PortfolioNFT is ERC721URIStorage, Ownable {
    // Simple counter for token IDs
    uint256 private _nextTokenId;
    
    // Max supply of NFTs
    uint256 public constant MAX_SUPPLY = 1000;
    
    // Base price for minting
    uint256 public mintPrice = 0.05 ether;
    
    // Base URI for metadata
    string private _baseTokenURI;
    
    constructor() ERC721("Portfolio NFT Collection", "PNFT") Ownable(msg.sender) {
        _baseTokenURI = "https://example.com/metadata/";
    }
    
    function mintNFT(address recipient, string memory tokenURI) public payable returns (uint256) {
        uint256 newItemId = _nextTokenId;
        
        require(newItemId < MAX_SUPPLY, "Max supply reached");
        
        if (msg.sender != owner()) {
            require(msg.value >= mintPrice, "Insufficient payment");
        }
        
        _nextTokenId++;
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        return newItemId;
    }
    
    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }
    
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
    
    // Override base URI function
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}