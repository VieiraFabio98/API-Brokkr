import { ICursoDTO } from "@modules/gestao/dto/i-curso-dto"
import { ICursoRepository } from "@modules/gestao/repositories/i-curso-repository"
import { created, HttpResponse, noContent, notFound, ok, serverError } from "@shared/helpers"
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
      
      return created(result)

    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async get(id: string): Promise<HttpResponse> {
    try {
      const curso = await this.repository.findOneBy({ id })

      return ok(curso)

    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async update({
    id,
    nome,
    descricao
  }: Required<ICursoDTO>, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {

      const curso = this.repository.create({
        id,
        nome,
        descricao
      })

      const result = await queryRunner.manager.save(curso)

      return ok(result)

    } catch(err) { 
      throw serverError(err as Error)
    }
  }

  async delete(id: string, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      
      const deleteResult = await queryRunner.manager.delete(Curso, { id })

      if (!deleteResult.affected || deleteResult.affected === 0) {
        return notFound("Curso não encontrado.")
      }
  
      return noContent()

    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async listCursoByAlunoId(alunoId: string): Promise<HttpResponse> {
      try {
        const curso = await this.repository.createQueryBuilder("cur")
          .select([
            "cur.id as id",
            "cur.nome as nome",
            "cur.descricao as descricao",
            "alu.nome as alunoNome",
            "alu.email as alunoEmail",
          ])
          .leftJoin('matriculas', 'mat', 'mat.aluno_id = :alunoId')
          .leftJoin('alunos', 'alu', 'alu.id = mat.aluno_id')
          .where('mat.curso_id = cur.id')
          .setParameter('alunoId', alunoId)
          .getRawMany()

        return ok(curso)

      } catch(err) {
        throw serverError(err as Error)
      }
  }

}

export { CursoRepository }