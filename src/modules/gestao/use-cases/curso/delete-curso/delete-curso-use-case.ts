import { ICursoRepository } from "@modules/gestao/repositories/i-curso-repository"
import { HttpResponse, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"


@injectable()
class DeleteCursoUseCase {
  constructor(
    @inject('CursoRepository')
    private cursoRepository: ICursoRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const result = await this.cursoRepository.delete(id, queryRunner)

      await queryRunner.commitTransaction()
      return result
      
    } catch(err) {
      console.log('Delete Curso - rollback: \n', err)
      queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    } finally {
      queryRunner.release()
    }
  }
}

export { DeleteCursoUseCase }