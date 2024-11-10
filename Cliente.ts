import { ICliente } from "./ICliente";
import { Persona } from "./Persona";

export class Cliente extends Persona implements ICliente {
    private vip: boolean;
    private visitas: number;

    //Constructor de la clase Cliente
    constructor (UID: number, nombre: string, telefono: string, direccion: string, vip:boolean, visitas: number){
        super(UID, nombre, telefono, direccion);
        this.vip = vip;
        this.visitas = visitas;
    }

    public getVip(): boolean{
       return this.vip; 
    }

    public getVisitas(): number{
        return this.visitas;
    }

    public setVip(vip: boolean): void{
        if (!vip==undefined){
            this.vip = vip;
        }
    }
    
    public setVisitas(visitas: number): void{
        if (!visitas==undefined&&visitas>0){
            this.visitas = visitas
        }
    }
}