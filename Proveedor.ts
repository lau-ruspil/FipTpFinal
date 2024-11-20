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

    // Muestra un listado de las proveedores cargados
    public static mostrarListado(proveedores: Proveedor[]): void{
        if (proveedores.length > 0) {
            proveedores.forEach((proveedor) => {
                console.log(
                    `\tID: ${proveedor.getID()} - Nombre: ${proveedor.getNombre()} - Dirección: ${proveedor.getDireccion()} - Tel: ${proveedor.getTelefono()} - Insumos: [${proveedor.getInsumos()}]`
                );
            });
        }else{
            console.warn("\tNo hay registros."); // Si no hay entidades, informa al usuario
        }
    }
}