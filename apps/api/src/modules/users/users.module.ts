import { Module } from '@nestjs/common'
import { UsersService } from './graphql/services/users.service'
import { UsersController } from './rest/controllers/users.controller'
import { UsersResolver } from './graphql/resolvers/users.resolver'

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
