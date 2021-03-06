pragma solidity ^0.5.16;

contract DocumentHash{

    string public documentHash;
    mapping (string => string) hashAlreadyRegistered;
        
    function setDocumentHash(string memory hash) public {
        require(bytes(hash).length  > 0, "Empty hash!");
        require(bytes(hashAlreadyRegistered[hash]).length  == 0, "Hash already registered");
        
        documentHash = hash;
        hashAlreadyRegistered[documentHash] = hash;
    }
 
    function getDocumentHash() public view returns(string memory) {
        return documentHash;
    }
}