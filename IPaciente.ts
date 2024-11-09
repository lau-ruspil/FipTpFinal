export interface IPaciente{
    getUID(): number;
    getClienteUID(): number;
    getNombre(): string;
    getEspecie(): string;
    setNombre(nombre: string): void;
    setEspecie(especie: string): void;
}