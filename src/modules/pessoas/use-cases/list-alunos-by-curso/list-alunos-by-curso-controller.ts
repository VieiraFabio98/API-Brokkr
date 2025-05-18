import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAlunosByCursoUseCase } from "./list-alunos-by-curso-use-case";


class ListAlunosByCursoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const listAlunosByCursoUseCase = container.resolve(ListAlunosByCursoUseCase)

    const result = await listAlunosByCursoUseCase.execute(id)

    return response.status(result.statusCode).json(result)
  }

}

export { ListAlunosByCursoController }