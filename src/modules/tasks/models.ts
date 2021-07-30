import mongoose, { HookNextFunction, Schema } from 'mongoose'

import { BaseModelSchema } from '../../global/Models'
import { IComment, ITag, ITask, ITaskDocument, ITaskModel } from './types/Tasks.types'

import { extend, getModelUID } from '../../global/utils'

const CommentSchema = extend(BaseModelSchema, {
  uid: {
    type: String,
    auto: true,
    unique: true,
    default: () => {
      return getModelUID('comment')
    },
  },
  text: String,
  media: Array,
})

const TagSchema = extend(BaseModelSchema, {
  uid: {
    type: String,
    auto: true,
    unique: true,
    default: () => {
      return getModelUID('tag')
    },
  },
  name: {
    type: String,
    required: [true, 'A tag must have a name'],
    unique: [true, 'A tag with that name already exists'],
    trim: true,
  },
})

const TaskSchema = new Schema<ITaskDocument, ITaskModel>(
  {
    ...BaseModelSchema.obj,
    uid: {
      type: String,
      auto: true,
      unique: true,
      default: () => {
        return getModelUID('task')
      },
    },
    title: {
      type: String,
      required: [true, 'A task must have a title'],
    },
    description: String,
    assignee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    media: Array,
    dueDate: Date,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    linkedTasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    subTasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
)

TaskSchema.pre<ITaskDocument>('save', async function (next: HookNextFunction) {
  await this.populate('creator')
  next()
})

export const Comment = mongoose.model<IComment>('Comment', CommentSchema)
export const Tag = mongoose.model<ITag>('Tag', TagSchema)
export const Task = mongoose.model<ITaskDocument, ITaskModel>('Task', TaskSchema)

// https://stackoverflow.com/questions/34985846/mongoose-document-references-with-a-one-to-many-relationship
