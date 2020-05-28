import React, { useState } from 'react';

import api from '../../services/api'

export default function RegisterTransaction() {
  const [hash, setHash] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [contractAddress, setConctractAddress] = useState('');
  const [document, setDocument] = useState('');
  const [tx, setTx] = useState('');
  const [receipt, setReceipt] = useState('');
  
  async function handleRegister() {

    const data = {
      fromAddress,
      contractAddress,
      hash,
    };

    try {
      const response = await api.post('/', data)

      setTx(response.data);
      setReceipt('https://rinkeby.etherscan.io/tx/' + response.data);
    } catch (err) {
      alert(`Erro no registro, tente novamente.`);
    }
  }

  async function onFileUpload(e) { 
    const formData = new FormData(); 
    
    setFromAddress('0x181857a9eafdf6412ba38e74e9cabf13d8d8dbdc');
    setConctractAddress('0x2A673bf09b8B4685C094c9e047CEBC7797ec93dc');

    formData.append( 
      "myFile",
      document
    );

    try {
      const response = await api.post('/uploadFile', formData); 

      setHash(JSON.stringify(response.data.hash.replace('"', "")));
      console.log(`response:' ${JSON.stringify(response.data.hash.replace("", ""))}`);
    } catch (err) {
      console.log('error:' + err)
      alert(`Erro no registro, tente novamente.`);
    }
  };
    
  return (
    <div className="main-cotainer">
      <div>
        
        <label>Arquivo: </label>
        <input
          name="file"
          type="file"
          onChange={e => setDocument(e.target.files[0])}
        />
        <button type="submit" onClick={onFileUpload}>Upload</button>
      </div>

      <div>  
        <label htmlFor="hash">Hash: </label>
        <input 
          defaultValue={hash}
        />
        <input 
          placeholder="sua chave pública"
          value={fromAddress}
          onChange={e => setFromAddress(e.target.value)}
        />
        <input 
          placeholder="endereço contrato"
          value={contractAddress}
          onChange={e => setConctractAddress(e.target.value)}
        />

        <button type="submit" onClick={handleRegister}>Registrar</button>
      </div>

      <div>
        <label>Comprovante do registro:</label>
        <input 
          defaultValue={tx}
        />
        <p>Consulte seu comprovante : <a href={receipt}>aqui.</a></p>
      </div>
    </div>
  );
}