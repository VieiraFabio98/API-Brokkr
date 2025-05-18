import { Request, Response } from "express"
import { container } from "tsyringe"
import { GetCursoUseCase } from "./get-curso-use-case"


class GetCursoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getCursoUseCase = container.resolve(GetCursoUseCase)

    const result = await getCursoUseCase.execute(id)

    return response.status(result.statusCode).json(result)
  }
}

export { GetCursoController }