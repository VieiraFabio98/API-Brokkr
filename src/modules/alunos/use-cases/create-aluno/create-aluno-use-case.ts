import { IAlunoRepository } from "@modules/alunos/repositories/i-aluno-repository"
import { HttpResponse, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"

interface IRequest {
  nome?: string
  email?: string
  dataNascimento?: Date
}

@injectable()
class CreateAlunoUseCase{
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository
  ){}

  async execute({
    nome,
    email,
    dataNascimento
  }: IRequest): Promise<HttpResponse> {

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try{
      
      const result = await this.alunoRepository.create({
        nome,
        email,
        dataNascimento
      }, queryRunner)

      await queryRunner.commitTransaction()

      return result

    }catch(err) {
      console.log(err)
      queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    }finally {

      queryRunner.release()
    }
  }
}

export { CreateAlunoUseCase }