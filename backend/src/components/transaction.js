import { createContract } from '../ethereum/hashContract'
import { web3 } from "../ethereum/web3.js"
import * as createHash from "./createHash"
import * as unlockAccount from "./wallet"
//import  sendRawTransaction from "./signTransaction"

//endereço de saída
const fromAddress = "0x181857a9eafdf6412ba38e74e9cabf13d8d8dbdc";

//construtor do contrato
const hash = createContract("0x2A673bf09b8B4685C094c9e047CEBC7797ec93dc");

//caminho do arquivo digital
var file = "./finalPaper.pdf";

//s = sendTransaction, g = getTransaction
var option = ['s','g'];
var block = 10081523;
var foundHash = false;
//0x5c122805284ec847ad725840f5af0be2729d85a6be46fb2c16c0a885b03ad46d
main();

function main(){
    createHash.hashGeneration(file, function(hashFile){

    if(option[0] == 's'){
        console.log("\nHash do documento:" + "\u001b[1;32m", hashFile + "\u001b[0m" + "\n")

        //método que cria registro na blockchain passando a hash gerada do documento
        sendTransaction(hashFile)
        .then(function() {
        })
        .catch(function(error) {
            console.log("Error: \n" + error);
        })
    }else if(option[1] == 'ga'){
        //consulta se existe uma transação com a hash do documento e exibe como saída sua tx, caso existir
        // getBlockByNumber(hashFile);
        // getStateHash();
        web3.eth.getBlock(block, function(err, result){
            for(var i = 0; i <= result.transactions.length; i++){
                if(err == null){
                    let tx = result.transactions[i];
                    getInputTransaction(tx, hashFile);
                }else{
                    console.log("null here "  + err);
                }
            }
            if(!foundHash){
                block += 1;
                console.log('\nEscaneando bloco..: ' + block)
                main();
            }
        })
    }})
}

function getBlockByNumber(hashFile){
    web3.eth.getBlock(block, function(err, result){
        for(var i = 0; i <= result.transactions.length; i++){
            if(err == null){
                let tx = result.transactions[i];
                getInputTransaction(tx, hashFile);
            }else{
                console.log("null here "  + err);
            }
        }
    })
}

function getStateHash(){
    if(!foundHash){
        block += 1;
        console.log('\nScanning Block..: ' + block)
        main();
    }
}

function getInputTransaction(tx, hashFile) {
    web3.eth.getTransaction(tx, function(err, cb){
        web3.eth.getTransactionReceipt(tx, function(err, boo){
            if(boo && cb && boo.status && cb.input != undefined){
                let decodeInput = web3.utils.hexToAscii(cb.input);
                decodeInput = decodeInput.split("_").pop();
                if(err == null && decodeInput.includes(hashFile)){
                    //console.log(cb), console.log('\n')
                    console.log('\ntransactionHash: ' + cb.hash + '\n')
                    console.log('Input Data decodificado: ' + '\u001b[1;32m' + decodeInput + '\u001b[0m');
                    foundHash = true;
                    return;
                }else if( err != null){
                    console.log('error: ' + err);
                }
        }}
    )})
}

//metodo que cria e registra uma transação na blockchain.
async function sendTransaction(hashFile) {
    //desbloquear a conta
    unlockAccount.unlockAccount(fromAddress, "123");
    console.log('Realizando registro na blockchain...\n');

    //criar registro na blockchain através da chamada do método do smart contract
    await hash.methods.setDocumentHash("#_" + hashFile).send({from: fromAddress, gas: 200000, gasPrice: 21000000000})
    .then(function(txRaw){
            console.log(txRaw);
            console.log("\n" + "\u001b[0;32m Registro realizado com sucesso!\u001b[0m");
    })
}


