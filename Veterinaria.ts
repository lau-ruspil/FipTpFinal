import { Entidad } from "./Entidad";
import { Persona } from "./Persona";
import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";

import * as rls from "readline-sync";

// Clase Veterinaria
export class Veterinaria extends Persona {
	private clientes: Cliente[] = [];
	private pacientes: Paciente[] = [];

	// Constructor de la case
	constructor(
		id: number,
		nombre: string,
		direccion: string,
		telefono: string
	) {
		super(id, nombre, direccion, telefono);
	}

	// Registra una visita de un cliente determinado (Las visitas se cuentan desde cualquiera de las sucursales de la red)
	public registrarVisita(cli: Cliente): void {
		if (!cli == undefined) {
			cli.setVisitas(cli.getVisitas() + 1); // Incrementar visitas
		}
	}

	// Crear un nuevo Paciente
	public darDeAltaPaciente(idDuenio?: number): Paciente | undefined {
		console.log("Ingrese los datos del Paciente:");
		let nuevaEntidad = Veterinaria.altaEntidad(this.pacientes);

		// Si el ID del dueño no es proporcionado, solicitarlo
		if (idDuenio == undefined) {
			idDuenio = rls.questionInt("ID del dueño: ");
		}

		// Verificar si el cliente con ese ID existe
		let cliente = this.clientes.find(
			(cliente) => cliente.getID() === idDuenio
		);
		if (!cliente) {
			console.log(`No se encontró el cliente con ID ${idDuenio}`);
			return undefined;
		}

		// Inicializar la variable para la especie
		const opciones : string[] = ['Gato','Perro','Exótico'];
		let index : number = rls.keyInSelect(opciones, 'Opción: ', {guide:false, cancel: false});
		let especie: string = opciones[index];
		
		// Crear el nuevo paciente con la especie seleccionada
		let paciente = new Paciente(
			nuevaEntidad.getID(),
			idDuenio,
			nuevaEntidad.getNombre(),
			especie,
			this.clientes
		);

		// Agregar el paciente a la lista de pacientes
		this.pacientes.push(paciente);

		// Retornar el paciente creado
		return paciente;
	}

	// Da de alta un nuevo Cliente
	public darDeAltaCliente(): Cliente | undefined {
		console.log("Ingrese los datos del Cliente:");
		let persona: Persona = Persona.altaPersona(this.clientes);
		let cliente: Cliente = new Cliente(
			persona.getID(),
			persona.getNombre(),
			persona.getDireccion(),
			persona.getTelefono()
		);
		this.clientes.push(cliente);
		return cliente;
	}

	// Metodo para dar de baja un cliente y sus pacientes
	public darDeBajaCliente(): void {
		// Solicitar el nombre del cliente que se desea eliminar
		let nombre: string = rls.question(
			"Ingrese el nombre del Cliente que se desea eliminar: "
		);

		// Busca el indice del cliente en el array mediante su nombre
		let indexCliente = this.clientes.findIndex(
			(cliente) => cliente.getNombre() === nombre
		);

		if (indexCliente === -1) {
			console.log("Cliente no encontrado");
			return;
		}

		// Eliminar los pacientes asociados a este cliente
		let idCliente = this.clientes[indexCliente].getID();
		this.pacientes = this.pacientes.filter(
			(paciente) => paciente.getIdDuenio() !== idCliente
		);

		// Eliminar el cliente de la lista
		this.clientes.splice(indexCliente, 1);
		console.log(
			"El cliente y sus mascotas han sido eliminados exitosamente"
		);
	}

	public modificarCliente(): void {
		// Solicitar el nombre del cliente a modificar
		let nombre: string = rls.question(
			"Ingrese el nombre del Cliente que desea modificar: "
		);

		// Buscar el cliente
		let cliente = this.clientes.find(
			(cliente) => cliente?.getNombre() === nombre
		);

		if (!cliente) {
			console.log("Cliente no encontrado");
			return;
		}

		// Modificar los datos del cliente
		let nuevoNombre = rls.question("Ingrese el nuevo nombre del cliente: ");
		let nuevaDireccion = rls.question(
			"Ingrese la nueva direccion del cliente: "
		);
		let nuevoTelefono = rls.question(
			"Ingrese el nuevo teléfono del cliente: "
		);

		cliente.setNombre(nuevoNombre);
		cliente.setDireccion(nuevaDireccion);
		cliente.setTelefono(nuevoTelefono);

		console.log("Cliente modificado exitosamente");
	}

    // Muestra el Menu Principal de la RED
    public mostrarMenu(): void{
        let opcion: number = -1;
        while (opcion!==2){
            console.clear();  
            console.info(`Bienvenidos a la veterinaria ${this.getNombre()}`);
            opcion = rls.keyInSelect(['CLIENTES', 'PACIENTES', 'VOLVER'], 'Opción: ', {caseSensitive:true, guide:false, cancel: false});
            try{    
                switch(opcion){
                    case 0: this.mostrarSubMenuClientes(); break;
                    case 1: this.mostrarSubMenuPacientes(); break;
                    case 2: break;
                }
            }catch(error){
                console.error(`${(error as Error).name}: ${(error as Error).message}`);
                rls.keyInPause(`Presione una tecla para continuar...`, {guide:false});
            }
        }
    }

    // SUBMENU CLIENTES
    private mostrarSubMenuClientes(): void{        
        let opcion: number = -1;
        while (opcion!==4){
            console.clear()
            console.log('CLIENTES');
            Entidad.mostrarListado(this.clientes); 
            opcion = rls.keyInSelect(['AGREGAR', 'MODIFICAR', 'ELIMINAR', 'SELECCIONAR', 'VOLVER'], 'Opción: ', {caseSensitive:true, guide:false, cancel: false});
            try{    
                switch(opcion){
                    case 0: this.darDeAltaCliente(); break;
                    case 1: this.modificarCliente(); break;
                    case 2: Entidad.darDeBajaEntidad(this.clientes); break;
                    //case 3: this.clientes.mostrarMenu();
                }
            }catch(error){
                console.error(`${(error as Error).name}: ${(error as Error).message}`);
                rls.keyInPause(`Presione una tecla para continuar...`, {guide:false});
            }
        }
    }

    // SUBMENU PACIENTES
    private mostrarSubMenuPacientes(): void{        
        let opcion: number = -1;
        while (opcion!==2){
            console.clear()
			console.log('CLIENTES');
            Entidad.mostrarListado(this.clientes); 
            console.log('PACIENTES');
            Entidad.mostrarListado(this.pacientes); 
            opcion = rls.keyInSelect(['AGREGAR', 'ELIMINAR', 'VOLVER'], 'Opción: ', {caseSensitive:true, guide:false, cancel: false});
            try{    
                switch(opcion){
                    case 0: this.darDeAltaPaciente(); break;
                    case 1: Entidad.darDeBajaEntidad(this.pacientes); break;
                }
            }catch(error){
                console.error(`${(error as Error).name}: ${(error as Error).message}`);
                rls.keyInPause(`Presione una tecla para continuar...`, {guide:false});
            }
        }
    }
}
