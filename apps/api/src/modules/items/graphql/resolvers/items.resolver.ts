import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Item } from '../entities/item.entity'
import { ItemsService } from '../services/items.service'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { CreateItemInput } from '../dtos/create-item.input'
import { GetUserType } from '@supply-chain/utils'
import { FindManyItemArgs, FindUniqueItemArgs } from '../dtos/find.args'
import { UpdateItemInput } from '../dtos/update-item.input'
import { User } from 'src/modules/users/graphql/entities/user.entity'

@Resolver(() => Item)
export class ItemsResolver {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Item)
  createItem(
    @Args('createItemInput') args: CreateItemInput,
    @GetUser() user: GetUserType,
  ) {
    return this.itemsService.create(args, user.uid)
  }

  @AllowAuthenticated('admin')
  @Query(() => [Item], { name: 'items' })
  findAll(@Args() args: FindManyItemArgs) {
    return this.itemsService.findAll(args)
  }

  @AllowAuthenticated()
  @Query(() => [Item], { name: 'myItems' })
  myItems(@Args() args: FindManyItemArgs, @GetUser() user: GetUserType) {
    return this.itemsService.findAll({
      ...args,
      where: { ...args.where, uid: { equals: user.uid } },
    })
  }

  @AllowAuthenticated()
  @Query(() => Item, { name: 'item' })
  async findOne(
    @Args() args: FindUniqueItemArgs,
    @GetUser() user: GetUserType,
  ) {
    return this.itemsService.getItemByOwner(args.where.id, user.uid)
  }

  @AllowAuthenticated()
  @Mutation(() => Item)
  async updateItem(
    @Args('updateItemInput') args: UpdateItemInput,
    @GetUser() user: GetUserType,
  ) {
    await this.itemsService.getItemByOwner(args.id, user.uid)
    return this.itemsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Item)
  async removeItem(
    @Args() args: FindUniqueItemArgs,
    @GetUser() user: GetUserType,
  ) {
    await this.itemsService.getItemByOwner(args.where.id, user.uid)
    return this.itemsService.remove(args)
  }

  @ResolveField(() => User)
  user(@Parent() parent: Item) {
    return this.prisma.user.findUnique({ where: { uid: parent.uid } })
  }
}
