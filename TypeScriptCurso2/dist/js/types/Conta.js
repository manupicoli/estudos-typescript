import { TipoTransacao } from "../types/TipoTransacao.js";
let saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
    if (key === 'data') {
        return new Date(value);
    }
    return value;
}) || []; //TRANSFORMANDO ESSE DADO EM JSON, que é válido para o javascript. ou retonra nulo caso não haja nada
function debitar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero.");
    }
    if (valor > saldo) {
        throw new Error("Saldo insuficiente.");
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
}
function depositar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero.");
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
}
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    //metodo para realizar o agrupamento e retorna-lo
    getGruposTransacoes() {
        const gruposTransacoes = []; //armazena todo mundo dentro dele
        const listaTransacoes = structuredClone(transacoes); //vai guardar uma cópia da lista de transacoes
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        //pegando os valores referentes as datas de transacao1 e transacao2 e comparando
        let labelAtualGrupoTransacao = ""; //representa o nome do grupo
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao != labelGrupoTransacao) {
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
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO || novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error('Transação inválida.');
        }
        transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(transacoes)); //transforma a lista numa string JSON
    }
};
export default Conta; //apenas 1 item pode ser exportado como default
