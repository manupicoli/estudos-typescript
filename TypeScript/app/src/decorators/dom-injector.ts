export function domInjector(seletor: string){
    return function(target: any, propertyKey: string){ //propertykey: nome da propriedade que o decorator esta em cima
        console.log(`Modificando prototype ${target.constructor.name}
        e adicionando getter para a propriedade ${propertyKey}`);
        let elemento: HTMLElement;
        const getter = function(){
            if(!elemento){
                elemento = <HTMLElement>document.querySelector(seletor); 
                console.log(`buscando o elemento do DOM com o seletor ${seletor} para injetar em ${propertyKey}`)
            }
            return elemento;
        }

        Object.defineProperty( //agora as propriedade são getter que vao executar esse codigo que busca o elemento do DOM
            target, 
            propertyKey,
            {get: getter})
            //target é o prototype que define a classe (no caso, negociação controller
            //quero adicionar um getter para a propertykey
            //passando como get o getter

    }
}