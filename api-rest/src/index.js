//import Web3 from "web3";

const express = require('express')

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const Web3 = require('../../client/node_modules/web3')
const web3 = new Web3("HTTP://127.0.0.1:7545")

const CONTRACT_INFO = require('./config.js')

app.post('/payments',async (req, res) => {
    const {address} = req.body
    //return res.status(201).json( CONTRACT_INFO.ADDRESS)
    let contract;
  

    try{
        contract = new web3.eth.Contract(CONTRACT_INFO.ABI, CONTRACT_INFO.ADDRESS)
        let pagamento
        try{
            //pegar pagamento atual
            pagamento = await contract.methods.registros_espera2(address).call()
            //verificar a validade do boleto e verificar a igualdade dos valores

            //pagar boleto
            return res.status(201).json( pagamento)

        }catch(err){
            console.log(err)
            return res.status(402).json(err)

        }
    } catch (err) {
        return res.status(404).json("Erro ao pegar contrato")
    }    

})


app.listen(3333, () => console.log('Servidor rodando'))