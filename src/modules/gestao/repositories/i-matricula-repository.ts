import { HttpResponse } from "@shared/helpers"
import { QueryRunner } from "typeorm"
import { IMatriculaDTO } from "../dto/i-matricula-dto"


interface IMatriculaRepository {
  create(data: IMatriculaDTO, queryRunner: QueryRunner): Promise<HttpResponse>

  // get(id: string): Promise<HttpResponse>

  // update(data: IMatriculaDTO, queryRunner: QueryRunner): Promise<HttpResponse>

  // delete(id: string): Promise<HttpResponse>

}

export { IMatriculaRepository }