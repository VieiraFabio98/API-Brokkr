import { IMatriculaRepository } from "@modules/gestao/repositories/i-matricula-repository"
import { HttpResponse, notFound, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"
import { Aluno } from "@modules/pessoas/infra/entities/aluno"
import { Curso } from "@modules/gestao/infra/entities/curso"

interface IRequest {
  id: string
  alunoId: string
  cursoId: string
}

@injectable()
class UpdateMatriculaUseCase {
  constructor(
    @inject("MatriculaRepository")
    private matriculaRepository: IMatriculaRepository
  ){}

  async execute({
    id,
    alunoId,
    cursoId,
  }: IRequest): Promise<HttpResponse> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const matriculaExists = await this.matriculaRepository.get(id)
      if(matriculaExists.data === null){
        return notFound("Matrícula não encontrada.")
      } 
      
      const aluno: Aluno | null = await queryRunner.manager.findOne(Aluno, { where: { id: alunoId } })
      const curso: Curso | null = await queryRunner.manager.findOne(Curso, { where: { id: cursoId } })

      if (!aluno) {
        return notFound('Aluno não encontrado para realizar matrícula.')
      }

      if (!curso) {
        return notFound('Curso não encontrado para vincular com a matrícula.')
      }

      const result = await this.matriculaRepository.update({
        id,
        aluno,
        curso,
      }, queryRunner)

      await queryRunner.commitTransaction()
      return result

    } catch(err) {
      console.log('Update matricula - rollback: \n', err)
      await queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    } finally {
      await queryRunner.release()
    }
  }
}

export { UpdateMatriculaUseCase }