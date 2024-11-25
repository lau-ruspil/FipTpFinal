import { Persona } from "./Persona";

// Clase Proveedor
export class Proveedor extends Persona {
	private insumos: string[] = []; // Arreglo para almacenar los ius

	// Constructor de la clase Proveedor
	constructor(
		id: number,
		nombre: string,
		direccion: string,
		telefono: string,
		insumos: string[]
	) {
		super(id, nombre, direccion, telefono); // Llama al constructor de la clase Persona para inicializar los atributos heredados
		this.setInsumos(insumos); // Establece los insumos utilizando el método setInsumos
	}

	// Retorna una copia del arreglo de insumos provistos por el Proveedor
	// Esto evita modificar el arreglo original fuera de la clase
	private getInsumos(): string[] {
		return [...this.insumos];
	}

	// Método para establecer los Insumos del Proveedor
	public setInsumos(insumos: string[]): void {
		/* Valida que el arreglo de insumos no sea nulo, no esté vacío
		y que todos los elementos del arreglo tengan al menos un carácter*/
		if (
			insumos == undefined ||
			insumos.length < 1 ||
			insumos.filter((insumo) => {
				insumo.length > 0; // Comprueba que cada insumo tenga al menos un carácter
			}).length == insumos.length // Verifica que todos los elementos cumplan la condición
		) {
			throw Error(`Insumos inválidos (insumos: ([${insumos}])`); // Lanza un error si los insumos son inválidos
		}
		this.insumos = insumos; // Asigna el arreglo de insumos al atributo de la clase
	}

	// Método estático para mostrar un listado de los proveedores registrados
	public static mostrarListado(proveedores: Proveedor[]): void {
		// Verifica si hay proveedores registrados
		if (proveedores.length > 0) {
			// Itera sobre el arreglo de proveedores y muestra su información
			proveedores.forEach((proveedor) => {
				console.log(
					`\tID: ${proveedor.getID()} - Nombre: ${proveedor.getNombre()} - Dirección: ${proveedor.getDireccion()} - Tel: ${proveedor.getTelefono()} - Insumos: [${proveedor.getInsumos()}]`
				);
			});
		} else {
			console.warn("\tNo hay registros."); // Muestra un mensaje de advertencia si no hay proveedores registrados.
		}
	}
}
