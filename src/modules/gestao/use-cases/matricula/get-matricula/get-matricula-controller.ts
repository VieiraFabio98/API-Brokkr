import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetMatriculaUseCase } from "./get-matricula-use-case";


class GetMatriculaController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const getMatriculaUseCase = container.resolve(GetMatriculaUseCase)

    const result = await getMatriculaUseCase.execute(id)

    return response.status(result.statusCode).json(result)
  }
}

export { GetMatriculaController }