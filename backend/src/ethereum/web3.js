import Web3 from 'web3';

export const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

web3.eth.handleRevert = true;