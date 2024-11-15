import { Cliente } from "../Cliente";
import { Paciente } from "../Paciente";
import { Proveedor } from "../Proveedor";
import { Veterinaria } from "../Veterinaria";
import { Red } from "../Red";
import { Entidad } from "../Entidad";

console.clear();  
try{    
    const red : Red = new Red("Bueno");
    let veterinaria = red.darDeAltaVeterinaria();
    let cliente = veterinaria?.darDeAltaCliente();
    console.log(veterinaria?.darDeAltaPaciente(cliente?.getID()));
    let provedor = red.darDeAltaProovedor();
    provedor?.setTelefono('412345');
    console.log(provedor);
    console.log(red);
}catch(error){
    console.error(`${(error as Error).name}: ${(error as Error).message}`);
}
