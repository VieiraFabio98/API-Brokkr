import { Request, Response, NextFunction } from "express"
import { ObjectSchema } from "joi"

function validateSchema(schema: ObjectSchema) {
  return (request: Request, response: Response, next: NextFunction): void | Response => {
    const { error } = schema.validate(
      request.body,
      {
        abortEarly: false
      }
    )

    if(error) {
      const errors = error.details.map((detail) => detail.message)
      return response.status(400).json({ errors })
    }

    next()
  }
}

export { validateSchema }