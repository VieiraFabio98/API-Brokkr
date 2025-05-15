import { HttpResponse } from "@shared/helpers"
import { IAlunoDTO } from "../dto/i-aluno-dto"
import { QueryRunner } from "typeorm"


interface IAlunoRepository {
  create(data: IAlunoDTO, queryRunner: QueryRunner): Promise<HttpResponse>

}

export { IAlunoRepository }