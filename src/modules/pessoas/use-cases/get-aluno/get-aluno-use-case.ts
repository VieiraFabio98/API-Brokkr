import { IAlunoRepository } from '@modules/pessoas/repositories/i-aluno-repository'
import { HttpResponse, notFound, serverError } from '@shared/helpers'
import { inject, injectable } from 'tsyringe'


@injectable()
class GetAlunoUseCase {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository
  ){}

  async execute(id: string): Promise<HttpResponse>{
    try {
      const result = await this.alunoRepository.get(id)

      if(result.data === null) {
        return notFound("Aluno não encontrado.")
      }

      return result
    } catch(err) {
      throw serverError(err as Error)
    }
  }

}

export { GetAlunoUseCase }