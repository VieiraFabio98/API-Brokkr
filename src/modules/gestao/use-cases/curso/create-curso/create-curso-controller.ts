import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCursoUseCase } from "./create-curso-use-case";


class CreateCursoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, descricao } = request.body

    const createCursoUseCase = container.resolve(CreateCursoUseCase)

    const result = await createCursoUseCase.execute({
      nome,
      descricao
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateCursoController }