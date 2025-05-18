import { HttpResponse, notFound, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"
import { ICursoRepository } from "@modules/gestao/repositories/i-curso-repository"

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateCursoUseCase {
  constructor(
    @inject('CursoRepository')
    private cursoRepository: ICursoRepository
  ){}

  async execute({
    id,
    nome,
    descricao
  }: IRequest): Promise<HttpResponse> {

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {

      const cursoExists = await this.cursoRepository.get(id) 

      if(cursoExists.data === null) {
        return notFound("Curso não encontrado.")
      }

      const result =  await this.cursoRepository.update({
        id,
        nome,
        descricao
      }, queryRunner)

      await queryRunner.commitTransaction()
      return result

    } catch(err) {
      console.log('Update Curso - rollback: \n', err)
      queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    } finally {
      queryRunner.release()
    }
    
  }
}

export { UpdateCursoUseCase }