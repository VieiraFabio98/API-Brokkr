import { AlunoRepository } from "@modules/alunos/infra/repositories/aluno-repository"
import { IAlunoRepository } from "@modules/alunos/repositories/i-aluno-repository"
import { container } from "tsyringe"

container.registerSingleton<IAlunoRepository>("AlunoRepository", AlunoRepository)