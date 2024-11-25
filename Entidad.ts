// Interfaz 'IEntidad' para definir la estructura de una entidad
import { IEntidad } from "./IEntidad";

import * as rls from "readline-sync"; // Para entrada de datos en consola

// Define los valores mínimos y máximos para los IDs permitidos
const MIN_ID: number = 1; // ID minimo permitido
const MAX_ID: number = 999999; // ID maximo permitido

// Clase 'Entidad' que implementa la interfaz 'IEntidad'
export class Entidad implements IEntidad {
	private id: number = 0; // ID unico de la entidad
	private nombre: string = ""; // Nombre de la entidad

	// Constructor de la clase Persona
	constructor(id: number, nombre: string) {
		// Validar si el id es indefinido o es menor a un caracter
		if (id == undefined || id < 1) throw Error(`ID inválido (id: ${id}`);

		this.id = id; // Asigna el ID validado

		// Llama al setter de nombre para asegurarse de que sea válido
		this.setNombre(nombre);
	}

	// Retorna el ID de la Entidad
	public getID(): number {
		return this.id;
	}

	//Retorna el nombre de la Entidad
	public getNombre(): string {
		return this.nombre;
	}

	// Establece el nombre de la entidad con validaciones
	public setNombre(nombre: string): void {
		// Validación: El nombre no puede ser indefinido
		if (nombre == undefined) {
			throw Error(`Nombre inválido (nombre: '${nombre}')`);
		}

		// Validación: El nombre debe tener al menos 3 caracteres
		if (nombre.length < 3) {
			throw new Error(
				`Nombre inválido: El nombre  debe tener al menos 3 caracteres. (Nombre: '${nombre}')`
			);
		}

		// Asigna el nombre si es válido
		this.nombre = nombre;
	}

	// Metodo estático que genera un número entero aleatorio entre un mínimo y un máximo
	private static obtenerNumeroAleatorio(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// Método estático privado que genera un ID único, comprobando que no se repita en la lista de entidades
	private static generarUID(entidades: Entidad[]): number {
		// Genera un ID aleatorio dentro del rango permitido
		let UID: number = Entidad.obtenerNumeroAleatorio(MIN_ID, MAX_ID);

		// Verifica si el ID generado ya existe en la lista de entidades
		if (
			entidades.filter((entidad) => {
				entidad.getID() == UID; // Filtra las entidades con el mismo ID
			}).length > 0
		) {
			// Si ya existe, vuelve a generar un nuevo ID de manera recursiva
			UID = Entidad.generarUID(entidades);
		}
		return UID; // Retorna un ID único
	}

	// Método estático público que genera una nueva Entidad, pidiendo al usuario el nombre
	public static altaEntidad(entidades: Entidad[]): Entidad {
		let nombre: string = rls.question("Nombre: "); // Solicita el nombre de la entidad
		return new Entidad(Entidad.generarUID(entidades), nombre); // Crea una nueva entidad con un ID único
	}

	// Muestra un listado de las entidades registradas
	public static mostrarListado(entidades: Entidad[]): void {
		// Verifica si hay entidades registradas
		if (entidades.length > 0) {
			// Si hay, las recorre y muestra el ID y nombre de cada una
			entidades.forEach((entidad) => {
				console.log(
					`\tID: ${entidad.getID()} - Nombre: ${entidad.getNombre()}`
				);
			});
		} else {
			// Si no hay entidades, muestra un mensaje de advertencia
			console.warn("\tNo hay registros."); // Si no hay entidades, informa al usuario
		}
	}

	// Metodo estatico para eliminar una entidad de la lista
	public static darDeBajaEntidad(entidades: Entidad[]): void {
		// Verifica si hay entidades registradas
		if (entidades.length == 0) {
			console.warn(`No hay registros cargados.`);
			// Pausa para que el usuario lea el mensaje
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
			return;
		}

		// Solicita el ID de la entidad a eliminar
		let id: number = rls.questionInt(`Ingrese el ID a eliminar: `);

		// Busca la Entidad con el ID ingresado
		const index: number = entidades.findIndex(
			(entidad) => entidad.getID() == id
		);

		// Si la entidad existe, la elimina de la lista
		if (index !== -1) {
			entidades.splice(index, 1); // Elimina la entidad del arreglo
			console.info(`Eliminado/a correctamente.`);
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
		} else {
			// Si no se encuentra la entidad muestra un mensaje de advertencia
			console.warn(`Registro no encontrado.`);
			// Pausa para que el usuario lea el mensaje
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
		}
	}

	// Metodo estático para obtener una entidad dada su ID
	public static obtenerEntidad(entidades: Entidad[]): Entidad | undefined {
		// Verifica si hay entidades registradas
		if (entidades.length == 0) {
			console.warn(`No hay registros cargados.`);
			// Pausa para que el usuario lea el mensaje
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
			return;
		}

		// Solicita el ID de la entidad a seleccionar
		let id: number = rls.questionInt(`Ingrese el ID a seleccionar: `);

		// Busca la entidad con el ID ingresado
		const index: number = entidades.findIndex(
			(entidad) => entidad.getID() == id
		);

		// Si la entidad existe, la retorna
		if (index !== -1) {
			return entidades[index];
		} else {
			// Si no se encuentra la entidad muestra un mensaje de error
			console.error(`Registro no encontrado.`);
			// Pausa para que el usuario lea el mensaje
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
		}
	}
}
