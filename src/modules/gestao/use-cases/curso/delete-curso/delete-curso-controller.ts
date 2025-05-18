import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeleteCursoUseCase } from "./delete-curso-use-case"


class DeleteCursoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteCursoUseCase = container.resolve(DeleteCursoUseCase)

    const result = await deleteCursoUseCase.execute(id)

    return response.status(result.statusCode).json(result)
  }
}

export { DeleteCursoController }