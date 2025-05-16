import { Router } from "express"
import { alunosRoutes } from "./pessoas/aluno-routes"
import { cursoRoutes } from "./gestao/curso-routes"
import { matriculaRoutes } from "./gestao/matricula-routes"


const router = Router()

router.use('/alunos', alunosRoutes)
router.use('/cursos', cursoRoutes)
router.use('/matriculas', matriculaRoutes)

export { router }