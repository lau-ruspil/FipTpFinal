import { Entidad } from "./Entidad";

import * as rls from 'readline-sync';

// Clase Persona
// ACLARACIÓN: Una Persona puede ser tanto física como jurídica
export class Persona extends Entidad {
    private direccion: string = '';
    private telefono: string = '';    

    //Constructor de la clase Persona
    constructor (id: number, nombre: string, direccion: string, telefono: string){
        super(id, nombre);
        this.setDireccion(direccion);
        this.setTelefono(telefono);
    }

    // Retorna la dirección de la Persona
    public getDireccion(): string{
        return this.direccion;
    }

    // Establece la dirección de la Persona
    public setDireccion(direccion: string): void{
        if (direccion==undefined || direccion.length<1){
            throw Error(`Dirección inválida (dirección: '${direccion}')`);
        } 
        this.direccion = direccion;
    }

    // Retorna el teléfono de la Persona
    public getTelefono(): string{
        return this.telefono;
    }

    // Establece el teléfono la Persona
    public setTelefono(telefono: string):void {
        if (telefono==undefined||telefono.length<1){
            throw Error(`Teléfono inválido (teléfono: '${telefono}')`);
        }
        this.telefono = telefono;
    }

    // Crea una nueva persona 
    public static altaPersona(personas: Entidad[]): Persona{
        let nuevaEntidad = Persona.altaEntidad(personas);
        let direccion: string = rls.question("Dirección: ");
        let telefono: string = rls.question("Teléfono: ");
        return new Persona(nuevaEntidad.getID(), nuevaEntidad.getNombre(), direccion, telefono);
    }
}
