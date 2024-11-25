import { Persona } from "./Persona";

// Clase Cliente
export class Cliente extends Persona {
	private visitas: number; // Numero de visitas del cliente

	//Constructor de la clase Cliente
	constructor(
		id: number,
		nombre: string,
		direccion: string,
		telefono: string
	) {
		super(id, nombre, direccion, telefono); // Constructor de la clase Persona
		this.visitas = 0; // Incializa el numero de las visitas en 0
	}

	// Método que devuelve si el cliente es VIP, basado en las visitas realizadas
	public esVip(): boolean {
		return this.getVisitas() >= 5; // Retorna True si el cliente tiene 5 o más visitas
	}

	// Metodo que devuelve el número de visitas realizadas por el cliente
	public getVisitas(): number {
		return this.visitas;
	}

	// Metodo que establece el número de visitas
	public setVisitas(visitas: number): void {
		if (visitas !== undefined && visitas > 0) {
			// Valida que el número de visitas sea positivo
			this.visitas = visitas; // Asigna el valor de visitas
		}
	}

	// Método para establecer el nombre del cliente. Extiende el método de Persona.
	// Se valida que el nombre no contenga números
	public setNombre(nombre: string): void {
		//busca cualquier numero en el nombre
		if (nombre.match(/\d/)) {
			// Si contiene números arroja un error
			throw new Error(
				`${nombre} Nombre inválido: El nombre no puede ser un número o contener números.`
			);
		}

		super.setNombre(nombre); // Llama al método setNombre de la clase Persona para establecer el nombre
	}

	// Método estático que muestra el listado de clientes
	public static mostrarListado(clientes: Cliente[]): void {
		if (clientes.length > 0) {
			// Si hay clientes en el arreglo, los muestra uno por uno
			clientes.forEach((cliente) => {
				// Muestra los detalles del cliente, incluyendo si es VIP
				console.log(
					`\tID: ${cliente.getID()} - Nombre: ${cliente.getNombre()} - Dirección: ${cliente.getDireccion()} - Visitas: ${cliente.getVisitas()} - VIP: ${
						cliente.esVip() ? "Si" : "No"
					}`
				);
			});
		} else {
			// Si no hay clientes en el arreglo, muestra un mensaje de advertencia
			console.warn("\tNo hay registros."); // Si no hay entidades, informa al usuario
		}
	}
}
