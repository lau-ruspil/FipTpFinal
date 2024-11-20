import { Persona } from "./Persona";

// Clase Cliente
export class Cliente extends Persona {
	private visitas: number;

	//Constructor de la clase Cliente
	constructor(
		id: number,
		nombre: string,
		direccion: string,
		telefono: string
	) {
		super(id, nombre, direccion, telefono);
		this.visitas = 0;
	}

	// Retorna si el Cliente es VIP (Si tiene más de 5 visitas realizadas)
	public esVip(): boolean {
		return this.getVisitas() >= 5;
	}

	// Retorna el número de visitas realizadas
	public getVisitas(): number {
		return this.visitas;
	}

	// Establece el número de visitas
	public setVisitas(visitas: number): void {
		if (visitas !== undefined && visitas > 0) {
			// Valida que las visitas sean positivas
			this.visitas = visitas;
		}
	}

	// Establece el nombre del cliente. Extiende el método original de Entidad para no permitir números
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

    // Muestra un listado de las clientes cargados
    public static mostrarListado(cliente: Cliente[]): void{
        if (cliente.length > 0) {
            cliente.forEach((cliente) => {
                console.log(
                    `\tID: ${cliente.getID()} - Nombre: ${cliente.getNombre()} - Dirección: ${cliente.getDireccion()} - Visitas: ${cliente.getVisitas()} - VIP: ${cliente.esVip()?'Si':'No'}`
                );
            });
        }else{
            console.warn("\tNo hay registros."); // Si no hay entidades, informa al usuario
        }
    }
}
