import { Proveedor } from "./Proveedor";
import { Veterinaria } from "./Veterinaria";
import { Red } from "./Red";

// Instancia de la clase Red (nombre: Bueno)
const red: Red = new Red("Bueno");

// Precarga de datos
// Instancia de la clase Veterinaria
const vet: Veterinaria = new Veterinaria(
	1000,
	"Patitas",
	"Pueryrredón 3299",
	"2284-456789"
);

// Instancia de la clase Proveedor
const prov: Proveedor = new Proveedor(
	1001,
	"VitalCan",
	"Moya 2356",
	"2284-123456",
	["Comida Para Gatos", "Comida Para Perro", "Comida Para Peces"]
);

// Registro de precarga de datos
red.darDeAltaVeterinaria(vet); // Registro Veterinaria
red.darDeAltaProovedor(prov); // Registro Proveedor
red.mostrarMenuPrincipal(); // Menu Principal
