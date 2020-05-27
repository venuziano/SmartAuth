import cryptoJs from 'crypto-js';
import fs from 'fs';
import IPFS from 'ipfs-mini';

//canal de comunicação do IPFS
const ipfs = new IPFS({host:'ipfs.infura.io', port: 5001, protocol:'https'});

var finalHash = "";

//gerar hash do documento
function hashGeneration(file, callback){
    fs.readFile(file, "utf8", function(err,data){
    if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
    }else{
        finalHash = cryptoJs.SHA256(data);
        //upToIPFS(data);
        return callback(finalHash);
    }})
};

//enviar arquivo para o IPFS
async function upToIPFS(data){
    ipfs.add(data, function(err, linkIPFS){
        try{
            if(err){
                console.log(err);
            }
                console.log("IPFS link: " + "\u001b[0;32m" + "https://ipfs.io/ipfs/" + linkIPFS + "\u001b[0m" + "\n");
        }catch(error){
            console.log("Erro tratado: " + error)
        }
        })
};

export {hashGeneration};