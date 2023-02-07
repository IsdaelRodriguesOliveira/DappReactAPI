//import { EthProvider } from "./contexts/EthContext";
//import { EthProvider } from "./contexts/EthContext";
import EthProvider from "../EthContext/EthProvider";
import { useState, useCallback, useEffect} from "react";
import Web3 from "web3";

const ContractSaldo = () => {
    const {contract} = EthProvider();
    const [saldo, setSaldo] = useState(0);

    const getSaldo = useCallback( async () => {
        try {
            const saldoData = await contract.methods.balance().call();
            //console.log("Saldo do contrado = ", saldoData)
            console.log("saldo do contrato", Web3.utils.fromWei(saldoData, "ether"))
            setSaldo(Web3.utils.fromWei(saldoData, "ether"));
            //console.log("Saldo do saldo = ", saldo)
        } catch (error){
            console.log("Saldo do contrato = ", error);
        }
    }, [contract]);
    useEffect(() => {
        if (contract && contract.methods){
            //console.log("Chamando o getSaldo")
            getSaldo();
        }
    }, [getSaldo, contract]);
    return {saldo, contract};
};
export default ContractSaldo;