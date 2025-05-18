import { HttpResponse } from "@shared/helpers"
import { QueryRunner } from "typeorm"
import { ICursoDTO } from "../dto/i-curso-dto"


interface ICursoRepository {
  create(data: ICursoDTO, queryRunner: QueryRunner): Promise<HttpResponse>

  get(id: string): Promise<HttpResponse>

  update(data: ICursoDTO, queryRunner: QueryRunner): Promise<HttpResponse>

  delete(id: string): Promise<HttpResponse>

  listCursoByAlunoId(alunoId: string): Promise<HttpResponse>

}

export { ICursoRepository }