import { Module } from '@nestjs/common'
import { UsersService } from './rest/services/users.service'
import { UsersController } from './rest/controllers/users.controller'
import { UserResolver } from './graphql/resolvers/users.resolver'
import { Query } from '@nestjs/graphql'

@Module({
  providers: [UserResolver, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!'
  }
}
