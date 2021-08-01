import Joi from '@hapi/joi'

export const createOrganizationSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim(),
  creator: Joi.object().required(),
})
