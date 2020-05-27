import { web3 } from '../ethereum/web3.js'

//criar carteira
async function createWallet (pwd) {
  web3.eth.personal.newAccount(pwd, function(err, account){
    if(!err){
        unlockAccount(account,pwd);
    }else{
        console.error(err);
    }
  })}

//desbloquear uma carteira informando sua pb e senha
function unlockAccount(account, pwd){
    web3.eth.personal.unlockAccount(account, pwd, 600)
    .then(console.log('Endereço de saída desbloqueado:' + "\u001b[1;32m", account + "\u001b[0m" + "\n"))
    .catch(function(error){
        console.log(error)
    });
}

export {unlockAccount};