import { Entidad } from "./Entidad";
import { Cliente } from "./Cliente";

// Clase Paciente
export class Paciente extends Entidad {
	private idDuenio: number = 0;
	private especie: string = "";

	// Constructor de la clase especie
	constructor(
		id: number,
		idDuenio: number,
		nombre: string,
		especie: string,
		clientes: Cliente[]
	) {
		super(id, nombre);
		this.setIdDuenio(idDuenio, clientes);
		this.setEspecie(especie);
	}

	// Retorna el ID del cliente dueño del Paciente
	public getIdDuenio(): number {
		return this.idDuenio;
	}

	// Retorna la especie a la que pertenece
	public getEspecie(): string {
		return this.especie;
	}

	// Establece el ID del cliente dueño del Paciente
	public setIdDuenio(idDuenio: number, clientes: Entidad[]): void {
		if (
			idDuenio == undefined ||
			clientes.findIndex((cliente) => cliente.getID() == idDuenio) < 0
		) {
			throw Error(
				`Id de cliente inválido o no existe. (cliente: ${idDuenio})`
			);
		}
		this.idDuenio = idDuenio;
	}

	// Establece la especie del paciente
	// especie: Debe ser una de las especies indicadas en el arreglo
	public setEspecie(especie: string): void {
		this.especie = especie;
	}

	// Establece el nombre del paciente. Extiende el método original de Entidad para no permitir números
	public setNombre(nombre: string): void {
		super.setNombre(nombre);

		// Verificar si el nombre tiene números
		if (nombre.match(/\d/)) {
			//busca cualquier numero en el nombre
			throw new Error(
				`${nombre} Nombre inválido: El nombre no puede ser un número o contener números.`
			);
		}
	}
}
