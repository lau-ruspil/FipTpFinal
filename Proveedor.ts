import { Persona } from "./Persona";

export class Proveedor extends Persona{
    private insumos: string[];

    //Constructor de la clase Persona
    constructor(UID: number, nombre: string, telefono: string, direccion: string, insumos: string[]){
        super(UID, nombre, telefono, direccion);
        this.insumos = insumos;
    }

    //Retorna una copia del arreglo de insumos proveídos
    public getInsumos(): string[]{
        let copyInsumos: string[] = [];
        this.insumos.forEach((insumo)=>{copyInsumos.push(insumo)});
        return copyInsumos;
    }

    //Setea el arreglo de insumos
    public setInsumos(insumos: string[]): void{
        if (!insumos==undefined && insumos.length>0){
            this.insumos = insumos;
        }
    }
}