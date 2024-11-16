import { Entidad } from './Entidad';
import { Persona } from './Persona';
import { Cliente } from './Cliente';

import * as rls from 'readline-sync';

// Clase Paciente
export class Paciente extends Entidad{
    private idDuenio: number = 0;
    private especie: string = '';

    // Constructor de la clase especie
    constructor (id: number, idDuenio: number, nombre: string, especie: string, clientes: Cliente[]){
        super(id, nombre);
        this.setIdDuenio(idDuenio, clientes);
        this.setEspecie(especie);
    }

    // Retorna el ID del cliente dueño del Paciente
    public getIdDuenio(): number{
        return this.idDuenio;
    }

    // Retorna la especie a la que pertenece
    public getEspecie(): string{
        return this.especie;
    }

    // Establece el ID del cliente dueño del Paciente
    public setIdDuenio(idDuenio: number, clientes: Entidad[]): void{
        if (idDuenio==undefined || clientes.findIndex((cliente)=>cliente.getID()==idDuenio)<0){
            throw Error(`Id de cliente inválido o no existe. (cliente: ${idDuenio})`)            
        }
        this.idDuenio = idDuenio;
    }

    // Establece la especie del paciente
    // especie: Debe ser una de las especies indicadas en el arreglo
    public setEspecie(especie: string): void{
        const especies = ['gato', 'perro', 'exótica'];
        if (especie==undefined || !especies.includes(especie.toLowerCase())){
            throw Error(`Especie inválida. (especie: ${especie}). Las opciones permitidas son [${especies}].`)            
        }
        this.especie = especie.toLowerCase();
    }
}