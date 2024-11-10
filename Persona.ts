import { IPersona } from "./IPersona";

export class Persona implements IPersona{
    private UID: number;
    private nombre: string;
    private telefono: string;
    private direccion: string;

    // Constructor de la clase Persona
    constructor (UID: number, nombre: string, telefono: string, direccion: string){
        this.UID = UID;
        this.nombre = nombre;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    //Getters / Setters
    public getUID(): number{
        return this.UID;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public getTelefono(): string{
        return this.telefono;
    }

    public getDireccion(): string{
        return this.direccion
    }

    public setNombre(nombre: string): void{
        if (!nombre==undefined&&nombre.length>0){
            this.nombre = nombre;
        }
    }

    public setDireccion(direccion: string): void{
        if (!direccion==undefined&&direccion.length>0){
            this.nombre = direccion;
        }
    }

    public setTelefono(telefono: string): void{
        if (!telefono==undefined&&telefono.length>0){
            this.telefono = telefono;
        }
    }
}