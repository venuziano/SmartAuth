import { web3 } from "./web3"
import hashAbi from "./hashAbi"

export function createContract(contractAddress) {
    web3.eth.handleRevert = true;
    return new web3.eth.Contract(hashAbi, contractAddress)
}