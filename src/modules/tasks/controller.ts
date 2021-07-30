import { Response, Request, NextFunction } from 'express'

import { Tag, Task, Comment } from './models'

import { Factory } from '../../global/handlerFactory'
import { catchAsync } from 'src/global/catchAsync'
import { createTaskSchema } from './validators'
import { getResponseStatus } from 'src/global/utils'

export const createTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { body, user } = req
  body.creator = user
  const factory = new Factory({ model: Task, data: body, schema: createTaskSchema })
  console.log('res', body)
  const response = await factory.createOne()
  const statusCode = getResponseStatus(response, true)
  res.status(statusCode).json(response)
})

export const getTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.params
  const factory = new Factory({ model: Task, uid })
  const response = await factory.getOne()
  const statusCode = getResponseStatus(response)
  res.status(statusCode).json(response)
})

export const updateTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.params
  const { body, user } = req
  const data = {
    ...body,
    editor: user,
    updatedAt: Date.now(),
  }
  const factory = new Factory({ model: Task, uid, data })
  const response = await factory.updateOne()
  const statusCode = getResponseStatus(response)
  res.status(statusCode).json(response)
})

export const deleteTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.params
  const { user } = req
  const data = {
    editor: user,
    updatedAt: Date.now(),
  }
  const factory = new Factory({ model: Task, uid, data })
  const response = await factory.deleteOne()
  const statusCode = getResponseStatus(response)
  res.status(statusCode).json(response)
})
