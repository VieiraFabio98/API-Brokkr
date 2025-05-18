import { IMatriculaRepository } from "@modules/gestao/repositories/i-matricula-repository"
import { conflictError, HttpResponse, notFound, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"
import { IAlunoRepository } from "@modules/pessoas/repositories/i-aluno-repository"
import { ICursoRepository } from "@modules/gestao/repositories/i-curso-repository"
import { Aluno } from "@modules/pessoas/infra/entities/aluno"
import { Curso } from "@modules/gestao/infra/entities/curso"

interface IRequest {
  alunoId: string
  cursoId: string
}

@injectable()
class CreateMatriculaUseCase {
  constructor(
    @inject('MatriculaRepository')
    private matriculaRepository: IMatriculaRepository,
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,
    @inject('CursoRepository')
    private cursoRepository: ICursoRepository
  ){}

  async execute({
    alunoId,
    cursoId
  }: IRequest): Promise<HttpResponse> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {

      const aluno: Aluno | null = await queryRunner.manager.findOne(Aluno, { where: { id: alunoId } })
      const curso: Curso | null = await queryRunner.manager.findOne(Curso, { where: { id: cursoId } })

      if (!aluno) {
        return notFound('Aluno não encontrado para realizar matrícula.')
      }

      if (!curso) {
        return notFound('Curso não encontrado para vincular com a matrícula.')
      }

      const matriculaExists = await this.matriculaRepository.findMatricula(aluno, curso)

      if(matriculaExists) {
        return conflictError("O aluno já está matriculado nesse curso.")
      }

      const result = await this.matriculaRepository.create({
        aluno,
        curso
      }, queryRunner)

      await queryRunner.commitTransaction()
      return result

    } catch(err) {
      console.log('Create Matricula - rollback: \n', err)
      await queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    } finally {
      await queryRunner.release()
    }
  }
}

export { CreateMatriculaUseCase }