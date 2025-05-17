import { HttpResponse } from "@shared/helpers"
import { IAlunoDTO } from "../dto/i-aluno-dto"
import { QueryRunner } from "typeorm"


interface IAlunoRepository {
  create(data: IAlunoDTO, queryRunner: QueryRunner): Promise<HttpResponse>
  
  get(id: string): Promise<HttpResponse>

  update(data: IAlunoDTO, queryRunner: QueryRunner): Promise<HttpResponse>

  delete(id: string): Promise<HttpResponse>

  listAlunosByCursoId(cursoId: string): Promise<HttpResponse>

}

export { IAlunoRepository }