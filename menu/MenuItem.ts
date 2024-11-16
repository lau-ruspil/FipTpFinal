import { MenuObject } from "./MenuObject";

export class MenuItem extends MenuObject{
    
    //
    constructor (nombre: string, callback: Function){
        super(nombre);
    }

    // Muestra un elemento
    public mostrar(id?: number): string{
        return `${id} ${this.getNombre()}`;
    }

}