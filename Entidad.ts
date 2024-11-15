import { IEntidad } from "./IEntidad";

export class Entidad implements IEntidad{
    private id: number;
    private nombre: string;

    // Constructor de la clase Persona
    constructor (id: number, nombre: string){
        if (id==undefined||id<1) throw Error(`ID inválido (id: ${id}`);
        if (nombre==undefined||nombre.length<1) throw Error(`Nombre inválido (nombre: '${nombre}')`);

        this.id = id;
        this.nombre = nombre;        
    }

    // Retorna el ID de la Entidad
    public getID(): number{
        return this.id;
    }

    //Retorna el nombre de la Entidad
    public getNombre(): string{
        return this.nombre;
    }

    // Establece el nombre de la entidad
    public setNombre(nombre: string): void{
        if (!nombre==undefined&&nombre.length>0){
            this.nombre = nombre;
        }
    }
}