import { Persona } from "./Persona";
import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";
import { ABM } from "./ABM";

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

    // Da de alta un nuevo Paciente
    public darDeAltaPaciente(): void{
        try{
            this.pacientes.push(ABM.nuevoPaciente(this.pacientes, this.clientes));
        }catch(error){
            console.error(`${(error as Error).name}: ${(error as Error).message}`);
        }
    }

    // Da de alta un nuevo Cliente
    public darDeAltaCliente(): void{
        try{
           this.clientes.push(ABM.nuevoCliente(this.clientes));
        }catch(error){
            console.error(`${(error as Error).name}: ${(error as Error).message}`);
        }
    }
}