import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateMatriculaUseCase } from "./update-matricula-use-case"


class UpdateMatriculaController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const { alunoId, cursoId } = request.body

    const updateMatriculaUseCase = container.resolve(UpdateMatriculaUseCase)

    const result = await updateMatriculaUseCase.execute({
      id,
      alunoId,
      cursoId,
    })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateMatriculaController }