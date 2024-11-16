// Interface menú
export interface IMenuObject{
    getNombre(): string;
    setNombre(nombre: string): void;
    esSubMenu(): boolean;
    mostrar(): void;
}