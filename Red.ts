import { Entidad } from "./Entidad";
import { Persona } from "./Persona";
import { Veterinaria } from "./Veterinaria";
import { Proveedor } from "./Proveedor";

import * as rls from "readline-sync";

// Clase Red
export class Red {
	private nombre: string = "";
	private veterinarias: Veterinaria[];
	private proveedores: Proveedor[];

	//Constructor de la clase Red
	constructor(nombre: string) {
		this.veterinarias = [];
		this.proveedores = [];
		this.setNombre(nombre);
	}

	// Retorna el nombre
	public getNombre(): string {
		return this.nombre;
	}

	// Establece el nombre
	public setNombre(nombre: string): void {
		if (nombre == undefined || nombre.length < 1) {
			throw new Error(`Nombre inválido (nombre: ${nombre}).`);
		}
		this.nombre = nombre;
	}

	// Da de alta una nueva Veterinaria
	// Retorna -1 o el ID de la veterinaria generada si tuvo éxito
	public darDeAltaVeterinaria(veterinaria?: Veterinaria): Veterinaria | undefined {
		//A modo de testeo tambien recibe una Veterinaria ya definida (precarga)		
		if (veterinaria==undefined){
			console.log("Ingrese los datos de la Veterinaria:");
			let persona = Persona.altaPersona(this.veterinarias);		
			let veterinaria = new Veterinaria(
				persona.getID(),
				persona.getNombre(),
				persona.getDireccion(),
				persona.getTelefono()
			);		
			this.veterinarias.push(veterinaria);
		}else{
			this.veterinarias.push(veterinaria);
		}
		return veterinaria;
	}

	// Solicita un arreglo de insumos
	private solicitarInsumos(): string[] {
		//Solicito los insumos
		let insumos: string[] = [];
		let finalizar: boolean = false;
		console.log("Ingrese los insumos provistos. (ENTER para finalizar)");
		while (!finalizar) {
			let insumo: string = rls.question("Insumo/s: ");
			if (insumo !== "") {
				insumos.push(insumo);
			} else {
				finalizar = true;
			}
		}
		return insumos;
	}

	//Crea un nuevo proveedor
	public darDeAltaProovedor(proveedor?: Proveedor): Proveedor | undefined {
		//A modo de testeo tambien recibe una Veterinaria ya definida (precarga)		
		if (proveedor==undefined){
			console.log("Ingrese los datos del Proveedor:");
			let nuevaPersona: Persona = Persona.altaPersona(this.proveedores);

			let insumos: string[] = this.solicitarInsumos();

			//Creo el provedor
			let proveedor: Proveedor = new Proveedor(
				nuevaPersona.getID(),
				nuevaPersona.getNombre(),
				nuevaPersona.getDireccion(),
				nuevaPersona.getTelefono(),
				insumos
			);
			this.proveedores.push(proveedor);
		}else{
			this.proveedores.push(proveedor);
		}
		return proveedor;
	}

	// Modifica una Veterinaria
	public modificarVeterinaria(): void {
		if (this.veterinarias.length === 0) {
			console.warn(`No hay registros cargados.`);
			rls.keyInPause("Presione una tecla para continuar...", {
				guide: false,
			});
			return;
		}

		// Obtener la veterinaria
		const veterinaria = Entidad.obtenerEntidad(
			this.veterinarias
		) as Veterinaria;

		// Si no se encuentra la veterinaria, se ha manejado el error dentro de obtenerEntidad
		if (!veterinaria) return; // Solo regresamos si la veterinaria no fue encontrada

		// Solicitar los nuevos datos de la veterinaria
		let nuevoNombre = rls.question(
			`Ingrese el nuevo nombre (Presione ENTER para mantener el actual): `
		);

		let nuevaDireccion = rls.question(
			`Ingrese la nueva dirección (Presione ENTER para mantener la actual): `
		);

		let nuevoTelefono = rls.question(
			`Ingrese el nuevo teléfono (Presione ENTER para mantener el actual): `
		);

		// Actualizar los datos solo si se proporcionan nuevos valores
		if (nuevoNombre) {
			veterinaria.setNombre(nuevoNombre);
		}

		if (nuevaDireccion) {
			veterinaria.setDireccion(nuevaDireccion);
		}

		if (nuevoTelefono) {
			veterinaria.setTelefono(nuevoTelefono);
		}

		console.info("Veterinaria modificada correctamente.");
		rls.keyInPause(`Presione una tecla para continuar...`, {
			guide: false,
		});
	}

	// Modifica un proveedor
	public modificarProveedor(): void {
		if (this.proveedores.length == 0) {
			console.warn(`No hay registros cargados.`);
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
			return;
		}

		const proveedor = Entidad.obtenerEntidad(this.proveedores) as Proveedor;

		if (proveedor !== undefined) {
			let nuevoNombre = rls.question(
				"Ingrese el nuevo nombre (ENTER para mantener el actual): "
			);

			let nuevaDireccion = rls.question(
				"Ingrese la nueva dirección (ENTER para mantener la actual): "
			);

			let nuevoTelefono = rls.question(
				"Ingrese el nuevo teléfono (ENTER para mantener el actual): "
			);

			let insumos: string[] = this.solicitarInsumos();

			if (nuevoNombre) {
				proveedor.setNombre(nuevoNombre);
			}

			if (nuevaDireccion) {
				proveedor.setDireccion(nuevaDireccion);
			}

			if (nuevoTelefono) {
				proveedor.setTelefono(nuevoTelefono);
			}

			if (insumos.length > 0) {
				proveedor.setInsumos(insumos);
			}

			console.info("Proveedor actualizado correctamente.");
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
		} else {
			console.error("No se encontró ningún Proveedor con ese nombre.");
			rls.keyInPause(`Presione una tecla para continuar...`, {
				guide: false,
			});
		}
	}

	// Muestra el Menu Principal de la RED
	public mostrarMenu(): void {
		let opcion: number = -1;
		while (opcion !== 2) {
			console.clear();
			console.log("────────────────────────────────────────");
			console.info(
				`Bienvenidos a la red de veterinarias ${this.getNombre()}`
			);
			console.log("────────────────────────────────────────");
			console.log("VETERINARIAS");

			Veterinaria.mostrarListado(this.veterinarias);
			console.log("────────────────────────────────────────");
			console.log("PROVEEDORES");
			Proveedor.mostrarListado(this.proveedores);
			console.log("────────────────────────────────────────");
			// Devuelve indices empezando desde el 0
			opcion = rls.keyInSelect(
				["VETERINARIAS", "PROVEEDORES", "SALIR"],
				"Opción: ",
				{ guide: false, cancel: false }
			);
			try {
				switch (opcion) {
					case 0:
						this.mostrarSubMenuVeterinarias();
						break;
					case 1:
						this.mostrarSubMenuProveedores();
						break;
					case 2:
						break;
				}
			} catch (error) {
				console.error(
					`${(error as Error).name}: ${(error as Error).message}`
				);
				// Hace que el programa deje la posibilidad de seguir si se ingresan valores incorrectos, de lo contrario el programa no se sigue ejecutando
				rls.keyInPause(`Presione una tecla para continuar...`, {
					guide: false,
				});
			}
		}
	}

	// SUBMENU VETERINARIAS
	public mostrarSubMenuVeterinarias(): void {
		let opcion: number = -1;
		while (opcion !== 4) {
			console.clear();
			console.log("────────────────────────────────────────");
			console.log("VETERINARIAS");
			Veterinaria.mostrarListado(this.veterinarias);
			console.log("────────────────────────────────────────");
			opcion = rls.keyInSelect(
				[
					"AGREGAR VETERINARIA",
					"SELECCIONAR VETERINARIA",
					"MODIFICAR VETERINARIA",
					"ELIMINAR VETERINARIA",
					"VOLVER",
				],
				"Opción: ",
				{ guide: false, cancel: false }
			);
			try {
				switch (opcion) {
					case 0:
						this.darDeAltaVeterinaria();
						break;
					case 1:
						(
							Entidad.obtenerEntidad(
								this.veterinarias
							) as Veterinaria
						)?.mostrarMenu();
						break;
					case 2:
						this.modificarVeterinaria();
						break;
					case 3:
						Entidad.darDeBajaEntidad(this.veterinarias);
						break;
				}
			} catch (error) {
				console.error(
					`${(error as Error).name}: ${(error as Error).message}`
				);
				rls.keyInPause(`Presione una tecla para continuar...`, {
					guide: false,
				});
			}
		}
	}

	// SUBMENU PROVEEDORES
	private mostrarSubMenuProveedores(): void {
		let opcion: number = -1;
		while (opcion !== 3) {
			console.clear();
			console.log("────────────────────────────────────────"); //
			console.log("PROVEEDORES");
			Proveedor.mostrarListado(this.proveedores);
			console.log("────────────────────────────────────────"); //
			opcion = rls.keyInSelect(
				[
					"AGREGAR PROVEEDOR",
					"MODIFICAR PROVEEDOR",
					"ELIMINAR PROVEEDOR",
					"VOLVER",
				],
				"Opción: ",
				{ guide: false, cancel: false }
			);
			try {
				switch (opcion) {
					case 0:
						this.darDeAltaProovedor();
						break;
					case 1:
						this.modificarProveedor();
						break;
					case 2:
						Entidad.darDeBajaEntidad(this.proveedores);
						break;
				}
			} catch (error) {
				console.error(
					`${(error as Error).name}: ${(error as Error).message}`
				);
				rls.keyInPause(`Presione una tecla para continuar...`, {
					guide: false,
				});
			}
		}
	}
}
