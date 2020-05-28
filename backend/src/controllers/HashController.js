import cryptoJs from 'crypto-js';
import fs from 'fs';

module.exports = {
  create(request, response) {

    fs.readFile(request.files.myFile.tempFilePath, "utf8", function(err,data){
      if(err) {
        console.error("Could not open file: %s", err);
        return response.json(err);
      }else{
        var finalHash = cryptoJs.SHA256(data);
        //upToIPFS(data);
        console.log('hash: ' + finalHash)
        var hash = finalHash.toString();
        return response.send({ hash });
    }})
  }
}