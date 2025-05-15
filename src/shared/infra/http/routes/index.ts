import { Router } from "express"
import { alunosRoutes } from "./aluno/aluno-routes"


const router = Router()

router.use("/alunos", alunosRoutes)

export { router }