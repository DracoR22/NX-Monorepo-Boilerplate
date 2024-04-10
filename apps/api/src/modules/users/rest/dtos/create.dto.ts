import { OmitType } from '@nestjs/swagger'
import { UserEntity } from '../entities/user.entity'

export class CreateUser extends OmitType(UserEntity, [
  'createdAt',
  'updatedAt',
]) {}
