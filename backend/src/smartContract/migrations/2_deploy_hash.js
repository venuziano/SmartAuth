const DocumentHash = artifacts.require("./DocumentHash.sol");

module.exports = function(deployer) {

    deployer.deploy(DocumentHash);
  };