import { CreateCursoController } from "@modules/gestao/use-cases/curso/create-curso/create-curso-controller"
import { Router } from "express"
import { validateSchema } from "../../middlewares/validateSchema"
import { cursoSchema } from "@utils/cursoSchema"
import { GetCursoController } from "@modules/gestao/use-cases/curso/get-curso/get-curso-controller"


const cursoRoutes = Router()

const createCursoController = new CreateCursoController()
const getCursoController = new GetCursoController()

cursoRoutes.post('/', validateSchema(cursoSchema), createCursoController.handle)
cursoRoutes.get('/:id', getCursoController.handle)

export { cursoRoutes }