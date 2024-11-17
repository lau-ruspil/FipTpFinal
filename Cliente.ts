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
		if (!visitas == undefined && visitas > 0) {
			// Valida que las visitas sean positivas
			this.visitas = visitas;
		}
	}
}
