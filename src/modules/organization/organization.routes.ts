import { protect } from '@auth/controller'
import { Router } from 'express'
import { createOrganization, getOrganization } from './controllers'

const organizationRoutes = Router()

organizationRoutes.post('/', protect, createOrganization)
organizationRoutes.route('/:uid').get(protect, getOrganization)

export { organizationRoutes }
