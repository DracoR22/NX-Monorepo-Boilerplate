import { OmitType } from '@nestjs/swagger'
import { ItemEntity } from '../entities/item.entity'

export class CreateItem extends OmitType(ItemEntity, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
