import { ICursoRepository } from "@modules/gestao/repositories/i-curso-repository";
import { IAlunoRepository } from "@modules/pessoas/repositories/i-aluno-repository";
import { HttpResponse, notFound, ok } from "@shared/helpers";
import { inject, injectable } from "tsyringe";


@injectable()
class ListAlunoByCursoUseCase {
  constructor(
    @inject("AlunoRepository")
    private alunoRepository: IAlunoRepository,
    @inject("CursoRepository")
    private cursoRepository: ICursoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {

    const cursoExists = await this.cursoRepository.get(id)
  
    if(cursoExists.data === null) {
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