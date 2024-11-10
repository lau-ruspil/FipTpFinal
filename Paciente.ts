import { IPaciente } from './IPaciente';

export class Paciente implements IPaciente{
    private UID: number;
    private clienteUID: number;
    private nombre: string;
    private especie: string;

    constructor (UID: number, clienteUID: number, nombre: string, especie: string){
        this.UID = UID;
        this.clienteUID = clienteUID;
        this.nombre = nombre;
        this.especie = especie;
    }

    public getUID(): number{
        return this.UID;
    }

    public getClienteUID(): number{
        return this.clienteUID;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public getEspecie(): string{
        return this.especie;
    }
}