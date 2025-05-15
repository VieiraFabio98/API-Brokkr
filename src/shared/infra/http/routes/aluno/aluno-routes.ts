import { CreateAlunoController } from "@modules/alunos/use-cases/create-aluno/create-aluno-controller"
import { Router } from "express"

const alunosRoutes = Router()

const createAlunoController = new CreateAlunoController()

alunosRoutes.post('/', createAlunoController.handle)

export { alunosRoutes}