import { IAlunoRepository } from "@modules/pessoas/repositories/i-aluno-repository"
import { conflictError, HttpResponse, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"

interface IRequest {
  nome: string
  email: string
  dataNascimento: Date
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

      const emailExists = await this.alunoRepository.findByEmail(email)

      if(emailExists) {
        return conflictError("E-mail já cadastrado.")
      }
      
      const result = await this.alunoRepository.create({
        nome,
        email,
        dataNascimento
      }, queryRunner)

      await queryRunner.commitTransaction()

      return result

    }catch(err) {
      console.log('Create Aluno - rollback: \n', err)
      queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    }finally {
      queryRunner.release()
    }
  }
}

export { CreateAlunoUseCase }