import { Persona } from "./Persona";
import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";

import * as rls from 'readline-sync';


// Clase Veterinaria
export class Veterinaria extends Persona {
    private clientes: Cliente[] = []
    private pacientes: Paciente[] = []
    
    // Constructor de la case
    constructor (id: number, nombre: string, direccion: string, telefono: string){
        super(id, nombre, direccion, telefono);
    }

    // Registra una visita de un cliente determinado (Las visitas se cuentan desde
    // cualquiera de las sucursales de la red)
    public registrarVisita(cli: Cliente): void{
        if (!cli==undefined){            
            cli.setVisitas(cli.getVisitas()+1); // Incrementar visitas
        }
    }
   
    //Crea un nueva Paciente
    public darDeAltaPaciente(idDuenio?: number): Paciente|undefined{
        console.log("Ingrese los datos del Paciente:")
        let nuevaEntidad = Veterinaria.altaEntidad(this.pacientes);
        if (idDuenio==undefined){
            idDuenio = rls.questionInt("ID del dueño: ");
        }        
        let especie: string = rls.question("Especie: ");
        let paciente = new Paciente(nuevaEntidad.getID(), idDuenio, nuevaEntidad.getNombre(), especie, this.clientes);
        this.pacientes.push(paciente);
        return paciente;
    }

    // Da de alta un nuevo Cliente
    public darDeAltaCliente(): Cliente|undefined{
        console.log("Ingrese los datos del Cliente:")
        let persona : Persona = Persona.altaPersona(this.clientes);
        let cliente : Cliente = new Cliente(persona.getID(), persona.getNombre(), persona.getDireccion(), persona.getTelefono());
        this.clientes.push(cliente);
        return cliente;
    }
}