import { createContract } from '../ethereum/hashContract'
import * as unlockAccount from '../components/wallet'
import { web3 } from "../ethereum/web3"

module.exports = {
  async register(request, response) {
  const { fromAddress, contractAddress, hash } = request.body;

  const canManipuleContract = createContract(contractAddress)
  //web3.eth.handleRevert = true;

  console.log('HASH:' + hash);
  console.log('fromAddress:' + fromAddress);
  console.log('contractAddress:' + contractAddress);

  //desbloquear a conta
  await unlockAccount.unlockAccount(fromAddress, '123')
  console.log('Realizando registro na blockchain...\n')
  
  async function handleRevert(errorTransaction){
    console.log('entrou0.1 ' + errorTransaction)
    console.log('entrou0 ' + errorTransaction.transactionHash)

    const tx = await web3.eth.getTransaction(errorTransaction.transactionHash)
    // const tx = await web3.eth.getTransaction('0x09cb08e0241ee9a7563d8c3273edb531f4d5e3800e72d397ef2672548b7a8b07')
    console.log('entrou1')
    var result = await web3.eth.call(tx, tx.blockNumber)
    console.log('entrou2')
    result = result.startsWith('0x') ? result : `0x${result}`
    console.log('qual é o resul ' + result)
    if (result && result.substr(138)) {
      const reason = web3.utils.toAscii(result.substr(138))
      console.log('Revert reason:', reason)
      return reason;
    } else {
      console.log('Cannot get reason - No return value')
    }
  }

  await canManipuleContract.methods.setDocumentHash('#_' + request.body.hash)
    .send({
      from: fromAddress,
      gas: 400000,
      gasPrice: 21000000000
    })
    .then(function(txRaw) {
      console.log(txRaw)
      return response.json( txRaw.transactionHash );
    })
    .catch(function(error) {
      handleRevert(error);
      console.log("Error: \n" + error);
      return response.json( 'error' )
    })
  }

  // async function handleRevert(txHash){
  //   const tx = await web3.eth.getTransaction('0x9221d95e3fe55d7d72a4f2bc24706c3377f8cda9ea84b5f05177d524ba60c9c5')
  //   var result = await web3.eth.call(tx, 6736861)
  //   result = result.startsWith('0x') ? result : `0x${result}`
  
  //   if (result && result.substr(138)) {
  //     const reason = web3.utils.toAscii(result.substr(138))
  //     console.log('Revert reason:', reason)
  //     return reason;
  //   } else {
  //     console.log('Cannot get reason - No return value')
  //   }
  // }

  //criar registro na blockchain através da chamada do método do smart contract
    // await canManipuleContract.methods.setDocumentHash('#_' + request.body.hash)
    // .send({
    //   from: fromAddress,
    //   gas: 400000,
    //   gasPrice: 21000000000
    // }).on('transactionHash', async function(hash){
    //   console.log('é o has ou nao é' + hash)
    //   await web3.eth.getTransactionReceipt( hash, function (s, n) {
    //     console.log('asdadasd' + s)
    //     console.log('asdad123123123123asd' + n)
    //   })

    // }).on('error', function( error, receipt ) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    //   if ( error !== null) {
    //     console.log( 'receipt ' + receipt.transactionHash ); 
    //   } else {
    //     console.log( "hash erro: \n" + error );
    //   }
    // });
}