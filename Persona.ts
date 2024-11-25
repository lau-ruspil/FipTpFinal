import { Entidad } from "./Entidad";

import * as rls from "readline-sync";

// Clase Persona
// ACLARACIÓN: Una Persona puede ser tanto FISICA como JURIDICA
export class Persona extends Entidad {
	private direccion: string = ""; // Direccion de la persona
	private telefono: string = ""; // Telefono de la persona

	//Constructor de la clase Persona
	constructor(
		id: number,
		nombre: string,
		direccion: string,
		telefono: string
	) {
		super(id, nombre); // Llama al constructor de la clase base (Entidad) para inicializar el id y nombre
		this.setDireccion(direccion); // Establece la dirección utilizando el método setDireccion
		this.setTelefono(telefono); // Establece el teléfono utilizando el método setTelefono
	}

	// Método para obtener la dirección de la persona
	public getDireccion(): string {
		return this.direccion;
	}

	// Método para obtener el teléfono de la persona
	public getTelefono(): string {
		return this.telefono;
	}

	// Método para establecer la dirección de la persona
	public setDireccion(direccion: string): void {
		// Verifica si la dirección es válida(no nula y tiene longitud mayor que 1)
		if (direccion == undefined || direccion.length < 1) {
			throw Error(`Dirección inválida (dirección: '${direccion}')`); // Lanza un error si la dirección es inválida
		}
		this.direccion = direccion; // Asigna el valor de la dirección
	}

	// Método para establecer el teléfono de la persona
	public setTelefono(telefono: string): void {
		// Verifica si el teléfono es válido(no nulo y tiene longitud mayor que 1)
		if (telefono == undefined || telefono.length < 1) {
			throw Error(`Teléfono inválido (teléfono: '${telefono}')`); // Lanza un error si el teléfono es inválido
		}

		this.telefono = telefono; // Asigna el valor del teléfono
	}

	// Método estático para crear una nueva persona
	// Solicita al usuario la información de la nueva persona (nombre,dirección y teléfono)
	public static altaPersona(personas: Entidad[]): Persona {
		// Llama al método estático de la clase Entidad para crear una nueva entidad (Persona)
		let nuevaEntidad = Persona.altaEntidad(personas);
		// Solicita al usuario la dirección y el teléfono de la nueva persona
		let direccion: string = rls.question("Dirección: ");
		let telefono: string = rls.question("Teléfono: ");
		// Crea y retorna una nueva instancia de Persona con los datos obtenidos
		return new Persona(
			nuevaEntidad.getID(),
			nuevaEntidad.getNombre(),
			direccion,
			telefono
		);
	}
}
