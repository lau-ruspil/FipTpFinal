// Interfaz 'IEntidad' para definir la estructura de una entidad
import { IEntidad } from "./IEntidad";

import * as rls from "readline-sync"; // Para entrada de datos en consola

const MIN_ID: number = 1; // ID minimo permitido
const MAX_ID: number = 999999; // ID maximo permitido

// Clase 'Entidad' que implementa la interfaz 'IEntidad'
export class Entidad implements IEntidad {
	private id: number = 0; // ID unico de la entrada
	private nombre: string = ""; // Nombre de la entidad

	// Constructor de la clase Persona
	constructor(id: number, nombre: string) {
		// Validar si el id es indefinido o es menor a un caracter
		if (id == undefined || id < 1) throw Error(`ID inválido (id: ${id}`);

		// Validar que el nombre no este vacío
		if (!nombre) {
			throw new Error(`Nombre inválido: El nombre no puede estar vacío.`);
		}

		// Validar si el nombre no es una cadena
		if (typeof nombre !== "string") {
			throw new Error(
				`${nombre} Nombre inválido: El nombre debe ser una cadena de texto.`
			);
		}

		// Verificar si el nombre tiene números
		if (nombre.match(/\d/)) {
			//busca cualquier numero en el nombre
			throw new Error(
				`${nombre} Nombre inválido: El nombre no puede ser un número o contener números.`
			);
		}

		// Validar si el nombre tiene menos de 3 caracteres
		if (nombre.length < 3) {
			throw new Error(
				`${nombre} Nombre inválido: El nombre  debe tener al menos 3 caracteres.`
			);
		}

		this.id = id;
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

	// Establece el nombre de la entidad
	public setNombre(nombre: string): void {
		if (nombre == undefined || nombre.length < 1) {
			throw Error(`Nombre inválido (nombre: '${nombre}')`);
		}
		this.nombre = nombre;
	}

	// Función estática que genera un número entero aleatorio entre min y max
	private static obtenerNumeroAleatorio(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// Genera un ID unico validando que no se repita en la lista de entidades
	private static generarUID(entidades: Entidad[]): number {
		let UID: number = Entidad.obtenerNumeroAleatorio(MIN_ID, MAX_ID); // ¿Sería lo mismo poner this.obtenerNumeroAleatorio?

		// Verifica si el ID generado ya existe
		if (
			entidades.filter((entidad) => {
				entidad.getID() == UID;
			}).length > 0
		) {
			//Si hay un número de Id que coincide vuelvo a llamar a la función
			UID = Entidad.generarUID(entidades);
		}
		return UID; //En este punto dada la recursividad el número será único
	}

	// Retorna una nueva Entidad
	public static altaEntidad(entidades: Entidad[]): Entidad {
		let nombre: string = rls.question("Nombre: ");
		return new Entidad(Entidad.generarUID(entidades), nombre);
	}

	// Muestra un listado de las entidades cargadas
	public static mostrarListado(entidades: Entidad[]): void {
		if (entidades.length > 0) {
			entidades.forEach((entidad) => {
				console.log(
					`\tID: ${entidad.getID()} - Nombre: ${entidad.getNombre()}`
				);
			});
		} else {
			console.warn("\tNo hay registros."); // Si no hay entidades, informa al usuario
		}
	}

	// Elimina una entidad
	public static darDeBajaEntidad(entidades: Entidad[]): void {
		if (entidades.length == 0) {
			console.warn(`No hay registros cargados.`);
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
			return;
		}

		// Solicita el nombre de la entidad a eliminar
		let id: number = rls.questionInt(`Ingrese el ID a eliminar: `);
		const index: number = entidades.findIndex(
			(entidad) => entidad.getID() == id
		);

		// Si se encuentra la Entidad
		if (index !== -1) {
			// Elimina la entidad
			entidades.splice(index, 1);
			console.info(`Eliminada correctamente.`);
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
		} else {
			// Si no se encuentra la entidad informa al usuario
			console.error(`Registro no encontrado.`);
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
		}
	}

	// Retorna una Entidad dada su ID
	public static obtenerEntidad(entidades: Entidad[]): Entidad | undefined {
		if (entidades.length == 0) {
			console.warn(`No hay registros cargados.`);
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
			return;
		}

		// Solicita el nombre de la entidad a eliminar
		let id: number = rls.questionInt(`Ingrese el ID a seleccionar: `);
		const index: number = entidades.findIndex(
			(entidad) => entidad.getID() == id
		);

		// Si se encuentra la Entidad
		if (index !== -1) {
			return entidades[index];
		} else {
			// Si no se encuentra la entidad informa al usuario
			console.error(`Registro no encontrado.`);
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
		}
	}
}
