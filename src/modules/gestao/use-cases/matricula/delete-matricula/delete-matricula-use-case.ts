import { IMatriculaRepository } from "@modules/gestao/repositories/i-matricula-repository";
import { HttpResponse, notFound, serverError } from "@shared/helpers";
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteMatriculaUseCase {
  constructor(
    @inject('MatriculaRepository')
    private matriculaRepository: IMatriculaRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    try {
      const matriculaExists = await this.matriculaRepository.get(id)

      if(!matriculaExists){
        return notFound()
      }

      const result = await this.matriculaRepository.delete(id)

      return result
    } catch(err) {
      throw serverError(err as Error)
    }
  }
}

export { DeleteMatriculaUseCase }