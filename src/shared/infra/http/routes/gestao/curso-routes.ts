import { CreateCursoController } from "@modules/gestao/use-cases/curso/create-curso/create-curso-controller"
import { Router } from "express"
import { validateSchema } from "../../middlewares/validateSchema"
import { cursoSchema } from "@utils/cursoSchema"
import { GetCursoController } from "@modules/gestao/use-cases/curso/get-curso/get-curso-controller"
import { UpdateCursoController } from "@modules/gestao/use-cases/curso/update-curso/update-curso-controller"
import { DeleteCursoController } from "@modules/gestao/use-cases/curso/delete-curso/delete-curso-controller"
import { ListCursoByAlunoController } from "@modules/gestao/use-cases/curso/list-curso-by-aluno/list-curso-by-aluno-controller"


const cursoRoutes = Router()

const createCursoController = new CreateCursoController()
const getCursoController = new GetCursoController()
const updateCursoController = new UpdateCursoController()
const deleteCursoController = new DeleteCursoController()
const listCursoByAlunoController = new ListCursoByAlunoController()

cursoRoutes.post('/', validateSchema(cursoSchema), createCursoController.handle)
cursoRoutes.get('/:id', getCursoController.handle)
cursoRoutes.put('/:id', validateSchema(cursoSchema), updateCursoController.handle)
cursoRoutes.delete('/:id', deleteCursoController.handle)
cursoRoutes.get('/list-cursos-by-aluno/:id', listCursoByAlunoController.handle)

export { cursoRoutes }