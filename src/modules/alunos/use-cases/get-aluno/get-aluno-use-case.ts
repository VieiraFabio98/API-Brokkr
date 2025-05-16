import { IAlunoRepository } from '@modules/alunos/repositories/i-aluno-repository'
import { HttpResponse, serverError } from '@shared/helpers'
import { inject, injectable } from 'tsyringe'


@injectable()
class GetAlunoUseCase {
  constructor(
    @inject('AlunoRepository')
    private AlunoRepository: IAlunoRepository
  ){}

  async execute(id: string): Promise<HttpResponse>{
    try {
      const result = await this.AlunoRepository.get(id)

      return result
    } catch(err) {
      throw serverError(err as Error)
    }
  }

}

export { GetAlunoUseCase }