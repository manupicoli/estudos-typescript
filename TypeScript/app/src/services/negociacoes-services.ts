import { NegociacoesDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService{
    public obterNegociacoesDoDia(): Promise<Negociacao[]> {
        return fetch('http://localhost:8080/dados')
        .then(res => res.json())
        .then((dados: NegociacoesDoDia[]) => {
            return dados.map(dadoDeHoje => { //pegar cada negociação de hoje
                return new Negociacao(new Date(), dadoDeHoje.vezes, dadoDeHoje.montante) //converte o array num novo array, onde cada dado de hoje será convertido para uma Negociacao
            })
        });
    }
}