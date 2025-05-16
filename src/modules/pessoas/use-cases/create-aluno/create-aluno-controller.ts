import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAlunoUseCase } from "./create-aluno-use-case";


class CreateAlunoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, email, dataNascimento } = request.body

    const createAlunoUseCase = container.resolve(CreateAlunoUseCase)

    const result = await createAlunoUseCase.execute({
      nome,
      email,
      dataNascimento
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateAlunoController }