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
	public registrarVisita(cliente: Cliente): void {
		if (!cliente == undefined) {
			cliente.setVisitas(cliente.getVisitas() + 1); // Incrementar visitas
		}
	}

	// Crear un nuevo Paciente
	public darDeAltaPaciente(idDuenio?: number): Paciente | undefined {
		if (this.clientes.length === 0) {
			console.warn(
				`No hay registros cargados. Agregue un cliente para asignar un paciente.`
			);
			rls.keyInPause("Presione una tecla para continuar...", {
				guide: false,
			});
			return;
		}

		console.log("Ingrese los datos del Paciente:");
		let nuevaEntidad = Veterinaria.altaEntidad(this.pacientes); // Se asume que este método valida nombre e ID

		// Si no se proporciona un ID de dueño, solicitarlo
		while (idDuenio == undefined) {
			idDuenio = rls.questionInt("Ingrese el ID del dueño: ");

			// Verificar si el cliente existe
			let cliente = this.clientes.find(
				(cliente) => cliente.getID() === idDuenio
			);

			if (!cliente) {
				console.log(
					`No se encontró el cliente con ID ${idDuenio}. Intente nuevamente.`
				);
				idDuenio = undefined; // Permitir reintento
			} else {
				// Cliente encontrado
				break;
			}
		}

		// Selección de la especie
		const opciones: string[] = ["Gato", "Perro", "Exótico"];
		let index: number = rls.keyInSelect(
			opciones,
			"Seleccione la especie: ",
			{
				guide: false,
				cancel: false,
			}
		);
		let especie: string = opciones[index];

		// Crear y agregar el paciente (ahora se incluye `this.clientes`)
		let paciente = new Paciente(
			nuevaEntidad.getID(),
			idDuenio,
			nuevaEntidad.getNombre(),
			especie,
			this.clientes // Incluir clientes como argumento
		);

		this.pacientes.push(paciente);

		console.log(`Paciente ${paciente.getNombre()} agregado exitosamente.`);

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
		// Solicitar el id del cliente que se desea eliminar
		let id: number = rls.questionInt(
			"Ingrese el ID del Cliente que se desea eliminar: "
		);

		// Busca el indice del cliente en el array mediante su id
		let indexCliente = this.clientes.findIndex(
			(cliente) => cliente.getID() === id
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
		if (this.clientes.length == 0) {
			console.warn(`No hay registros cargados.`);
			rls.keyInPause("Presione una tecla para continuar...", {
				guide: false,
			});
			return;
		}

		// Solicitar el id del cliente a modificar
		let id: number = rls.questionInt(
			"Ingrese el ID del Cliente que desea modificar: "
		);

		// Buscar el cliente
		let cliente = this.clientes.find((cliente) => cliente?.getID() === id);

		if (!cliente) {
			console.log("Cliente no encontrado");
			rls.keyInPause("Presione una tecla para continuar...", {
				guide: false,
			});
			return;
		}

		// Modificar los datos del cliente
		let nuevoNombre = rls.question(
			"Ingrese el nuevo nombre del cliente (Presione ENTER para mantener el actual): "
		);
		let nuevaDireccion = rls.question(
			"Ingrese la nueva direccion del cliente (Presione ENTER para mantener la actual): "
		);
		let nuevoTelefono = rls.question(
			"Ingrese el nuevo teléfono del cliente (Presione ENTER para mantener el actual):  "
		);

		if (nuevoNombre) {
			cliente.setNombre(nuevoNombre);
		}

		if (nuevaDireccion) {
			cliente.setDireccion(nuevaDireccion);
		}

		if (nuevoTelefono) {
			cliente.setTelefono(nuevoTelefono);
		}
		console.log("Cliente modificado exitosamente");
		rls.keyInPause("Presione una tecla para continuar...", {
			guide: false,
		});
		return;
	}

	// Muestra el Menu Principal de la RED
	public mostrarMenu(): void {
		let opcion: number = -1;
		while (opcion !== 2) {
			console.clear();
			console.log("────────────────────────────────────────");
			console.info(`Bienvenidos a la veterinaria ${this.getNombre()}`);
			console.log("────────────────────────────────────────");
			opcion = rls.keyInSelect(
				["VER CLIENTES", "VER PACIENTES", "VOLVER"],
				"Opción: ",
				{ guide: false, cancel: false }
			);
			try {
				switch (opcion) {
					case 0:
						this.mostrarSubMenuClientes();
						break;
					case 1:
						this.mostrarSubMenuPacientes();
						break;
					case 2:
						break;
				}
			} catch (error) {
				console.error(
					`${(error as Error).name}: ${(error as Error).message}`
				);
				rls.keyInPause(`Presione una tecla para continuar...`, {
					guide: false,
				});
			}
		}
	}

	// SUBMENU CLIENTES
	private mostrarSubMenuClientes(): void {
		let opcion: number = -1;
		while (opcion !== 3) {
			console.clear();
			console.log("────────────────────────────────────────");
			console.log("CLIENTES");
			Entidad.mostrarListado(this.clientes);
			console.log("────────────────────────────────────────");
			opcion = rls.keyInSelect(
				[
					"AGREGAR CLIENTE",
					"MODIFICAR CLIENTE",
					"ELIMINAR CLIENTE",
					"VOLVER",
				],
				"Opción: ",
				{ guide: false, cancel: false }
			);
			try {
				switch (opcion) {
					case 0:
						this.darDeAltaCliente();
						break;
					case 1:
						this.modificarCliente();
						break;
					case 2:
						Entidad.darDeBajaEntidad(this.clientes);
						break;
					case 3:
						break;
				}
			} catch (error) {
				console.error(
					`${(error as Error).name}: ${(error as Error).message}`
				);
				rls.keyInPause(`Presione una tecla para continuar...`, {
					guide: false,
				});
			}
		}
	}

	// SUBMENU PACIENTES
	private mostrarSubMenuPacientes(): void {
		let opcion: number = -1;
		while (opcion !== 2) {
			console.clear();

			// Encabezado para la relación entre clientes y pacientes
			console.log("RELACIÓN CLIENTES Y PACIENTES");
			console.log("────────────────────────────────────────"); //
			if (this.clientes.length === 0) {
				console.log(
					`No hay registros de clientes cargados. Por favor, agregue clientes desde el menú "Ver Clientes".`
				);
			}
			// Recorre la lista de clientes para mostrar sus datos junto con sus pacientes.
			this.clientes.forEach((cliente) => {
				console.log("────────────────────────────────────────"); // Línea de separación entre clientes.
				console.log(
					`Cliente: ${cliente.getNombre()} (ID: ${cliente.getID()})` // Muestra el nombre e ID del cliente.
				);

				// Filtra los pacientes que pertenecen al cliente actual según su ID.
				const pacientesDelCliente = this.pacientes.filter(
					(paciente) => paciente.getIdDuenio() === cliente.getID()
				);

				// Si el cliente tiene pacientes, los recorre y los muestra.
				if (pacientesDelCliente.length > 0) {
					pacientesDelCliente.forEach((paciente) => {
						console.log(
							`    Paciente: ${paciente.getNombre()} (ID: ${paciente.getID()}, Especie: ${paciente.getEspecie()})`
							// Muestra el nombre, ID y especie del paciente
						);
					});
				} else {
					console.log("No tiene pacientes asignados.");
					// Si no hay pacientes, lo indica.
				}
			});
			console.log("────────────────────────────────────────"); // Línea final para cerrar la sección.

			// Muestra las opciones del submenú y permite seleccionar una.
			opcion = rls.keyInSelect(
				["AGREGAR PACIENTE", "ELIMINAR PACIENTE", "VOLVER"], // Opciones del menú.
				"Opción: ", // Mensaje de entrada.
				{ guide: false, cancel: false } // Configuración para que no haya una opción de "cancelar".
			);

			try {
				// Evalúa la opción seleccionada y ejecuta la acción correspondiente.
				switch (opcion) {
					case 0: // Si selecciona "AGREGAR PACIENTE".
						this.darDeAltaPaciente(); // Llama al método para agregar un nuevo paciente.
						break;
					case 1: // Si selecciona "ELIMINAR PACIENTE".
						Entidad.darDeBajaEntidad(this.pacientes); // Llama al método para eliminar un paciente.
						break;
					case 2: // Si selecciona "VOLVER".
						break; // Sale del menú (el bucle termina porque `opcion` se convierte en 2).
				}
			} catch (error) {
				// Captura y muestra cualquier error ocurrido durante las operaciones.
				console.error(
					`${(error as Error).name}: ${(error as Error).message}`
				);
				rls.keyInPause(`Presione una tecla para continuar...`, {
					guide: false,
				});
			}
		}
	}
}
