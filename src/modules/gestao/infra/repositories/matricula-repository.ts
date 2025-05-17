import { IMatriculaDTO } from "@modules/gestao/dto/i-matricula-dto"
import { IMatriculaRepository } from "@modules/gestao/repositories/i-matricula-repository"
import { HttpResponse, notFound, ok, serverError } from "@shared/helpers"
import { Matricula } from "../entities/matricula"
import { QueryRunner, Repository } from "typeorm"
import AppDataSource from "@shared/infra/database/data-source"
import { not } from "joi"


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

  async get(id: string): Promise<HttpResponse> {
    try {
      const matriculaExists = await this.repository.findOneBy({ id })

      if (!matriculaExists) {
        return notFound()
      }

      return ok(matriculaExists)

    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async update({
    id,
    alunoId,
    cursoId,
  }: Required<IMatriculaDTO>, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const matriculaExists = await this.repository.findOneBy({ id })

      matriculaExists!.alunoId = alunoId
      matriculaExists!.cursoId = cursoId

      const result = await queryRunner.manager.save(matriculaExists)

      return ok(result)

    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async delete(id: string): Promise<HttpResponse> {
    try {
      const result = await this.repository.delete(id)

      return ok(result)

    } catch(err) {
      throw serverError(err as Error)
    }
  }

}

export { MatriculaRepository }