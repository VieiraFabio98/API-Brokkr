import { Aluno } from "@modules/pessoas/infra/entities/aluno"
import { Curso } from "../infra/entities/curso"


interface IMatriculaDTO {
  id?: string
  // alunoId?: string
  aluno: Aluno
  curso: Curso
  // cursoId?: string
  dataMatricula?: Date
  updatedAt?: Date
}

export { IMatriculaDTO }