import { IMatriculaRepository } from "@modules/gestao/repositories/i-matricula-repository"
import { HttpResponse, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"


@injectable()
class GetMatriculaUseCase {
  constructor(
    @inject("MatriculaRepository")
    private matriculaRepository: IMatriculaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    try {
      const result = await this.matriculaRepository.get(id)

      return result
      
    } catch (err) {
      throw serverError(err as Error)
    }
  }
}

export { GetMatriculaUseCase }