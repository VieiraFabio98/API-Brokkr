import { Request, Response } from "express"
import { container } from "tsyringe"
import { GetAlunoUseCase } from "./get-aluno-use-case"


class GetAlunoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const getAlunoController = container.resolve(GetAlunoUseCase)

    const result = await getAlunoController.execute(id)

    return response.status(result.statusCode).json(result)
  }
}

export { GetAlunoController }