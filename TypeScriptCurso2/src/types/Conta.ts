import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";

let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) =>{
    if(key === 'data'){
        return new Date(value);
    } 

    return value;
}) || []; //TRANSFORMANDO ESSE DADO EM JSON, que é válido para o javascript. ou retonra nulo caso não haja nada

function debitar(valor: number): void{
    if(valor <= 0){
        throw new Error("O valor a ser debitado deve ser maior que zero.")
    }
    if(valor > saldo){
        throw new Error("Saldo insuficiente.")
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
}

function depositar(valor: number): void{
    if(valor <= 0){
        throw new Error("O valor a ser debitado deve ser maior que zero.")
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
}

const Conta = { //objeto com recursos para representar a conta
    getSaldo() {
        return saldo;
    },

    getDataAcesso(): Date{
        return new Date();
    },

    //metodo para realizar o agrupamento e retorna-lo
    getGruposTransacoes(): GrupoTransacao[]{
        const gruposTransacoes: GrupoTransacao[] = []; //armazena todo mundo dentro dele
        const listaTransacoes: Transacao[] = structuredClone(transacoes); //vai guardar uma cópia da lista de transacoes
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        //pegando os valores referentes as datas de transacao1 e transacao2 e comparando
        let labelAtualGrupoTransacao: string = ""; //representa o nome do grupo

        for (let transacao of transacoesOrdenadas){
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric"});
            if(labelAtualGrupoTransacao != labelGrupoTransacao){
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }

            gruposTransacoes.at(-1).transacoes.push(transacao); //adicionando na última posição do array

        }
        return gruposTransacoes;
    },

    registrarTransacao(novaTransacao: Transacao): void{
        if(novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO){
            depositar(novaTransacao.valor);
        } else if(novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO || novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA){
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        } else {
            throw new Error ('Transação inválida.');
        }

        transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(transacoes)); //transforma a lista numa string JSON
    }
}

export default Conta; //apenas 1 item pode ser exportado como default