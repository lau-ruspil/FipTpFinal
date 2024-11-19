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

	// Solicita un arreglo de insumos
	private solicitarInsumos(): string[]{
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
	public darDeAltaProovedor(): Proveedor | undefined {
		console.log("Ingrese los datos del Proveedor:");
		let nuevaPersona: Persona = Persona.altaPersona(this.proveedores);

		let insumos: string[] = this.solicitarInsumos();

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

	// Modifica una Veterinaria
	public modificarVeterinaria(): void {
		if (this.veterinarias.length==0){
			console.warn(`No hay registros cargados.`);
			return;
		}

		const veterinaria = (Entidad.obtenerEntidad(this.veterinarias) as Veterinaria);
		
		// Si se encontro la veterinaria
		if (veterinaria !== undefined) {

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

			console.info("Veterinaria modificada correctamente");
		} else {
			console.error("No se encontró ninguna Veterinaria con ese nombre");
		}
	}

	// Modifica un proveedor
	public modificarProveedor(): void {
		if (this.proveedores.length==0){
			console.warn(`No hay registros cargados.`);
			return;
		}

		const proveedor = (Entidad.obtenerEntidad(this.proveedores) as Proveedor);

		if (proveedor !== undefined) {

			let nuevoNombre = rls.question(
				"Ingrese el nuevo nombre (ENTER para mantener el actual)"
			);

			let nuevaDireccion = rls.question(
				"Ingrese la nueva dirección (ENTER para mantener la actual)"
			);

			let nuevoTelefono = rls.question(
				"Ingrese el nuevo teléfono (ENTER para mantener el actual)"
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

			if (insumos.length>0){
				proveedor.setInsumos(insumos);
			}

			console.info("Proveedor actualizado correctamente.");
		} else {
			console.error("No se encontró ningún Proveedor con ese nombre.");
		}
	}

    // Muestra el Menu Principal de la RED
    public mostrarMenu(): void{
        let opcion: number = -1;
        while (opcion!==2){
            console.clear();  
            console.info(`Bienvenidos a la red de veterinarias ${this.getNombre()}`);
            console.log('VETERINARIAS');
            Entidad.mostrarListado(this.veterinarias); 
			console.log('PROVEEDORES');
            Entidad.mostrarListado(this.proveedores); 
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
                    case 1: this.modificarVeterinaria(); break;
                    case 2: Entidad.darDeBajaEntidad(this.veterinarias); break;
                    case 3:(Entidad.obtenerEntidad(this.veterinarias) as Veterinaria)?.mostrarMenu(); break;
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
        while (opcion!==3){
            console.clear()
            console.log('PROVEEDORES');
            Entidad.mostrarListado(this.proveedores); 
            opcion = rls.keyInSelect(['AGREGAR', 'MODIFICAR', 'ELIMINAR', 'VOLVER'], 'Opción: ', {caseSensitive:true, guide:false, cancel: false});
            try{    
                switch(opcion){
                    case 0: this.darDeAltaProovedor(); break;
                    case 1: this.modificarProveedor(); break;
                    case 2: Entidad.darDeBajaEntidad(this.proveedores); break;
                }                
            }catch(error){
                console.error(`${(error as Error).name}: ${(error as Error).message}`);
                rls.keyInPause(`Presione una tecla para continuar...`, {guide:false});
            }
        }
    }
}
