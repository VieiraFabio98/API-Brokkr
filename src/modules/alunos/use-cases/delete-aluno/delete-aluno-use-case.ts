import { AlunoRepository } from '@modules/alunos/infra/repositories/aluno-repository';
import { IAlunoRepository } from '@modules/alunos/repositories/i-aluno-repository';
import { HttpResponse, serverError } from '@shared/helpers';
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteAlunoUseCase {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    try {

      const result = await this.alunoRepository.delete(id)

      return result

    } catch(err) {
      throw serverError(err as Error)
    }
  }

}

export { DeleteAlunoUseCase}