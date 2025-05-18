import { IAlunoDTO } from "@modules/pessoas/dto/i-aluno-dto"
import { IAlunoRepository } from "@modules/pessoas/repositories/i-aluno-repository"
import { created, HttpResponse, noContent, notFound, ok,  serverError } from "@shared/helpers"
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
    email,
    dataNascimento
  }: IAlunoDTO, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const aluno = this.repository.create({
        nome,
        email,
        dataNascimento
      })

      const result = await queryRunner.manager.save(aluno)

      return created(result)

    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async get(id: string): Promise<HttpResponse> {
    try {
      const aluno = await this.repository.findOne({ where: { id: id } })

      return ok(aluno)
    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async update({
    id,
    nome,
    email
  }: IAlunoDTO, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const aluno = this.repository.create({
        id,
        nome,
        email
      })

      const result = await queryRunner.manager.save(aluno)

      return ok(result)
    } catch(err){
      throw serverError(err as Error)
    }
  }

  async delete(id: string, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const deleteResult = await queryRunner.manager.delete(Aluno, { id })

      if (!deleteResult.affected || deleteResult.affected === 0) {
        return notFound("Aluno não encontrado.")
      }
  
      return noContent()

    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async listAlunosByCursoId(cursoId: string): Promise<HttpResponse> {
      try {
        const alunos = await this.repository.createQueryBuilder("alu")
        .select([
          "alu.id as id",
          "alu.nome as nome",
          "alu.email as email",
          "mat.data_matricula as datamatricula",
        ])
        .leftJoin('matriculas', 'mat', 'alu.id = mat.aluno_id')
        .where('mat.curso_id = :cursoId', { cursoId })
        .getRawMany()

        return ok(alunos)
      } catch(err) {
        throw serverError(err as Error)
      }
  }

  async findByEmail(email: string): Promise<Aluno | null> {
      try {
        const aluno = await this.repository.findOne({ where: { email } })
        return aluno
      } catch(err) {
        throw serverError(err as Error)
      }
  }
  
}

export { AlunoRepository }