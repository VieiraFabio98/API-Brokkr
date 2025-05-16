import Joi from "joi";

const matriculaSchema = Joi.object({
  alunoId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.base": "O campo 'alunoId' deve ser uma string.",
      "string.guid": "O campo 'alunoId' deve ser um UUID válido.",
      "string.empty": "O campo 'alunoId' não pode estar vazio.",
      "any.required": "O campo 'alunoId' é obrigatório.",
    }),
  cursoId: Joi.string()
    .guid({ version: ["uuidv4"] }) 
    .required()
    .messages({
      "string.base": "O campo 'cursoId' deve ser uma string.",
      "string.guid": "O campo 'cursoId' deve ser um UUID válido.",
      "string.empty": "O campo 'cursoId' não pode estar vazio.",
      "any.required": "O campo 'cursoId' é obrigatório.",
    }),
})

export { matriculaSchema };