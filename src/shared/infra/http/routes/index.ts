import { Router } from "express"
import { alunosRoutes } from "./pessoas/aluno-routes"
import { cursoRoutes } from "./gestao/curso-routes"


const router = Router()

router.use("/alunos", alunosRoutes)
router.use("/cursos", cursoRoutes)

export { router }