import { AlunoRepository } from '@modules/pessoas/infra/repositories/aluno-repository';
import { IAlunoRepository } from '@modules/pessoas/repositories/i-aluno-repository';
import { HttpResponse, notFound, serverError } from '@shared/helpers';
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteAlunoUseCase {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    try {

      const alunoExists = await this.alunoRepository.get(id)

      if(alunoExists.data === null) {
        return notFound("Aluno não encontrado.")
      }

      const result = await this.alunoRepository.delete(id)

      return result

    } catch(err) {
      throw serverError(err as Error)
    }
  }

}

export { DeleteAlunoUseCase}