import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAlunoUseCase } from "./update-aluno-use-case";


class UpdateAlunoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { nome, email } = request.body

    const updateAlunoUseCase = container.resolve(UpdateAlunoUseCase)

    const result = await updateAlunoUseCase.execute({
      id,
      nome,
      email
    })

    return response.status(result.statusCode).json(result)
  }

}

export { UpdateAlunoController }