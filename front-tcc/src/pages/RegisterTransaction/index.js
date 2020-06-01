import React, { useState } from 'react';

import './styles.css'
import logoImg from '../../assets/logo.png';
import loadImg from '../../assets/loading2.gif'
import api from '../../services/api'

export default function RegisterTransaction() {
  const [hash, setHash] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [contractAddress, setConctractAddress] = useState('');
  const [document, setDocument] = useState();
  const [tx, setTx] = useState('');
  const [receipt, setReceipt] = useState('');
  const [showReceiptWorked, setShowReceiptWorked] = useState(false);
  const [showReceiptFailed, setShowReceiptFailed] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [disableBtnRegister, setDisableBtnRegister] = useState({ disabled: 'true', title: 'Realize o upload de um documento para registrar.'});
  const [disableBtnUpload, setDisableBtnUpload] = useState({ disabled: 'true', title: 'Selecione um documento.'});

  const realFile = React.createRef();
  const customText = React.createRef();
  
  async function handleRegister() {

    const data = {
      fromAddress,
      contractAddress,
      hash,
    };

    setShowLoading(true);

    try {
      const response = await api.post('/', data)

      setTx(response.data);
      
      if(response.data === 'error'){
        setShowLoading(false);
        setShowReceiptFailed(true);
      }else {
        setShowLoading(false);
        setShowReceiptWorked(true);
      }

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

      setHash(JSON.stringify(response.data.hash));
      setDisableBtnRegister({ disabled: "", title: "" });
      console.log(`response:' ${JSON.stringify(response.data.hash)}`);
    } catch (err) {
      console.log('error:' + err)
      alert('Erro no upload, tente novamente.');
    }
  };
  
  const ShowResultsFailed = () => (
    <div>
      <label>Erro no registro, tente novamente.</label>
    </div>
  )

  const ShowResultsWorked = () => (
    <div>
      <label>Comprovante do registro:</label>
      <input 
        defaultValue={tx}
      />
      <p>Consulte seu comprovante <a href={receipt}>aqui.</a></p>
    </div>
  )

  const Loading = () => (
    <div id="loading">
      <p className="textAlign"> <img alt="caregando" src={loadImg} className="load"></img>
      Realizando o registro, aguarde alguns segundos...<br />
      </p>
    </div>
  )

  function focusTextInput() {
    realFile.current.click();
  }

  function validatePath() {
    if(realFile.current.value) {
      setDisableBtnUpload({ disabled: "", title: "" });
      //customText.current.innerHTML = realFile.current.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
      customText.current.innerHTML = realFile.current.value;
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
            onChange={e => { setDocument(e.target.files[0]); validatePath() }}
          />
          <button type="button"  className="upload-button" onClick={focusTextInput}>Selecione um documento: </button>
          <span ref={customText} className="custom-text">Nenhum documento selecionado.</span>

          <button title={disableBtnUpload.title} disabled={disableBtnUpload.disabled} className="button" type="submit" onClick={onFileUpload}>Upload</button> 
      
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

          <button className="button" type="submit" title={disableBtnRegister.title} disabled={disableBtnRegister.disabled} onClick={handleRegister}>Registrar</button>

          {showLoading ? <Loading /> : null || showReceiptWorked ? <ShowResultsWorked /> : null || showReceiptFailed ? <ShowResultsFailed /> : null}
        </div>
      </div>
    </div>
  );
}