import { IPersona } from "./IPersona";

export interface ICliente extends IPersona{
    getVip(): boolean;
    getVisitas(): number;
    setVip(vip: boolean): void;
    setVisitas(visitas: number): void;
}