import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateMatriculaUseCase } from "./create-matricula-use-case";


class CreateMatriculaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { alunoId, cursoId } = request.body

    const createMatriculaUseCase = container.resolve(CreateMatriculaUseCase)

    const result = await createMatriculaUseCase.execute({
      alunoId,
      cursoId
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateMatriculaController }