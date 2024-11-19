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

	// Retorna las veterinarias
	public getVeterinarias() {
		return this.veterinarias;
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
	public darDeAltaVeterinaria(): Veterinaria | undefined {
		console.log("Ingrese los datos de la Veterinaria:");
		let persona = Persona.altaPersona(this.veterinarias);
		let veterinaria = new Veterinaria(
			persona.getID(),
			persona.getNombre(),
			persona.getDireccion(),
			persona.getTelefono()
		);
		this.veterinarias.push(veterinaria);
		return veterinaria;
	}

	//Crea un nuevo proveedor
	public darDeAltaProovedor(): Proveedor | undefined {
		console.log("Ingrese los datos del Proveedor:");
		let nuevaPersona: Persona = Persona.altaPersona(this.proveedores);

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

		//Creo el provedor
		let provedor: Proveedor = new Proveedor(
			nuevaPersona.getID(),
			nuevaPersona.getNombre(),
			nuevaPersona.getDireccion(),
			nuevaPersona.getTelefono(),
			insumos
		);
		this.proveedores.push(provedor);
		return provedor;
	}

	public darDeBajaVeterinaria(): void {
		// Solicita el nombre de la veterinaria que se desea eliminar
		let nombre: string = rls.question(
			"Ingrese el nombre de la Veterinaria que desea eliminar: "
		);

		// Busca el indice de la veterinaria en el array mediante su nombre
		let index = this.veterinarias.findIndex(
			(veterinaria) => veterinaria.getNombre() === nombre
		);

		// Si se encuentra la Veterinaria
		if (index !== -1) {
			// Elimina la veterinaria del array
			this.veterinarias.splice(index, 1);
			console.log(`Veterinaria eliminada correctamente`);
		} else {
			// Si no se encuentra la veterinaria con ese nombre
			console.log("No se encontró una Veterinaria con ese nombre");
		}
	}

	public darDeBajaProveedor(): void {
		let nombre: string = rls.question(
			"Ingrese el nombre del Proveedor que desea eliminar: "
		);

		let indice = this.proveedores.findIndex(
			(proveedor) => proveedor.getNombre() === nombre
		);

		if (indice !== -1) {
			this.proveedores.splice(indice, 1);
			console.log("Proveedor eliminado correctamente");
		} else {
			console.log("No se encontró un Proveedor con ese nombre");
		}
	}

	public modificarVeterinaria(): void {
		// Solicitar el nombre de la veterinara a modificar
		let nombre: string = rls.question(
			"Ingrese el nombre de la Veterinaria que desea modificar: "
		);

		// Buscar la veterinaria por el nombre en el arreglo de veterinarias
		let indice = this.veterinarias.findIndex(
			(vet) => vet.getNombre() === nombre
		);

		// Si se encontro la veterinaria
		if (indice !== -1) {
			// obtener la veterinaria utilizando el indice
			let veterinaria = this.veterinarias[indice];

			// Solicitar al usuario los nuevos datos de la veterinaria
			let nuevoNombre = rls.question(
				"Ingrese el nuevo nombre (ENTER para mantener el actual)"
			);

			let nuevaDireccion = rls.question(
				"Ingrese la nueva dirección (ENTER para mantener la actual)"
			);

			let nuevoTelefono = rls.question(
				"Ingrese el nuevo teléfono (ENTER para mantener el actual)"
			);

			// Si el usuario ha proporcionado todos los datos actualizamos,
			if (nuevoNombre) {
				veterinaria.setNombre(nuevoNombre);
			}

			if (nuevaDireccion) {
				veterinaria.setDireccion(nuevaDireccion);
			}

			if (nuevoTelefono) {
				veterinaria.setTelefono(nuevoTelefono);
			}

			console.log("Veterinaria modificada correctamente");
		} else {
			console.log("No se encontró ninguna Veterinaria con ese nombre");
		}
	}

	public modificarProveedor(): void {
		let nombre: string = rls.question(
			"Ingrese el nombre del Proveedor que desea modificar: "
		);

		let indice = this.proveedores.findIndex(
			(proveedor) => proveedor.getNombre() === nombre
		);

		if (indice !== -1) {
			let proveedor = this.proveedores[indice];

			let nuevoNombre = rls.question(
				"Ingrese el nuevo nombre (ENTER para mantener el actual)"
			);

			let nuevaDireccion = rls.question(
				"Ingrese la nueva dirección (ENTER para mantener la actual)"
			);

			let nuevoTelefono = rls.question(
				"Ingrese el nuevo teléfono (ENTER para mantener el actual)"
			);

			if (nuevoNombre) {
				proveedor.setNombre(nuevoNombre);
			}

			if (nuevaDireccion) {
				proveedor.setDireccion(nuevaDireccion);
			}

			if (nuevoTelefono) {
				proveedor.setTelefono(nuevoTelefono);
			}

			console.log("Proveedor actualizado correctamente");
		} else {
			console.log("No se encontró ningún Proveedor con ese nombre");
		}
	}

    // Muestra el Menu Principal de la RED
    public mostrarMenu(): void{
        let opcion: number = -1;
        while (opcion!==2){
            console.clear();  
            console.info(`Bienvenidos a la red de veterinarias '${this.getNombre()}'\t`);
            opcion = rls.keyInSelect(['VETERINARIAS', 'PROVEEDORES', 'SALIR'], 'Opción: ', {guide:false, cancel: false});
            try{    
                switch(opcion){
                    case 0: this.mostrarSubMenuVeterinarias(); break;
                    case 1: this.mostrarSubMenuProveedores(); break;
                    case 2: break;
                }
            }catch(error){
                console.error(`${(error as Error).name}: ${(error as Error).message}`);
                rls.keyInPause(`Presione una tecla para continuar...`, {guide:false});
            }
        }
    }
    
    // SUBMENU VETERINARIAS
    private mostrarSubMenuVeterinarias(): void{        
        let opcion: number = -1;
        while (opcion!==4){
            console.clear()
            console.log('VETERINARIAS');
            Entidad.mostrarListado(this.veterinarias); 
            opcion = rls.keyInSelect(['AGREGAR', 'MODIFICAR', 'ELIMINAR', 'SELECCIONAR', 'VOLVER'], 'Opción: ', {guide:false, cancel: false});
            try{    
                switch(opcion){
                    case 0: this.darDeAltaVeterinaria(); break;					
                    case 1: if (this.veterinarias.length==0){
								console.warn(`No hay registros cargados.`)
							}else{
								this.modificarVeterinaria(); 
							}					
							break;
                    case 2: if (this.veterinarias.length==0){
								console.warn(`No hay registros cargados.`)
							}else{
								Entidad.darDeBajaEntidad(this.veterinarias);
							}
							break;
                    case 3: if (this.veterinarias.length==0){
								console.warn(`No hay registros cargados.`)
							}else{
                                (Entidad.obtenerEntidad(this.veterinarias) as Veterinaria)?.mostrarMenu();                                
                    		}
							break;
                }
            }catch(error){
                console.error(`${(error as Error).name}: ${(error as Error).message}`);
                rls.keyInPause(`Presione una tecla para continuar...`, {guide:false});
            }
        }
    }

    // SUBMENU PROVEEDORES
    private mostrarSubMenuProveedores(): void{        
        let opcion: number = -1;
        while (opcion!==4){
            console.clear()
            console.log('PROVEEDORES');
            Entidad.mostrarListado(this.proveedores); 
            opcion = rls.keyInSelect(['AGREGAR', 'MODIFICAR', 'ELIMINAR', 'SELECCIONAR', 'VOLVER'], 'Opción: ', {caseSensitive:true, guide:false, cancel: false});
            try{    
                switch(opcion){
                    case 0: this.darDeAltaProovedor(); break;
                    case 1: if (this.proveedores.length==0){
								console.warn(`No hay registros cargados.`)
							}else{
								this.modificarProveedor(); 
							}
							break;
                    case 2: if (this.proveedores.length==0){
								console.warn(`No hay registros cargados.`)
							}else{
								Entidad.darDeBajaEntidad(this.proveedores); 
							}
							break;
                    case 3: if (this.proveedores.length==0){
								console.warn(`No hay registros cargados.`)
							}else{
                                //(Entidad.obtenerEntidad(this.proveedores) as Proveedor).mostrarMenu();
							}
                            break;

                }                
            }catch(error){
                console.error(`${(error as Error).name}: ${(error as Error).message}`);
                rls.keyInPause(`Presione una tecla para continuar...`, {guide:false});
            }
        }
    }
}
