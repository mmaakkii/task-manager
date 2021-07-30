import express from 'express'

import { userRoutes } from '../modules/users/users.routes'
import { taskRoutes } from '../modules/tasks/tasks.routes'

const router = express.Router()

router.use('/v1/users', userRoutes)
router.use('/v1/tasks', taskRoutes)

export { router }
