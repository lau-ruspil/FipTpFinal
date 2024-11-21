import { Proveedor } from "./Proveedor";
import { Veterinaria } from "./Veterinaria";
import { Red } from "./Red";

const red: Red = new Red("Bueno");
const vet: Veterinaria = new Veterinaria(
	1000,
	"Patitas",
	"Pueryrredón 3299",
	"No"
);
const prov: Proveedor = new Proveedor(
	1001,
	"Vitalcan",
	"Por ahí 3333",
	"0800555VITALCAN",
	["Comida Para Gatos", "Comida Para Perro", "Comida Para Peces"]
);

red.darDeAltaVeterinaria(vet);
red.darDeAltaProovedor(prov);
red.mostrarMenu();
