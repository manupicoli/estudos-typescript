//export function inspect(){
export function inspect( //nao recebe parametro
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]){
            console.log(`--- Método ${propertyKey}`);
            console.log(`------ parãmetros ${JSON.stringify(args)}`);
            const retorno = metodoOriginal.apply(this, args);
            console.log(`------ retorno ${JSON.stringify(retorno)}`);
            return retorno;
        };
        return descriptor;
    }
//}