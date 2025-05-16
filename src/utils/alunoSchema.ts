import Joi from "joi"

const alunoSchema = Joi.object({
  nome: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.base": "O campo 'nome' deve ser uma string.",
      "string.empty": "O campo 'nome' não pode estar vazio.",
      "string.pattern.base": "O campo 'nome' deve conter apenas letras e espaços.",
      "any.required": "O campo 'nome' é obrigatório.",
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": "O campo 'email' deve ser uma string.",
      "string.empty": "O campo 'email' não pode estar vazio.",
      "string.email": "O campo 'email' deve ser um e-mail válido.",
      "any.required": "O campo 'email' é obrigatório.",
    }),
})

export { alunoSchema }