import { IAlunoRepository } from '@modules/pessoas/repositories/i-aluno-repository'
import { HttpResponse, notFound, serverError } from '@shared/helpers'
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"


@injectable()
class DeleteAlunoUseCase {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {

      const result = await this.alunoRepository.delete(id, queryRunner)

      await queryRunner.commitTransaction()
      return result

    } catch(err) {
      console.log('Delete Aluno - rollback: \n', err)
      queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    } finally {
      queryRunner.release()
    }
  }

}

export { DeleteAlunoUseCase}