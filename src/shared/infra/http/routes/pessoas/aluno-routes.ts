import { CreateAlunoController } from "@modules/pessoas/use-cases/create-aluno/create-aluno-controller"
import { DeleteAlunoController } from "@modules/pessoas/use-cases/delete-aluno/delete-aluno-controller"
import { GetAlunoController } from "@modules/pessoas/use-cases/get-aluno/get-aluno-controller"
import { UpdateAlunoController } from "@modules/pessoas/use-cases/update-aluno/update-aluno-controller"
import { Router } from "express"
import { validateSchema } from "@shared/infra/http/middlewares/validateSchema"
import { alunoSchema } from "@utils/alunoSchema"
import { ListAlunosByCursoController } from "@modules/pessoas/use-cases/list-alunos-by-curso/list-alunos-by-curso-controller"

const alunosRoutes = Router()

const createAlunoController = new CreateAlunoController()
const getAlunoController = new GetAlunoController()
const updateAlunoController = new UpdateAlunoController()
const deleteAlunoController = new DeleteAlunoController()
const listAlunoByCursoController = new ListAlunosByCursoController()

alunosRoutes.post('/', validateSchema(alunoSchema) ,createAlunoController.handle)
alunosRoutes.get('/:id', getAlunoController.handle)
alunosRoutes.put('/:id', validateSchema(alunoSchema), updateAlunoController.handle)
alunosRoutes.delete('/:id', deleteAlunoController.handle)
alunosRoutes.get('/list-alunos-by-curso/:id', listAlunoByCursoController.handle)

export { alunosRoutes}