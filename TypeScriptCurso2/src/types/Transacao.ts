import { TipoTransacao } from "./TipoTransacao.js";

//é uma boa prática criar um arquivo para cada tipo ou enum definido
export type Transacao = {
    tipoTransacao: TipoTransacao;
    valor: number;
    data: Date;
}