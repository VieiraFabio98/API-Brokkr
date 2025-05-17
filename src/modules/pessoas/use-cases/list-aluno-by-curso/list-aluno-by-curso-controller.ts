import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAlunoByCursoUseCase } from "./list-aluno-by-curso-use-case";


class ListAlunoByCursoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const listAlunoByCursoUseCase = container.resolve(ListAlunoByCursoUseCase)

    const result = await listAlunoByCursoUseCase.execute(id)

    return response.status(result.statusCode).json(result)
  }

}

export { ListAlunoByCursoController }