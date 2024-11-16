import { IMenuObject } from "./IMenuObject";

//Implementación de la clase abstracta menú
export abstract class MenuObject implements IMenuObject{
    private nombre: string;
    
    // Constructor de la clase
    constructor (nombre: string){
        this.setNombre(nombre);
    }

    //Retorna el nombre
    public getNombre(): string{
        return this.nombre;
    }

    // Establece el nombre
    public setNombre(nombre: string): void{
        if (nombre == undefined || nombre.length<1){
            throw Error('Nombre inválido.');
        }
        this.setNombre(nombre);
    }

    // Retorna falso porque inicialmente es un elemento (composite)
    public esSubMenu(): boolean {
        return false;
    }

    public agregar(menu: MenuObject){};
    public modificar(menu: MenuObject){};
    public eliminar(menu: MenuObject){};

    // Método abstracto a definir en los hijos
    public abstract mostrar(): void;
}