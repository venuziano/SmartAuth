import { createContract } from '../ethereum/hashContract'
// import { web3 } from '../ethereum/web3.js'
// import * as createHash from './createHash'
import * as unlockAccount from '../components/wallet'

module.exports = {
  async register(request, response) {
  const { fromAddress, contractAddress, hash } = request.body;

  const canManipuleContract = createContract(contractAddress)

  console.log('HASH:' + hash);
  console.log('fromAddress:' + fromAddress);
  console.log('contractAddress:' + contractAddress);

  //desbloquear a conta
  unlockAccount.unlockAccount(fromAddress, '123')
  console.log('Realizando registro na blockchain...\n')
  //criar registro na blockchain através da chamada do método do smart contract
  await canManipuleContract.methods.setDocumentHash('#_' + request.body.hash)
    .send({
      from: fromAddress,
      gas: 200000,
      gasPrice: 21000000000
    })
    .then(function (txRaw) {
      console.log(txRaw)
      console.log('\n' + '\u001b[0;32m Registro realizado com sucesso!\u001b[0m')
      return response.json(txRaw)
    })
    .catch(function(error) {
      console.log("Error: \n" + error);
      return response.json(error);
    })
  }
};