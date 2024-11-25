import { Entidad } from "./Entidad";
import { Persona } from "./Persona";
import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";

import * as rls from "readline-sync";

// Constante para separacion en lineas
const lineaGuiones: string = "─".repeat(100);

// Clase Veterinaria
export class Veterinaria extends Persona {
	private clientes: Cliente[] = []; // Array para almacenar clientes
	private pacientes: Paciente[] = []; // Array para almacenar Pacientes

	// Constructor de la clase Veterinaria
	constructor(
		id: number,
		nombre: string,
		direccion: string,
		telefono: string
	) {
		super(id, nombre, direccion, telefono); // Llama al Constructor de la clase Persona

		// Precarga de datos para pruebas
		const cli: Cliente = new Cliente(
			1002,
			"Aldo López",
			"Guisasola 3623",
			"155456**"
		);
		this.darDeAltaCliente(cli); // Agrega el cliente a la lista
		const pac: Paciente = new Paciente(
			1003,
			1002,
			"Erahí",
			"Gato",
			this.clientes // Relaciona al paciente con el cliente
		);
		this.darDeAltaPaciente(cli.getID(), pac); // Agrega el paciente a la lista
	}

	// Registra una visita de un cliente determinado (Las visitas se cuentan desde cualquiera de las sucursales de la red)
	private registrarVisita(): void {
		// Verifica si no hay clientes registrados
		if (this.clientes.length === 0) {
			console.warn(`No hay registros cargados.`); // Mensaje de advertencia
			// Hace una pausa para que el usuario vea el mensaje
			rls.keyInPause("Presione una tecla para continuar...", {
				guide: false,
			});
			return; // Finaliza la ejecución del método
		}

		// Selecciona un cliente usando el método obtenerEntidad
		const cliente = Entidad.obtenerEntidad(this.clientes) as Cliente;

		// Verifica si se seleccionó un cliente válido
		if (cliente !== undefined) {
			cliente.setVisitas(cliente.getVisitas() + 1); // Incrementa en 1 el número de visitas del cliente
			console.log("Visita registrada exitosamente"); // Mensaje de éxito
			// Pausa para que el usuario lea el mensaje
			rls.keyInPause("Presione una tecla para continuar...", {
				guide: false,
			});
		}
	}

	// Método para agregar un nuevo Paciente a la lista de pacientes
	private darDeAltaPaciente(
		idDuenio?: number,
		paciente?: Paciente
	): Paciente | undefined {
		// Verifica si el paciente no está definido
		if (paciente == undefined) {
			// Verifica si no hay clientes registrados
			if (this.clientes.length === 0) {
				console.warn(
					`No hay registros cargados. Agregue un cliente para asignar un paciente.`
				); // Muestra una advertencia si no hay cliente
				rls.keyInPause("Presione una tecla para continuar...", {
					guide: false,
				});
				return;
			}

			console.log("Ingrese los datos del Paciente:"); // Solicita los datos del nuevo Paciente
			let nuevaEntidad = Veterinaria.altaEntidad(this.pacientes); // Crea una nueva entidad para el Paciente

			while (idDuenio == undefined) {
				// Ciclo para asegurarse de obtener un ID de dueño válido
				idDuenio = rls.questionInt("Ingrese el ID del dueño: "); // Solicita el ID del dueño al usuario.

				// Verificar si el cliente existe
				let cliente = this.clientes.find(
					// Busca en el arreglo de clientes un cliente con el ID proporcionado
					(cliente) => cliente.getID() === idDuenio // Retorna el cliente si coincide el ID
				);

				if (!cliente) {
					// Si no se encuentra el cliente:
					console.log(
						`No se encontró el cliente con ID ${idDuenio}. Intente nuevamente.`
					); // Mensaje de error
					idDuenio = undefined; // Permite Reintento
				} else {
					break; // Sale del ciclo si el cliente fue encontrado
				}
			}

			// Selección de la especie del paciente
			const opciones: string[] = ["Gato", "Perro", "Exótico"]; // Opciones para seleccionar la especie del paciente
			let index: number = rls.keyInSelect(
				// Solicita al usuario seleccionar una opción
				opciones,
				"Seleccione la especie: ",
				{
					guide: false,
					cancel: false,
				}
			);
			let especie: string = opciones[index]; // Obtiene la especie seleccionada

			// Crear un nuevo Paciente y lo incluye en la lista
			let paciente = new Paciente(
				nuevaEntidad.getID(),
				idDuenio,
				nuevaEntidad.getNombre(),
				especie,
				this.clientes // Relaciona el paciente con los Clientes
			);
			console.log(paciente); // Muestra el objeto paciente en la consola.
			this.pacientes.push(paciente); // Agrega el nuevo paciente al arreglo 'pacientes'

			console.log(
				`Paciente ${paciente.getNombre()} agregado exitosamente.`
			); // Mensaje de éxito.
		} else {
			this.pacientes.push(paciente); // Si ya se proporcionó un Objeto 'Paciente', lo agrega directamente al arreglo
		}

		return paciente; // Retorna el paciente agregado.
	}

	// Metodo para dar de alta un nuevo Cliente
	private darDeAltaCliente(cliente?: Cliente): Cliente | undefined {
		// Si no se pasa un cliente como argumento, se solicita la creación de uno nuevo
		if (cliente == undefined) {
			console.log("Ingrese los datos del Cliente:");

			// Llama al método estático 'altaPersona' de la clase Persona, para ingresar los datos del cliente
			let persona: Persona = Persona.altaPersona(this.clientes);

			// Crea un nuevo objeto Cliente utilizando los datos ingresados
			let cliente: Cliente = new Cliente(
				persona.getID(),
				persona.getNombre(),
				persona.getDireccion(),
				persona.getTelefono()
			);
			// Agrega el nuevo cliente a la lista de Clientes
			this.clientes.push(cliente);
		} else {
			// Si se pasa un cliente como argumento, simplemente se agrega a la lista
			this.clientes.push(cliente);
		}
		return cliente; // Retorna el cliente que se acaba de agregar
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

		// Si no se encuentra el cliente, muestra un mensaje de error y sale del método
		if (indexCliente === -1) {
			console.log("Cliente no encontrado");
			return;
		}

		// Obtiene el ID del cliente para eliminar sus pacientes asociados
		let idCliente = this.clientes[indexCliente].getID();

		// Filtra y elimina los pacientes que pertenecen al cliente que está siendo eliminado
		this.pacientes = this.pacientes.filter(
			(paciente) => paciente.getIdDuenio() !== idCliente
		);

		// Elimina el cliente de la lista 'clientes'
		this.clientes.splice(indexCliente, 1);

		// Muestra un mensaje de éxito.
		console.log(
			"El cliente y sus mascotas han sido eliminados exitosamente"
		);
	}

	// Método para modificar los datos de un cliente
	private modificarCliente(): void {
		// Si no hay clientes registrados, muestra una advertencia y retorna
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

		// Busca el cliente en la lista 'clientes' usando su ID
		let cliente = this.clientes.find((cliente) => cliente?.getID() === id);

		// Si no se encuentra el cliente, muestra un mensaje de error y retorna
		if (!cliente) {
			console.log("Cliente no encontrado");
			rls.keyInPause("Presione una tecla para continuar...", {
				guide: false,
			});
			return;
		}

		// // Solicita al usuario los nuevos datos para el cliente (si los ingresa)
		let nuevoNombre = rls.question(
			"Ingrese el nuevo nombre del cliente (Presione ENTER para mantener el actual): "
		);
		let nuevaDireccion = rls.question(
			"Ingrese la nueva direccion del cliente (Presione ENTER para mantener la actual): "
		);
		let nuevoTelefono = rls.question(
			"Ingrese el nuevo teléfono del cliente (Presione ENTER para mantener el actual):  "
		);

		// Si el usuario ingresa un nuevo nombre, se actualiza en el cliente
		if (nuevoNombre) {
			cliente.setNombre(nuevoNombre);
		}

		// Si el usuario ingresa una nueva dirección, se actualiza en el cliente
		if (nuevaDireccion) {
			cliente.setDireccion(nuevaDireccion);
		}

		// Si el usuario ingresa un nuevo teléfono, se actualiza en el cliente
		if (nuevoTelefono) {
			cliente.setTelefono(nuevoTelefono);
		}
		// Muestra un mensaje indicando que la modificación fue exitosa
		console.log("Cliente modificado exitosamente");
		rls.keyInPause("Presione una tecla para continuar...", {
			guide: false,
		});
		return;
	}

	// Muestra el Menu al seleccionar la Veterinaria
	public menuSeleccionVeterinaria(): void {
		let opcion: number = -1;
		// Bucle que continuara hasta que se seleccione la opcion 2 "VOLVER"
		while (opcion !== 2) {
			console.clear();
			console.log(lineaGuiones);
			console.info(`Bienvenidos a la veterinaria ${this.getNombre()}`);
			console.log(lineaGuiones);

			// Muestra las opciones del menú y espera una entrada del usuario
			opcion = rls.keyInSelect(
				["VER CLIENTES", "VER PACIENTES", "VOLVER"], // Opciones disponibles
				"Opción: ",
				{ guide: false, cancel: false } // Configuración del menú
			);
			try {
				// Dependiendo de la opción seleccionada, llama al método correspondiente
				switch (opcion) {
					case 0:
						this.mostrarSubMenuClientes(); // Muestra el subMenú de Clientes
						break;
					case 1:
						this.mostrarSubMenuPacientes(); // Muestra el subMenú de Pacientes
						break;
					case 2:
						break; // Sale del bucle, Opción VOLVER
				}
			} catch (error) {
				// Captura errores y muestra un mensaje de error
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
		// Bucle que continuará hasta que se seleccione la opción 4 VOLVER
		while (opcion !== 4) {
			console.clear();
			console.log(lineaGuiones);
			console.log("CLIENTES");
			Cliente.mostrarListado(this.clientes); // Muestra el listado de clientes
			console.log(lineaGuiones);

			// Muestra las opciones del Menú y espera una entrada del usuario
			opcion = rls.keyInSelect(
				[
					"AGREGAR CLIENTE",
					"REGISTRAR VISITA CLIENTE",
					"MODIFICAR CLIENTE",
					"ELIMINAR CLIENTE",
					"VOLVER",
				],
				"Opción: ",
				{ guide: false, cancel: false }
			);
			try {
				// Dependiendo de la opción seleccionada, llama al método correspondiente
				switch (opcion) {
					case 0:
						this.darDeAltaCliente(); // Agregar un nuevo cliente
						break;
					case 1:
						this.registrarVisita(); // Registrar una visita para un cliente
						break;
					case 2:
						this.modificarCliente(); // Modificar un Cliente
						break;
					case 3:
						Entidad.darDeBajaEntidad(this.clientes); // Eliminar un cliente
						break;
				}
			} catch (error) {
				// Captura errores y muestra un mensaje de error
				console.error(
					`${(error as Error).name}: ${(error as Error).message}`
				);
				// Pausa para que el usuario pueda leer el mensaje
				rls.keyInPause(`Presione una tecla para continuar...`, {
					guide: false,
				});
			}
		}
	}

	// SUBMENU PACIENTES
	private mostrarSubMenuPacientes(): void {
		let opcion: number = -1;
		// Bucle que continuara hasta que se seleccione la opción 2 "VOLVER"
		while (opcion !== 2) {
			console.clear();

			// Muestra el encabezado del Menú de relación entre clientes y pacientes
			console.log("RELACIÓN CLIENTES Y PACIENTES");
			console.log(lineaGuiones);

			// Si no hay clientes muestra una advertencia
			if (this.clientes.length === 0) {
				console.warn(
					`\tNo hay registros de clientes cargados. Por favor, agregue clientes desde el menú "Ver Clientes".`
				);
			}
			// Recorre la lista de clientes para mostrar sus datos junto con sus pacientes.
			this.clientes.forEach((cliente) => {
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
							`\t- Paciente: ${paciente.getNombre()} (ID: ${paciente.getID()}, Especie: ${paciente.getEspecie()})`
							// Muestra el nombre, ID y especie del paciente
						);
					});
				} else {
					console.log("\tNo tiene pacientes asignados.");
					// Si no hay pacientes, lo indica.
				}
				console.log(lineaGuiones); // Línea final para cerrar la sección.
			});

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
				// Pausa para que el usuario pueda leer el mensaje
				rls.keyInPause(`Presione una tecla para continuar...`, {
					guide: false,
				});
			}
		}
	}

	// Muestra un listado de las proveedores cargados
	public static mostrarListado(veterinarias: Veterinaria[]): void {
		if (veterinarias.length > 0) {
			veterinarias.forEach((veterinaria) => {
				console.log(
					`\tID: ${veterinaria.getID()} - Nombre: ${veterinaria.getNombre()} - Dirección: ${veterinaria.getDireccion()} - Tel: ${veterinaria.getTelefono()}`
				);
			});
		} else {
			console.warn("\tNo hay registros."); // Si no hay entidades, informa al usuario
		}
	}
}
