import { ICursoRepository } from "@modules/gestao/repositories/i-curso-repository";
import { HttpResponse, serverError } from "@shared/helpers";
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteCursoUseCase {
  constructor(
    @inject('CursoRepository')
    private cursoRepository: ICursoRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    try {
      const result = await this.cursoRepository.delete(id)

      return result
    } catch(err) {
      throw serverError(err as Error)
    }
  }
}

export { DeleteCursoUseCase }