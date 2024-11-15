import { Persona } from "./Persona";

// Clase Proveedor
export class Proveedor extends Persona{
    private insumos: string[] = [];

    // Constructor de la clase Proveedor
    constructor(id: number, nombre: string, direccion: string, telefono: string, insumos: string[]){
        super(id, nombre, direccion, telefono);
        this.setInsumos(insumos);
    }

    //Retorna una copia del arreglo de insumos provistos por el Proveedor
    public getInsumos(): string[]{        
        return [...this.insumos];
    }

    //Setea el arreglo de insumos
    public setInsumos(insumos: string[]): void{
        if (insumos==undefined || insumos.length < 1 || 
            // todos los elementos de insumos tengan un caracter o mas
            insumos.filter((insumo)=>{insumo.length>0}).length == insumos.length)   
            {
                throw Error(`Insumos inválidos (insumos: ([${insumos}])`);
            }
        this.insumos = insumos;
    }
}