import { ICursoRepository } from "@modules/gestao/repositories/i-curso-repository";
import { HttpResponse, serverError } from "@shared/helpers";
import { inject, injectable } from "tsyringe";


@injectable()
class GetCursoUseCase {
  constructor(
    @inject('CursoRepository')
    private cursoRepository: ICursoRepository
  ){}
  
  async execute(id: string): Promise<HttpResponse> {
    try {
      const result = await this.cursoRepository.get(id)

      return result
    } catch (err) {
      throw serverError(err as Error)
    }
  }
}

export { GetCursoUseCase }