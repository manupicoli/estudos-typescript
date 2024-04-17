import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes>{
    
    private negociacoes: Array<Negociacao> = []; //vai guardar uma lista de negociacoes; mesma coisa que Negociacao[] = []    

    public adiciona(negociacao: Negociacao){
        this.negociacoes.push(negociacao);
    }

    public lista(): ReadonlyArray<Negociacao>{ //somente leitura, não permite modificar; mesma coisa que readonly Negociacao[]
        return this.negociacoes;
        //return [...this.negociacoes]; cada item do array, individualmente colocado na lista
    }

    public paraTexto(): string{
        return JSON.stringify(this.negociacoes, null, 2);
    }

    public eIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista());
    }
}