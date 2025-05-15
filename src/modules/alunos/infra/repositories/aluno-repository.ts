import { IAlunoDTO } from "@modules/alunos/dto/i-aluno-dto"
import { IAlunoRepository } from "@modules/alunos/repositories/i-aluno-repository"
import { HttpResponse, ok,  serverError } from "@shared/helpers"
import { QueryRunner, Repository } from "typeorm"
import { Aluno } from "../entities/aluno"
import AppDataSource from "@shared/infra/database/data-source"


class AlunoRepository implements IAlunoRepository {

  private repository: Repository<Aluno>
  
  constructor() {
    this.repository = AppDataSource.getRepository(Aluno)
  }

  async create({
    nome,
    email
  }: IAlunoDTO, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const aluno = this.repository.create({
        nome,
        email
      })

      const result = await queryRunner.manager.save(aluno)

      return ok(result)

    } catch(err) {
      throw serverError(err as Error)
    }
  }
  
}

export { AlunoRepository }