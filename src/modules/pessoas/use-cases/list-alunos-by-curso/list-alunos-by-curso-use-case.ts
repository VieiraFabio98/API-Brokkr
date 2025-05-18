import { ICursoRepository } from "@modules/gestao/repositories/i-curso-repository"
import { IAlunoRepository } from "@modules/pessoas/repositories/i-aluno-repository"
import { HttpResponse, notFound, ok } from "@shared/helpers"
import { inject, injectable } from "tsyringe"


@injectable()
class ListAlunosByCursoUseCase {
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

    const { cursoNome, descricao } = result.data[0]
    const alunos = result.data.map(({ id, nome, email, dataMatricula }: any) => ({ id, nome, email, dataMatricula }))
      
      result.data = {
        Curso: {
          nome: cursoNome,
          descricao: descricao
        },
        alunos
      }

    if(result.data.length === 0) {
      return ok({message: "Nenhum aluno matriculado nesse curso."})
    }

    return result

  }
}

export { ListAlunosByCursoUseCase }