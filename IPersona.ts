export interface IPersona{
    getUID(): number;
    getNombre(): string;
    getTelefono(): string;
    getDireccion(): string;
    setNombre(nombre: string): void;
    setDireccion(direccion: string): void;
    setTelefono(telefono: string): void;
}