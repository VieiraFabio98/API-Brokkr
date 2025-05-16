import { CursoRepository } from "@modules/gestao/infra/repositories/curso-repository"
import { ICursoRepository } from "@modules/gestao/repositories/i-curso-repository"
import { AlunoRepository } from "@modules/pessoas/infra/repositories/aluno-repository"
import { IAlunoRepository } from "@modules/pessoas/repositories/i-aluno-repository"
import { container } from "tsyringe"

container.registerSingleton<IAlunoRepository>("AlunoRepository", AlunoRepository)
container.registerSingleton<ICursoRepository>("CursoRepository", CursoRepository)