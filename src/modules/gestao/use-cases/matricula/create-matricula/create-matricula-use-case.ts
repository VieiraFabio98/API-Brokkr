import { IMatriculaRepository } from "@modules/gestao/repositories/i-matricula-repository"
import { HttpResponse, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"

interface IRequest {
  alunoId?: string
  cursoId?: string
}

@injectable()
class CreateMatriculaUseCase {
  constructor(
    @inject('MatriculaRepository')
    private matriculaRepository: IMatriculaRepository
  ){}

  async execute({
    alunoId,
    cursoId
  }: IRequest): Promise<HttpResponse> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const result = await this.matriculaRepository.create({
        alunoId,
        cursoId
      }, queryRunner)

      await queryRunner.commitTransaction()
      return result

    } catch(err) {
      console.log(err)
      await queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    } finally {
      await queryRunner.release()
    }
  }
}

export { CreateMatriculaUseCase }