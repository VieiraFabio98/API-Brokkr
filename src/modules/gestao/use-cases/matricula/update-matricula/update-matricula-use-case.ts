import { IMatriculaRepository } from "@modules/gestao/repositories/i-matricula-repository"
import { HttpResponse, notFound, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"

interface IRequest {
  id: string
  alunoId?: string
  cursoId?: string
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
        console.log(matriculaExists)
        return notFound()
      } 

      const result = await this.matriculaRepository.update({
        id,
        alunoId,
        cursoId,
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