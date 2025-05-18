import { HttpResponse } from "@shared/helpers"
import { IAlunoDTO } from "../dto/i-aluno-dto"
import { QueryRunner } from "typeorm"
import { Aluno } from "../infra/entities/aluno"


interface IAlunoRepository {
  create(data: IAlunoDTO, queryRunner: QueryRunner): Promise<HttpResponse>
  
  get(id: string): Promise<HttpResponse>

  update(data: IAlunoDTO, queryRunner: QueryRunner): Promise<HttpResponse>

  delete(id: string, queryRunner: QueryRunner): Promise<HttpResponse>

  listAlunosByCursoId(cursoId: string): Promise<HttpResponse>

  findByEmail(email: string): Promise<Aluno | null>

}

export { IAlunoRepository }