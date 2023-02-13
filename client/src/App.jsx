/*import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Web3 from "web3";*/
import "./App.css";
import ContractSaldo from "./contexts/Hooks/contractSaldo";
import Transaction from "./contexts/Hooks/openTransaction";
import { UseMetaMask } from "./contexts/Hooks/useWallet";
import { useState } from "react";

function App() {
  //pega o saldo atual do contrato
  let valorData = 50
  const {saldo, contract} = ContractSaldo()
  //verifica se esta conectado a carteira metamask
  const { isConnected, currentAccount, connectMetaMesk } = UseMetaMask()
  //console.log(isConnected, currentAccount)
  //OpenTransaction(currentAccount, contract)
  const {OpenTransaction, CkeckTransaction, DepositTransaction} = Transaction(currentAccount, contract)
  //const {valor} = CkeckTransaction()
  const [value, setValue] = useState('')
  const [code, setCode] = useState('')

  function submitt(){
    //console.log("Valor", value)
    //console.log("Codigo", code)
    DepositTransaction(value, code)
  }
  return (
    <div id="App" >
      <div className="container">
        
        
        <hr />
        
        <p>Cliente</p>
        <p>
          <button onClick={connectMetaMesk}>Connect Wallet</button>
        </p>
        <p>Digite o numero do boleto</p>
        <p>
        <input
          placeholder='Codigo'
          value={code}
          onChange={event => setCode(event.target.value)}
          required
        />
        </p>
        <p>Digite o valor do boleto</p>
        <p>
        <input
          placeholder='Valor'
          value={value}
          onChange={event => setValue(event.target.value)}
          required
        />
        </p>
        
        <p>
          <button onClick={submitt}>Depositar valor no contrato</button>
        </p>
        <hr />
        <p>Contrato:</p>
        <p>{saldo} Ethers</p>
        <hr />
      </div>
    </div>
  
  );
}

export default App;
