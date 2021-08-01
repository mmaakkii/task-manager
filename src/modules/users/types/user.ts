import { Document, Model, model, Schema, Types, Query } from 'mongoose'
import { IOrganization } from 'src/modules/organization/types/Organization.types'

import { IBaseModel } from '../../../global/types/Models.types'

// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

export interface IUser extends IBaseModel {
  firstName: string
  lastName: string
  email: string
  organization?: IOrganization
  userType: 'IndividualUser' | 'OrganizationUser'
  profileImage: string
  password: string
  passwordChangedAt: Date
  passwordResetToken: string
  passwordResetExpires: Date | number
  signUpToken: string
  signUpTokenExpires: Date | number
  isVerified: boolean
  isActive: boolean
  isAdmin: boolean
}

export interface IInvitedUser extends IBaseModel {
  email: string
  organization: string
}

export interface IInvitedUserDocument extends IInvitedUser, Document {}

export interface IInvitedUserModel extends Model<IInvitedUserDocument> {}

export interface IUserDocument extends IUser, Document {
  correctPassword(candidatePassword: string, userPassword: string): boolean
  changedPasswordAfter(timestamp: number): boolean
  createPasswordResetToken(): string
  createSignUpToken(): string
  isUserActive(): boolean
  isUserVerified(): boolean
}

export interface IUserModel extends Model<IUserDocument> {
  fullName: string
}

export type GetUserByParam = {
  user: IUserDocument | null
  isActive?: boolean
  isVerified?: boolean
  isDeleted?: boolean
}
