import { Modelo } from "../interfaces/modelo.js";


export class Negociacao implements Modelo<Negociacao> {
    constructor(
    //     private _data: Date, 
    //     private _quantidade: number, 
    //     private _valor: number){}
        private _data: Date,
        public readonly quantidade: number,  //maneira mais simples, usando menos código
        public readonly valor: number 
    ) {} //{
       // super(); //garantindo a chamada do construtor pai
    //}

    // get data(): Date{
    //     return this._data;
    // }

    // get quantidade(): number{
    //     return this._quantidade;
    // }

    // get valor(): number{
    //     return this._valor;
    // }
    public static criaDe(dataString: string, quantidadeString: string, valorString: string): Negociacao{
        const exp = /-/g; //expressão regular p encontrar os hifens na data recebida no input
        const date = new Date(dataString.replace(exp, ',')); //passando o resultado de replace, que está substituindo os hifens encontrados pelas virgulas
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }

    get volume(): number{
        return this.quantidade * this.valor;
    }

    get data(): Date{
        const data = new Date(this._data.getTime());
        return data;
    }

    public paraTexto(): string{
        return(`
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor}
        `);
    }

    public eIgual(negociacao: Negociacao): boolean{
        return this.data.getDate() === negociacao.data.getDate()
        && this.data.getMonth() === negociacao.data.getMonth()
        && this.data.getFullYear() === negociacao.data.getFullYear();
    }

    //o static permite chamar o metodo diretamente na classe, sem precisar de uma instância

    
}