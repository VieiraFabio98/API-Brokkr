import { IMatriculaRepository } from "@modules/gestao/repositories/i-matricula-repository"
import { HttpResponse, notFound, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"


@injectable()
class DeleteMatriculaUseCase {
  constructor(
    @inject('MatriculaRepository')
    private matriculaRepository: IMatriculaRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const result = await this.matriculaRepository.delete(id, queryRunner)

      await queryRunner.commitTransaction()
      
      return result

    } catch(err) {
      console.log('Delete Matricula - rollback: \n', err)
      queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    } finally {
      queryRunner.release()
    }
  }
}

export { DeleteMatriculaUseCase }