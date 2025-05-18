import { IMatriculaDTO } from "@modules/gestao/dto/i-matricula-dto"
import { IMatriculaRepository } from "@modules/gestao/repositories/i-matricula-repository"
import { created, HttpResponse, noContent, notFound, ok, serverError } from "@shared/helpers"
import { Matricula } from "../entities/matricula"
import { QueryRunner, Repository } from "typeorm"
import AppDataSource from "@shared/infra/database/data-source"
import { not } from "joi"
import { Aluno } from "@modules/pessoas/infra/entities/aluno"
import { Curso } from "../entities/curso"


class MatriculaRepository implements IMatriculaRepository {

  private repository: Repository<Matricula>
  
  constructor() {
    this.repository = AppDataSource.getRepository(Matricula)
  }

  async create({
    aluno,
    curso,
  }: IMatriculaDTO, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const matricula = this.repository.create({
        aluno,
        curso,
      })
      
      const result = await queryRunner.manager.save(matricula)
      
      return created(result)

    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async get(id: string): Promise<HttpResponse> {
    try {
      const matriculaExists = await this.repository.findOneBy({ id })

      return ok(matriculaExists)

    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async update({
    id,
    aluno,
    curso,
  }: Required<IMatriculaDTO>, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const matriculaExists = await this.repository.findOneBy({ id })

      matriculaExists!.aluno = aluno
      matriculaExists!.curso = curso

      const result = await queryRunner.manager.save(matriculaExists)

      return ok(result)

    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async delete(id: string, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const deleteResult = await queryRunner.manager.delete(Matricula, { id })
      
      if (!deleteResult.affected || deleteResult.affected === 0) {
        return notFound("Matrícula não encontrado.")
      }
        
      return noContent()

    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async findMatricula(aluno: Aluno, curso: Curso): Promise<boolean> {
    console.log('[enis')
      try {
        const matriculaExists = await this.repository.findOne({
          where : {
            aluno,
            curso
          }
        })

        return !!matriculaExists

      }catch(err) {
        throw serverError(err as Error)
      }
  }

}

export { MatriculaRepository }