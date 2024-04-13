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
import { AllowAuthenticated } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { ItemEntity } from '../entities/item.entity'
import { CreateItem } from '../dtos/create.dto'
import { ItemQueryDto } from '../dtos/query.dto'
import { UpdateItem } from '../dtos/update.dto'

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ItemEntity })
  @Post()
  create(@Body() createItemDto: CreateItem) {
    return this.prisma.item.create({ data: createItemDto })
  }

  @ApiOkResponse({ type: [ItemEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ItemQueryDto) {
    return this.prisma.item.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ItemEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.item.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: ItemEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateItemDto: UpdateItem) {
    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.prisma.item.delete({ where: { id } })
  }
}
