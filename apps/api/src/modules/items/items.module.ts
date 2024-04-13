import { Module } from '@nestjs/common'
import { ItemsResolver } from './graphql/resolvers/items.resolver'
import { ItemsService } from './graphql/services/items.service'
import { ItemsController } from './rest/controllers/items.controller'

@Module({
  providers: [ItemsResolver, ItemsService],
  exports: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
