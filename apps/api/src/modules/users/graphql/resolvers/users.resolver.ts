import { Query, Resolver } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

@Resolver(() => User)
export class UsersResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!'
  }
}
