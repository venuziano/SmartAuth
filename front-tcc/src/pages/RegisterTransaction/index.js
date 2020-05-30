import React, { useState } from 'react';

import './styles.css'
import logoImg from '../../assets/logo.png';
import loadImg from '../../assets/loading.gif'
import api from '../../services/api'

export default function RegisterTransaction() {
  const [hash, setHash] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [contractAddress, setConctractAddress] = useState('');
  const [document, setDocument] = useState();
  const [tx, setTx] = useState('');
  const [receipt, setReceipt] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const realFile = React.createRef();
  const customText = React.createRef();

  
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

  const ShowResults = () => (
    <div id="receipt">
      <label>Comprovante do registro:</label>
      <input 
        defaultValue={tx}
      />
      <p>Consulte seu comprovante : <a href={receipt}>aqui.</a></p>
    </div>
  )

  function showLoading() {
    const Loading = () => (
      <div id="loading" className="load">
        <img alt="caregando" src={loadImg}></img>
        <span>Registrando...</span>
      </div>
    )
  }

  function focusTextInput() {
    realFile.current.click();
  }

  function validatePatch() {
    if(realFile.current.value) {
      customText.current.innerHTML = realFile.current.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    }else {
      customText.current.innerHTML = "Nenhum documento selecionado."
    }
  }

  return (
    <div className="register-container">
      <div className="content">

        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Smart Auth</h1>
          <p>Faça o upload de um documento para autenticá-lo na rede de testes Rinkeby da Ethereum.</p>

        </section>

        <div className="form">
          <input
            hidden="hidden"
            name="file"
            type="file"
            ref={realFile}
            onChange={e => { setDocument(e.target.files[0]); validatePatch() }}
          />
          <button type="button"  className="upload-button" onClick={focusTextInput}>Selecione um documento: </button>
          <span ref={customText} className="custom-text">Nenhum documento selecionado.</span>

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

          {showReceipt ? <ShowResults /> : null}
        </div>
      </div>
    </div>
  );
}