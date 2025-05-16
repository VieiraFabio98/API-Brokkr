import { CreateMatriculaController } from "@modules/gestao/use-cases/matricula/create-matricula/create-matricula-controller";
import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchema";
import { matriculaSchema } from "@utils/matriculaSchema";


const matriculaRoutes = Router()

const createMatriculaCOntroller = new CreateMatriculaController()
matriculaRoutes.post('/', validateSchema(matriculaSchema), createMatriculaCOntroller.handle)

export { matriculaRoutes }