import { ICursoRepository } from "@modules/gestao/repositories/i-curso-repository";
import { IAlunoRepository } from "@modules/pessoas/repositories/i-aluno-repository";
import { HttpResponse, notFound, serverError } from "@shared/helpers";
import { inject, injectable } from "tsyringe";


@injectable()
class ListCursoByAlunoUseCase {
  constructor(
    @inject('CursoRepository')
    private cursoRepository: ICursoRepository,
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository
  ){}

  async execute(alunoId: string): Promise<HttpResponse> {
    try {
      const alunoExists = await this.alunoRepository.get(alunoId)
    
      if(alunoExists.data === null) {
        return notFound("Aluno não encontrado")
      }

      const result = await this.cursoRepository.listCursoByAlunoId(alunoId)

      const { alunoNome, alunoEmail } = result.data[0]
      const cursos = result.data.map(({ id, nome, descricao }: any) => ({ id, nome, descricao }))
      
      result.data = {
        aluno: {
          nome: alunoNome,
          email: alunoEmail
        },
        cursos
      }

      return result

    } catch(err) {
      throw serverError(err as Error)
    }
  }
}

export { ListCursoByAlunoUseCase }