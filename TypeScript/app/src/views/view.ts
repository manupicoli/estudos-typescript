export abstract class View <T>{ //T de tipo
    protected elemento: InnerHTML;

    constructor(seletor: string){ // escapar?: boolean ? indica que é opcional, se não for definido será undefined
        const elemento = document.querySelector(seletor);
        if(elemento){
            this.elemento = elemento as HTMLInputElement;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique.`)
        }
        
    }

    
    public update(model: T): void{
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }

    protected abstract template(model: T): string;
    //     throw Error('Classe filha precisa implementar o template');
    // }
}