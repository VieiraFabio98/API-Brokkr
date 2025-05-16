import { ICursoDTO } from "@modules/gestao/dto/i-curso-dto"
import { ICursoRepository } from "@modules/gestao/repositories/i-curso-repository"
import { HttpResponse, notFound, ok, serverError } from "@shared/helpers"
import { QueryRunner, Repository } from "typeorm"
import { Curso } from "../entities/curso"
import AppDataSource from "@shared/infra/database/data-source"


class CursoRepository implements ICursoRepository {

  private repository: Repository<Curso>
  
  constructor() {
    this.repository = AppDataSource.getRepository(Curso)
  }

  async create({
    nome,
    descricao
  }: ICursoDTO, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const aluno = this.repository.create({
        nome,
        descricao,
      })
      
      const result = await queryRunner.manager.save(aluno)
      
      return ok(result)

    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async get(id: string): Promise<HttpResponse> {
    try {
      const curso = await this.repository.findOneBy({ id })

      if (!curso) {
        return notFound()
      }

      return ok(curso)
    } catch(err) {
      throw serverError(err as Error)
    }
  }

}

export { CursoRepository }