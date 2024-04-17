import Conta from "../types/Conta.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";

const elementoFormulario = document.querySelector('.block-nova-transacao form') as HTMLFormElement;
elementoFormulario.addEventListener('submit', function(event) {
    try{
        event.preventDefault(); //submeter o formulário sem recarregar a página
        //precisamos saber se o form está valido
        if(!elementoFormulario.checkValidity()){ //se não for válido
            alert('Por favor, preencha todos os campos da transação');
            return;
        
        }

        const inputTipoTransacao = elementoFormulario.querySelector('#tipoTransacao') as HTMLSelectElement;
        const inputValor = elementoFormulario.querySelector('#valor') as HTMLInputElement;
        const inputData = elementoFormulario.querySelector('#data') as HTMLInputElement;

        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao; //guardando o valor do elemento buscado
        let valor: number = inputValor.valueAsNumber;
        let data: Date = new Date(inputData.value + " 00:00:00");
        // elementoSaldo.textContent = formatarMoeda(saldo);

        const novaTransacao: Transacao = { //novo objeto que recebe os valores recebidos
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        }

        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoFormulario.reset(); //limpar o formulario
    } 
    catch(erro){
        alert(erro.message);
    }
});