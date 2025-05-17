import { CreateMatriculaController } from "@modules/gestao/use-cases/matricula/create-matricula/create-matricula-controller";
import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchema";
import { matriculaSchema } from "@utils/matriculaSchema";
import { UpdateMatriculaController } from "@modules/gestao/use-cases/matricula/update-matricula/update-matricula-controller";
import { GetMatriculaController } from "@modules/gestao/use-cases/matricula/get-matricula/get-matricula-controller";
import { DeleteMatriculaController } from "@modules/gestao/use-cases/matricula/delete-matricula/delete-matricula-controller";


const matriculaRoutes = Router()

const createMatriculaController = new CreateMatriculaController()
const getMatriculaController = new GetMatriculaController()
const updateMatriculaController = new UpdateMatriculaController()
const deleteMatriculaController = new DeleteMatriculaController()

matriculaRoutes.post('/', validateSchema(matriculaSchema), createMatriculaController.handle)
matriculaRoutes.get('/:id', getMatriculaController.handle)
matriculaRoutes.put('/:id', validateSchema(matriculaSchema), updateMatriculaController.handle)
matriculaRoutes.delete('/:id', deleteMatriculaController.handle)

export { matriculaRoutes }