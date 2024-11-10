import { Paciente } from "./Paciente";
import { Persona } from "./Persona";
import { Cliente } from "./Cliente";
import { Proveedor } from "./Proveedor"

export class Veterinaria extends Persona {
    private clientes: Cliente[]
    private proveedores: Proveedor[];
    
    constructor (UID: number, nombre: string, telefono: string, direccion: string){
        super(UID, nombre, telefono, direccion);
        this.clientes = []
        this.proveedores = [];
    }

    // Registra una visita de un cliente determinado (Las visitas se cuentan desde
    // cualquiera de las sucursales de la red)
    public registrarVisita(cli: Cliente): void{
        if (!cli==undefined){            
            cli.setVisitas(cli.getVisitas()+1); // Incrementar visitas
        }
    }

    public agregarCliente(cli: Cliente){
        
    }
}