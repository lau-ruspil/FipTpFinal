import { ABM } from "../ABM";
import { Cliente } from "../Cliente";
import { Paciente } from "../Paciente";
import { Proveedor } from "../Proveedor";

let clientes: Cliente[] = [];
let pacientes: Paciente[] = [];
let proveedores : Proveedor[] = [];

console.clear();
try{
    // let cliente: Cliente = ABM.nuevoCliente(clientes);    
    let cliente: Cliente = new Cliente(ABM.generarUUID(clientes), 'Aldo López', 'Guisasola 3623', '15545609');
    clientes.push(cliente)
    console.log(clientes);
    let paciente: Paciente = ABM.nuevoPaciente(pacientes, clientes);
    pacientes.push(paciente);
    console.log(paciente);   
    console.log(clientes);
    let proveedor: Proveedor = ABM.nuevoProveedor(proveedores);
    console.log(proveedor);
}catch(error){
    console.error(`${(error as Error).name}: ${(error as Error).message}`);
}
