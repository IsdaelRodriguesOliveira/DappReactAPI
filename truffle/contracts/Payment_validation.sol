

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Payment_validation{
    struct Usuarios{
        //numero de transacoes do usuario
        uint num_transacoes;
        //estado da transacao atual
        uint8 estado_transacao;
    }
    
    struct Usurario_espera{
        //valor depositado no contrato
        uint256 valor_recebido;
        //numero do boleto a ser pago
        uint numero_boleto;
        //estado do pagamento: true (valor depositado), false (valor pendente)
        bool estado_pagamento;
    }

    //rede das transacoes realizadas
    mapping(address => Usuarios) rede_tramsacoes;
    //rede das transacoes em espera
    mapping(address => Usurario_espera) rede_de_espera;

    function deposit(uint256 _valor_esperado) external payable returns(string memory _resultado){
        require(rede_de_espera[msg.sender].estado_pagamento == false && _valor_esperado == msg.value, "Pagamento nao realizado");
        rede_de_espera[msg.sender].valor_recebido = msg.value;
        rede_de_espera[msg.sender].estado_pagamento = true;
        _resultado = "Pagamento realizado";
    }
    function deposit2(uint256 _valor_esperado) external payable returns(string memory _resultado){
        require( _valor_esperado == msg.value, "Pagamento nao realizado");
        rede_de_espera[msg.sender].valor_recebido = msg.value;
        rede_de_espera[msg.sender].estado_pagamento = true;
        _resultado = "Pagamento realizado";
    }
    function deposit3() external payable returns(string memory _resultado){
        require(rede_de_espera[msg.sender].estado_pagamento == false , "Pagamento nao realizado");
        rede_de_espera[msg.sender].valor_recebido = msg.value;
        rede_de_espera[msg.sender].estado_pagamento = true;
        _resultado = "Pagamento realizado";
    }

    //pega o balanco do saldo atual do contrato em wei
    function balance() external view returns(uint256){
        return address(this).balance;
    }

    //retorna qual valor o endereco atual deve pagar, da conta em aberto
    function registros_espera(address _endereco_atual)external view returns(uint256){
        uint256 resultado = rede_de_espera[_endereco_atual].valor_recebido;
        return resultado;
    }

    function registros_espera2(address _endereco_atual)external view returns(uint256, uint256, bool){
        return (rede_de_espera[_endereco_atual].valor_recebido, rede_de_espera[_endereco_atual].numero_boleto, rede_de_espera[_endereco_atual].estado_pagamento);
    }
}