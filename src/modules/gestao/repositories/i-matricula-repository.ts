import { HttpResponse } from "@shared/helpers"
import { QueryRunner } from "typeorm"
import { IMatriculaDTO } from "../dto/i-matricula-dto"
import { Aluno } from "@modules/pessoas/infra/entities/aluno"
import { Curso } from "../infra/entities/curso"


interface IMatriculaRepository {
  create(data: IMatriculaDTO, queryRunner: QueryRunner): Promise<HttpResponse>

  get(id: string): Promise<HttpResponse>

  update(data: IMatriculaDTO, queryRunner: QueryRunner): Promise<HttpResponse>

  delete(id: string, queryRunner: QueryRunner): Promise<HttpResponse>

  findMatricula(aluno: Aluno, curso: Curso): Promise<boolean>

}

export { IMatriculaRepository }