import Joi from "joi"

const cursoSchema = Joi.object({
  nome: Joi.string()
    .required()
    .pattern(/^[a-zA-ZÀ-ÿ\s0-9.]+$/)
    .messages({
      "string.base": "O campo 'nome' deve ser uma string.",
      "string.empty": "O campo 'nome' não pode estar vazio.",
      "string.pattern.base": "O campo 'nome' deve conter apenas letras, números, espaços e acentuação.",
      "any.required": "O campo 'nome' é obrigatório.",
    }),
  descricao: Joi.string()
    .required()
    .pattern(/^[a-zA-ZÀ-ÿ\s0-9.]+$/)
    .messages({
      "string.base": "O campo 'descrição' deve ser uma string.",
      "string.empty": "O campo 'descrição' não pode estar vazio.",
      "string.pattern.base": "O campo 'descrição' deve conter apenas letras, números, espaços e acentuação.",
      "any.required": "O campo 'descrição' é obrigatório.",
    }),
})

export { cursoSchema }