import { Cliente } from "../Cliente";
import { Paciente } from "../Paciente";
import { Proveedor } from "../Proveedor";
import { Veterinaria } from "../Veterinaria";
import { Red } from "../Red";
import * as rls from "readline-sync";

console.clear();
try {
	// Crear una instancia de la red de veterinarias
	const red: Red = new Red("Red de Veterinarias");

	let opcion: number; // Variable para almacenar la opción seleccionada por el usuario

	// Bucle que muestra el menú principal y espera la interacción del usuario
	do {
		// Despliegue de menú con las opciones disponibles
		console.log("\n--- MENÚ PRINCIPAL ---");
		console.log("1. Crear una nueva Veterinaria");
		console.log("2. Dar de alta un Cliente");
		console.log("3. Dar de alta un Paciente");
		console.log("4. Dar de alta un Proveedor");
		console.log("5. Modificar datos de un Cliente");
		console.log("6. Dar de baja un Cliente");
		console.log("7. Modificar datos de una Veterinaria");
		console.log("8. Ver detalles de la Red");
		console.log("9. Salir");

		// Capturar la opcion elegida por el usuario
		opcion = rls.questionInt("\nIngrese una opción: ");

		// Procesar la opción elegida
		switch (opcion) {
			case 1: {
				// Llamada al metodo para crear una nueva veterinaria en la red
				let nuevaVeterinaria = red.darDeAltaVeterinaria();
				// Si se crea correctamente, muestra la información de la veterinaria
				if (nuevaVeterinaria) {
					console.log("Veterinaria creada exitosamente:");
					console.log(nuevaVeterinaria);
				} else {
					console.log("No se pudo crear la veterinaria.");
				}
				break;
			}
			case 2: {
				// Selecciona una veterinaria de la red para registrar un cliente
				let veterinaria = seleccionarVeterinaria(red);
				if (veterinaria) {
					// Registra un nuevo cliente
					let nuevoCliente = veterinaria.darDeAltaCliente();
					if (nuevoCliente) {
						// Si se registra correctamente, muestra los detalles del cliente
						console.log("Cliente creado exitosamente:");
						console.log(nuevoCliente);
					}
				}
				break;
			}
			case 3: {
				// Selecciona una veterinaria para registrar un paciente
				let veterinaria = seleccionarVeterinaria(red);
				if (veterinaria) {
					// Solicita el ID del cliente dueño del paciente
					let idCliente = rls.questionInt(
						"Ingrese el ID del dueño del paciente: "
					);
					// Registra un nuevo paciente
					let nuevoPaciente =
						veterinaria.darDeAltaPaciente(idCliente);
					// Si se registra el paciente correctamente, muestra sus datos
					if (nuevoPaciente) {
						console.log("Paciente creado exitosamente:");
						console.log(nuevoPaciente);
					}
				}
				break;
			}
			case 4: {
				// Llama al metodo para registrar un proveedor en la red
				let nuevoProveedor = red.darDeAltaProovedor();
				if (nuevoProveedor) {
					//Muestra los detalles del proveedor registrado
					console.log("Proveedor creado exitosamente:");
					console.log(nuevoProveedor);
				}
				break;
			}
			case 5: {
				// Selecciona una veterinaria para modificar datos de un cliente
				let veterinaria = seleccionarVeterinaria(red);
				if (veterinaria) {
					veterinaria.modificarCliente(); // Llama al metodo de modificacion del cliente
				}
				break;
			}
			case 6: {
				// Selecciona una veterinaria para eliminar un cliente y sus pacientes
				let veterinaria = seleccionarVeterinaria(red);
				if (veterinaria) {
					veterinaria.darDeBajaCliente(); // Llama al metodo de eliminacion del cliente
				}
				break;
			}
			case 7: {
				//Modifica los datos de una veterinaria en la red
				red.modificarVeterinaria();
				break;
			}
			case 8: {
				// Muestra toda la información de la red
				console.log("Detalles de la Red:");
				console.log(red);
				break;
			}
			case 9:
				// Sale del programa mostrando un mensaje de despedida
				console.log("Saliendo del programa...");
				break;
			default:
				// Si el usuario ingresa una opcion invalida, muestra un mensaje de error
				console.log(
					"Opción inválida. Por favor, ingrese una opción válida."
				);
		}
		// Mantiene el menu activo hasta que el usuario elija salir (opcion 9)
	} while (opcion !== 9);
} catch (error) {
	// Maneja cualquier error que ocurra durante la ejecución del programa
	console.error(`${(error as Error).name}: ${(error as Error).message}`);
}

function seleccionarVeterinaria(red: Red): Veterinaria | undefined {
	let veterinarias = red.getVeterinarias(); // Obtiene la lista de todas las veterinarias
	if (veterinarias.length === 0) {
		console.log("No hay veterinarias registradas."); // Si no hay veterinarias, informa al usuario
		return undefined;
	}

	// Muestra las veterinarias disponibles con sus IDs
	console.log("Seleccione una Veterinaria por su ID:");
	veterinarias.forEach((veterinaria) => {
		console.log(
			`ID: ${veterinaria.getID()} - Nombre: ${veterinaria.getNombre()}`
		);
	});

	// Captura el ID ingresado por el usuario
	let id = rls.questionInt("Ingrese el ID de la veterinaria: ");

	// Busca la veterinaria correspondiente al ID ingresado
	let veterinariaSeleccionada = veterinarias.find(
		(vet) => vet.getID() === id
	);

	if (veterinariaSeleccionada) {
		return veterinariaSeleccionada; // Retorna la veterinaria seleccionada si existe
	} else {
		console.log(
			"ID inválido. No se encontró ninguna veterinaria con ese ID."
		); // Maneja errores de selección
		return undefined; // Retorna undefined si no se encuentra una coincidencia
	}
}
