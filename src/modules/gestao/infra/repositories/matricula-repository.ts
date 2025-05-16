import { IMatriculaDTO } from "@modules/gestao/dto/i-matricula-dto"
import { IMatriculaRepository } from "@modules/gestao/repositories/i-matricula-repository"
import { HttpResponse, ok, serverError } from "@shared/helpers"
import { Matricula } from "../entities/matricula"
import { QueryRunner, Repository } from "typeorm"
import AppDataSource from "@shared/infra/database/data-source"


class MatriculaRepository implements IMatriculaRepository {

  private repository: Repository<Matricula>
  
  constructor() {
    this.repository = AppDataSource.getRepository(Matricula)
  }

  async create({
    alunoId,
    cursoId,
  }: IMatriculaDTO, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const matricula = this.repository.create({
        alunoId,
        cursoId,
      })
      
      const result = await queryRunner.manager.save(matricula)
      
      return ok(result)

    } catch(err) {
      throw serverError(err as Error)
    }
  }

}

export { MatriculaRepository }