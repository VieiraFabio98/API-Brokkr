import { IAlunoRepository } from "@modules/alunos/repositories/i-aluno-repository"
import { HttpResponse, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"

interface IRequest {
  nome?: string
  email?: string
}

@injectable()
class CreateAlunoUseCase{
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository
  ){}

  async execute({
    nome,
    email
  }: IRequest): Promise<HttpResponse> {

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try{
      
      const result = await this.alunoRepository.create({
        nome,
        email
      }, queryRunner)

      await queryRunner.commitTransaction()

      return result

    }catch(err) {

      queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    }finally {

      queryRunner.release()
    }
  }
}

export { CreateAlunoUseCase }