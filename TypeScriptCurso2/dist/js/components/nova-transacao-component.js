import Conta from "../types/Conta.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";
const elementoFormulario = document.querySelector('.block-nova-transacao form');
elementoFormulario.addEventListener('submit', function (event) {
    try {
        event.preventDefault(); //submeter o formulário sem recarregar a página
        //precisamos saber se o form está valido
        if (!elementoFormulario.checkValidity()) { //se não for válido
            alert('Por favor, preencha todos os campos da transação');
            return;
        }
        const inputTipoTransacao = elementoFormulario.querySelector('#tipoTransacao');
        const inputValor = elementoFormulario.querySelector('#valor');
        const inputData = elementoFormulario.querySelector('#data');
        let tipoTransacao = inputTipoTransacao.value; //guardando o valor do elemento buscado
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value + " 00:00:00");
        // elementoSaldo.textContent = formatarMoeda(saldo);
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        };
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoFormulario.reset(); //limpar o formulario
    }
    catch (erro) {
        alert(erro.message);
    }
});
