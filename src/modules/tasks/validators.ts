import Joi from '@hapi/joi'

export const createTaskSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim(),
  media: Joi.string().trim(),
  dueDate: Joi.date(),
  creator: Joi.object().required(),
})
