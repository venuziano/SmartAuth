import React, { useState } from 'react';

import './styles.css'
import logoImg from '../../assets/logo.png';
import api from '../../services/api'

export default function RegisterTransaction() {
  const [hash, setHash] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [contractAddress, setConctractAddress] = useState('');
  const [document, setDocument] = useState();
  const [tx, setTx] = useState('');
  const [receipt, setReceipt] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  
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

    formData.append( 
      "myFile",
      document
    );

    try {
      setFromAddress('0x181857a9eafdf6412ba38e74e9cabf13d8d8dbdc');
      setConctractAddress('0x2A673bf09b8B4685C094c9e047CEBC7797ec93dc');
      
      const response = await api.post('/uploadFile', formData); 

      setHash(JSON.stringify(response.data.hash.replace('"', "")));
      console.log(`response:' ${JSON.stringify(response.data.hash.replace("", ""))}`);
    } catch (err) {
      console.log('error:' + err)
      alert('Erro no upload, tente novamente.');
    }
  };
  
  function showReceiptDiv() {
    setShowReceipt(true);
  }

  const Results = () => (
    <div id="receipt">
      <label>Comprovante do registro:</label>
      <input 
        defaultValue={tx}
      />
      <p>Consulte seu comprovante : <a href={receipt}>aqui.</a></p>
    </div>
  )

  return (
    <div className="register-container">
      <div className="content">

        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Smart Auth</h1>
          <p>Faça o upload de um documento para autenticá-lo na rede de testes Rinkeby da Ethereum.</p>

        </section>

        <div className="form">
          <label>Documento: </label>
          <input className="upload-button"
            name="file"
            type="file"
            onChange={e => setDocument(e.target.files[0])}
          />

          <button className="button" type="submit" onClick={onFileUpload}>Upload</button> 
      
          <label htmlFor="hash">Hash do documento: </label>
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

          <button className="button" type="submit" onClick={() => { handleRegister(); showReceiptDiv() }}>Registrar</button>
          
          {showReceipt ? <Results /> : null}
        </div>
      </div>
    </div>
  );
}