import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCursoByAlunoUseCase } from './list-curso-by-aluno-use-case'

class ListCursoByAlunoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const listCursoByAluno = container.resolve(ListCursoByAlunoUseCase)

    const result = await listCursoByAluno.execute(id)

    return response.status(result.statusCode).json(result)
  }
}

export { ListCursoByAlunoController }