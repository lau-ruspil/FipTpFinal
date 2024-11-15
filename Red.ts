import { Persona } from "./Persona";
import { Veterinaria } from "./Veterinaria";
import { Proveedor } from "./Proveedor";

// Clase Red
export class Red extends Persona{
    private veterinarias: Veterinaria[];
    private proveedores: Proveedor[]

    //Constructor de la clase Red
    constructor (id: number, nombre: string, direccion: string, telefono: string){
        super(id, nombre, direccion, telefono);
        this.veterinarias = []
        this.proveedores = []
    }    

}