//import { useState } from "react";

import Web3 from "web3";

const Transaction = (currentAccount, contract) => {
    const OpenTransaction = async (valor) => {
        try {
            console.log("Current Account", currentAccount)
            await contract.methods.abrir_transacao(currentAccount, Web3.utils.toWei(valor, "ether")).send({
                from: currentAccount,
            });
            
        } catch (error){
            console.log(error)
        }
    }

    const CkeckTransaction = async () => {
        let valorData
        try{
            valorData = await contract.methods.registros_espera2(currentAccount).call()

        } catch (error){
            console.log(error)
        }
        console.log("Valor em espera",valorData)
        
        return valorData;
    }

    const DepositTransaction = async (valor, code) => {
        let retorno = ""
        console.log("Valor de envio",valor)
        try{
            retorno = await contract.methods.deposit2(Web3.utils.toWei(valor, "ether"), code).send({
                from: currentAccount,
                value: Web3.utils.toWei(valor, "ether"),
            });
            console.log(retorno)
            let url = 'http://localhost:3333/payments';
            let options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"address":currentAccount})
            };
              
            fetch(url, options)
            .then(res => res.json())
            .then(json => {console.log(json)
                alert("Pagamento realizado")
            })
            .catch(err => console.error('error:' + err));

        } catch (error){
            console.log("Valor do retorno da funcao")
            console.log(error)
            console.log("Falha na tentativa de enviar")
            console.log("Valor de envio", valor)
        }
    }

    return {OpenTransaction, CkeckTransaction, DepositTransaction}
}
export default Transaction;