import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeleteMatriculaUseCase } from "./delete-matricula-use-case"


class DeleteMatriculaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteMatriculaUseCase = container.resolve(DeleteMatriculaUseCase)

    const result = await deleteMatriculaUseCase.execute(id)

    return response.status(result.statusCode).json(result)
    
  }
}

export { DeleteMatriculaController }