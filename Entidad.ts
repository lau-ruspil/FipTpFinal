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
		if (id == undefined || id < 1) throw Error(`ID inválido (id: ${id}`);
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
}
