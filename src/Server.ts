/* eslint-disable  */

import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import path from 'path'
import helmet from 'helmet'
import StatusCodes from 'http-status-codes'
import express, { NextFunction, Request, Response } from 'express'

import 'express-async-errors'

import mongoose from 'mongoose'
import logger from '@shared/Logger'
import { cookieProps } from '@shared/constants'

import { router } from './routes'

const app = express()
const { BAD_REQUEST } = StatusCodes

// process.on('uncaughtException', (err) => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   const regEx = new RegExp(
//     `${process.cwd()}\\/(?!node_modules\\/)([\\/\\w-_\\.]+\\.js):(\\d*):(\\d*)`
//   );
//   const [, filename, line, column] = err?.stack?.match(regEx);
//   const errMsg = `${err.name}: ${err.message} in ${filename}, line: ${line}, column: ${column}`;
//   console.log(errMsg);
//   process.exit(1);
// });

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(cookieProps.secret))

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

// Add APIs
app.use('/api', router)

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.err(err, true)
  return res.status(BAD_REQUEST).json({
    error: err.message,
  })
})

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views')
app.set('views', viewsDir)
const staticDir = path.join(__dirname, 'public')
app.use(express.static(staticDir))

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello from Task Manager', app: 'Task Manager' })
})

const DB = `${process.env.DATABASE_URI}`

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true,
  })
  .then(() => console.log('DB connection successful'))

/************************************************************************************
 *                              Export Server
 ***********************************************************************************/

export default app
