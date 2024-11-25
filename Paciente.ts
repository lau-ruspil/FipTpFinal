import { Entidad } from "./Entidad";
import { Cliente } from "./Cliente";

// Clase Paciente
export class Paciente extends Entidad {
	private idDuenio: number = 0; // Almacena el id del cliente (Dueño del paciente)
	private especie: string = ""; // Almacena la especie a la que pertenece el paciente

	// Constructor de la clase especie
	constructor(
		id: number,
		idDuenio: number,
		nombre: string,
		especie: string,
		clientes: Cliente[] // Lista de clientes para validar el ID del dueño
	) {
		// Llama al constructor de la clase base (Entidad) para inicializar el ID y el nombre
		super(id, nombre);
		// Establece el ID del dueño (cliente) del paciente, validando si el cliente existe
		this.setIdDuenio(idDuenio, clientes);
		// Establece la especie del paciente
		this.setEspecie(especie);
	}

	// Retorna el ID del cliente dueño del Paciente
	public getIdDuenio(): number {
		return this.idDuenio;
	}

	// Retorna la especie a la que pertenece el Paciente
	public getEspecie(): string {
		return this.especie;
	}

	// Establece el ID del cliente dueño del Paciente
	// Este método valida que el ID del dueño corresponda a un cliente existente
	private setIdDuenio(idDuenio: number, clientes: Entidad[]): void {
		// Verifica si el ID del dueño es inválido o si el cliente no existe
		if (
			idDuenio == undefined || // Si el ID del dueño es indefinido
			clientes.findIndex((cliente) => cliente.getID() == idDuenio) < 0 // Si no se encuentra el cliente en la lista
		) {
			// Lanza un error si el ID del dueño no es válido o no existe
			throw Error(
				`Id de cliente inválido o no existe. (cliente: ${idDuenio})`
			);
		}
		// Si es válido, se asigna el ID del dueño al paciente
		this.idDuenio = idDuenio;
	}

	// Establece la especie del paciente
	// La especie se asigna directamente a la propiedad especie
	private setEspecie(especie: string): void {
		this.especie = especie;
	}

	// Sobrescribe el método setNombre de la clase base 'Entidad'
	// Para agregar una validación adicional que no permita números en el nombre
	public setNombre(nombre: string): void {
		// Verificar si el nombre contiene números
		if (nombre.match(/\d/)) {
			// Si el nombre contiene números, lanza un error
			throw new Error(
				`${nombre} Nombre inválido: El nombre no puede ser un número o contener números.`
			);
		}
		// Llama al método setNombre de la clase base (Entidad) para asignar el nombre
		super.setNombre(nombre);
	}
}
