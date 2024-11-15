import { Entidad } from "./Entidad";
import { Persona } from "./Persona";
import { Cliente } from "./Cliente";
import { Proveedor } from "./Proveedor"
import { Paciente } from "./Paciente";

import * as rls from 'readline-sync';
import { Veterinaria } from "./Veterinaria";

const MIN_ID: number = 1;
const MAX_ID: number = 999999;

//Clase abstracta para el CRUD de entidades
export abstract class ABM{   
    
    // Función estática que genera un número entero aleatorio entre min y max
    private static getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Funcion estática que genera un id aleatorio unico para el el listado de entidades
    public static generarUUID(entidades: Entidad[]): number{
        let UID: number = ABM.getRandomNumber(MIN_ID, MAX_ID);
        if (entidades.filter((entidad)=>{entidad.getID()==UID}).length>0){
            //Si hay un número de Id que coincide vuelvo a llamar a la función
            UID = ABM.generarUUID(entidades);
        }
        return UID; //En este punto dada la recursividad el número será único
    }

    // Retorna una nueva Entidad
    private static altaEntidad(entidades: Entidad[]): Entidad{
        let nombre: string = rls.question("Nombre: ");        
        return new Entidad(ABM.generarUUID(entidades), nombre);
    }

    // Crea una nueva persona 
    private static altaPersona(personas: Entidad[]): Persona{
        let nuevaEntidad : Entidad = ABM.altaEntidad(personas);
        let direccion: string = rls.question("Dirección: ");
        let telefono: string = rls.question("Teléfono: ");
        return new Persona(nuevaEntidad.getID(), nuevaEntidad.getNombre(), direccion, telefono);
    }

    // Crea un nuevo cliente
    public static nuevoCliente(clientes: Entidad[]): Cliente{
        console.log("Ingrese los datos del Cliente:")
        let nuevaPersona : Persona = ABM.altaPersona(clientes);
        return new Cliente(nuevaPersona.getID(), nuevaPersona.getNombre(), nuevaPersona.getDireccion(), nuevaPersona.getTelefono())
    }

    //Crea un nuevo proveedor 
    public static nuevoProveedor(proveedores: Entidad[]): Proveedor{
        console.log("Ingrese los datos del Proveedor:")
        let nuevaPersona : Persona = ABM.altaPersona(proveedores);
        
        //Solicito los insumos
        let insumos: string[] =[];                
        let finalizar : boolean = false;
        while (!finalizar){
            let insumo : string = rls.question("Insumo/s: ");
            if (insumo!==''){
                insumos.push(insumo);
            }else{
                finalizar=true;
            }
        }
        return new Proveedor(nuevaPersona.getID(), 
                            nuevaPersona.getNombre(),
                            nuevaPersona.getDireccion(),
                            nuevaPersona.getTelefono(), 
                            insumos);
    }

    //Crea un nueva Paciente
    public static nuevoPaciente(pacientes: Entidad[], clientes: Cliente[]): Paciente{
        console.log("Ingrese los datos del Paciente:")
        let nuevaEntidad = ABM.altaEntidad(pacientes);
        let idDuenio = rls.questionInt("ID del dueño: ");
        let especie: string = rls.question("Especie: ");
        return new Paciente(nuevaEntidad.getID(), idDuenio, nuevaEntidad.getNombre(), especie, clientes);
    }

    // Da de alta una nueva Veterinaria
    public nuevaVeterinaria(veterinarias: Entidad[]): Veterinaria{
        console.log("Ingrese los datos de la Veterinaria:");
        let nuevaVete = ABM.altaPersona(veterinarias);
        return new Veterinaria(nuevaVete.getID(), nuevaVete.getNombre(), nuevaVete.getDireccion(), nuevaVete.getTelefono());
    }
}
