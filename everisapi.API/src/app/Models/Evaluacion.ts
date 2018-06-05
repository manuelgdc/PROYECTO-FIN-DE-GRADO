import { Respuesta } from "./Respuesta";

export class Evaluacion {
  constructor(
    public id: number,
    public fecha: string,
    public estado: boolean,
    public proyectoid: number,
    public respuestas: Array<Respuesta>
  ) { }
}
