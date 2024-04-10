import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { UserEntity } from '../entities/user.entity'
import { CreateUser } from '../dtos/create.dto'
import { UserQueryDto } from '../dtos/query.dto'
import { UpdateUser } from '../dtos/update.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  @Post()
  create(@Body() createUserDto: CreateUser) {
    return this.prisma.user.create({ data: createUserDto })
  }

  @ApiOkResponse({ type: [UserEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: UserQueryDto) {
    return this.prisma.user.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: UserEntity })
  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.prisma.user.findUnique({ where: { uid } })
  }

  @ApiOkResponse({ type: UserEntity })
  @ApiBearerAuth()
  //   @AllowAuthenticated()
  @Patch(':uid')
  update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUser) {
    return this.prisma.user.update({
      where: { uid },
      data: updateUserDto,
    })
  }

  @ApiBearerAuth()
  //   @AllowAuthenticated()
  @Delete(':uid')
  remove(@Param('uid') uid: string) {
    return this.prisma.user.delete({ where: { uid } })
  }
}
