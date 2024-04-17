export function logarTempoDeExecucao(emSegundos: boolean = false){
    return function(
        target: any, //funcao construtora da classe
        propertyKey: string,
        descriptor: PropertyDescriptor
    ){
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: Array<any>){ //não sabemos quantos parametros, entao definimos um array para guardar todos os parametros
            let divisor = 1;
            let unidade = 'milisegundos';
            if (emSegundos){
                divisor = 1000;
                unidade = 'segundos';
            }
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1)/divisor} ${unidade}`)
            retorno
        };

        return descriptor;
    }
}