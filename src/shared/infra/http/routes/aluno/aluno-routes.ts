import { CreateAlunoController } from "@modules/alunos/use-cases/create-aluno/create-aluno-controller"
import { DeleteAlunoController } from "@modules/alunos/use-cases/delete-aluno/delete-aluno-controller"
import { GetAlunoController } from "@modules/alunos/use-cases/get-aluno/get-aluno-controller"
import { UpdateAlunoController } from "@modules/alunos/use-cases/update-aluno/update-aluno-controller"
import { Router } from "express"

const alunosRoutes = Router()

const createAlunoController = new CreateAlunoController()
const getAlunoController = new GetAlunoController()
const updateAlunoController = new UpdateAlunoController()
const deleteAlunoController = new DeleteAlunoController()

alunosRoutes.post('/', createAlunoController.handle)
alunosRoutes.get('/:id', getAlunoController.handle)
alunosRoutes.put('/:id', updateAlunoController.handle)
alunosRoutes.delete('/:id', deleteAlunoController.handle)

export { alunosRoutes}