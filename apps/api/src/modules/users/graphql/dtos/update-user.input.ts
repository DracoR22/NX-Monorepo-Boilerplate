import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

@InputType()
export class UpdateUserInput extends PartialType(
  PickType(User, ['image', 'name']),
) {
  uid: User['uid']
}
