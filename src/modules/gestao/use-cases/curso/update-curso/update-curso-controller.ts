import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCursoUseCase } from "./update-curso-use-case";


class UpdateCursoController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.params
    const { nome, descricao } = request.body

    const updateCursoUseCase = container.resolve(UpdateCursoUseCase)

    const result = await updateCursoUseCase.execute({
      id,
      nome,
      descricao
    })

    return response.status(result.statusCode).json(result)
  }

}

export { UpdateCursoController }