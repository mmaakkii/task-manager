import { Document, Model } from 'mongoose'

import { IBaseModel } from '../../../global/types/Models.types'
import { IUserDocument } from '../../users/types/user'

export interface IComment extends IBaseModel {
  text: string
  media: Array<string>
}

export interface ICommentDocument extends IComment, Document {
  getStatus: () => string
}

export interface ITag extends IBaseModel {
  name: string
}

export interface ITask extends IBaseModel {
  title: string
  description: string
  assignee: IUserDocument
  media: Array<string>
  dueDate: Date
  comments: Array<IComment>
  tags: Array<ITag>
  linkedTasks: Array<ITask>
  subTasks: Array<ITask>
  collaborators: Array<IUserDocument>
}

export interface ITaskDocument extends ITask, Document {
  getCollaboratorsNames: () => Array<string>
}

export interface ITaskModel extends Model<ITaskDocument> {
  getAssignee: string
}
