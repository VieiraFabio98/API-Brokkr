import { ICursoRepository } from "@modules/gestao/repositories/i-curso-repository"
import { HttpResponse, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"
import { query } from "express"

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateCursoUseCase {
  constructor(
    @inject('CursoRepository')
    private cursoRepository: ICursoRepository
  ){}

  async execute({
    nome,
    descricao
  }: IRequest): Promise<HttpResponse> {

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const result = await this.cursoRepository.create({
        nome,
        descricao
      }, queryRunner)

      await queryRunner.commitTransaction()

      return result

    } catch(err) {
      console.log(err)
      queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    } finally {
      queryRunner.release()
    }

  }
}

export { CreateCursoUseCase }