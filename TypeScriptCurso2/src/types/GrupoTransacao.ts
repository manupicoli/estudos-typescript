import { Transacao } from "./Transacao.js";

export type GrupoTransacao = {
    label: string; //rótulo. ex: setembro de 2022
    //lista de todas as transacoes feitas em um determinado período de tempo
    transacoes: Transacao[];
}