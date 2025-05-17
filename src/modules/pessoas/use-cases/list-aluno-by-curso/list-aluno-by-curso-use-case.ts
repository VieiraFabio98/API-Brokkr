import { IAlunoRepository } from "@modules/pessoas/repositories/i-aluno-repository";
import { HttpResponse, notFound, ok } from "@shared/helpers";
import { inject, injectable } from "tsyringe";


@injectable()
class ListAlunoByCursoUseCase {
  constructor(
    @inject("AlunoRepository")
    private alunoRepository: IAlunoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {

    const cursoExists = await this.alunoRepository.get(id)

    if(!cursoExists) {
      return notFound("Curso não encontrado.")
    }

    const result = await this.alunoRepository.listAlunosByCursoId(id)

    if(result.data.length === 0) {
      return ok({message: "Nenhum aluno matriculado nesse curso."})
    }

    return result

  }
}

export { ListAlunoByCursoUseCase }