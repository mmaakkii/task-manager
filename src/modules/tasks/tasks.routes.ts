import { Router } from 'express'
import { protect } from '@auth/controller'
import { createTask, getTask, updateTask, deleteTask } from './controller'

const taskRoutes = Router()

taskRoutes.post('/', protect, createTask)
taskRoutes.route('/:uid').get(protect, getTask).put(protect, updateTask).delete(protect, deleteTask)

export { taskRoutes }
