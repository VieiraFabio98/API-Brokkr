import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeleteAlunoUseCase } from "./delete-aluno-use-case"


class DeleteAlunoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteAlunoUseCase = container.resolve(DeleteAlunoUseCase)

    const result = await deleteAlunoUseCase.execute(id)

    return response.status(result.statusCode).json(result)
  }
}

export { DeleteAlunoController}