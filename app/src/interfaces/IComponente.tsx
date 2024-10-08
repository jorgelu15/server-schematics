import { IAncla } from "./IAncla";

export interface IComponente {
    uuid_componente: string,
    nombre: string,
    url_componente: string,
    type: string,
    x: number,
    y: number,
    rotate: number,
    anclas: IAncla[]
}