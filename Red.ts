import { Persona } from "./Persona";
import { Veterinaria } from "./Veterinaria";
import { Proveedor } from "./Proveedor";

import * as rls from 'readline-sync';

// Clase Red
export class Red {
    private nombre: string = '';
    private veterinarias: Veterinaria[];
    private proveedores: Proveedor[];

    //Constructor de la clase Red
    constructor (nombre: string){        
        this.veterinarias = []
        this.proveedores = []
        this.setNombre(nombre);
    }    

    // Retorna el nombre 
    public getNombre(): string{
        return this.nombre;
    }

    // Establece el nombre
    public setNombre(nombre: string): void{
        if (nombre == undefined || nombre.length<1 ){
            throw new Error(`Nombre inválido (nombre: ${nombre}).`)
        }
        this.nombre = nombre;
    }

    // Da de alta una nueva Veterinaria
    // Retorna -1 o el ID de la veterinaria generada si tuvo éxito
    public darDeAltaVeterinaria(): Veterinaria|undefined{        
        console.log("Ingrese los datos de la Veterinaria:");
        let persona = Persona.altaPersona(this.veterinarias);
        let veterinaria = new Veterinaria(persona.getID(), persona.getNombre(), persona.getDireccion(), persona.getTelefono());
        this.veterinarias.push(veterinaria);
        return veterinaria;
    }

    //Crea un nuevo proveedor 
    public darDeAltaProovedor(): Proveedor|undefined{
        console.log("Ingrese los datos del Proveedor:")
        let nuevaPersona : Persona = Persona.altaPersona(this.proveedores);
        
        //Solicito los insumos
        let insumos: string[] =[];                
        let finalizar : boolean = false;
        console.log('Ingrese los insumos provistos. (ENTER para finalizar)');
        while (!finalizar){
            let insumo : string = rls.question("Insumo/s: ");
            if (insumo!==''){
                insumos.push(insumo);
            }else{
                finalizar=true;
            }
        }
        
        //Creo el provedor
        let provedor: Proveedor = new Proveedor(nuevaPersona.getID(), nuevaPersona.getNombre(), 
                                                nuevaPersona.getDireccion(), nuevaPersona.getTelefono(), insumos);
        this.proveedores.push(provedor);
        return provedor;
    }
}