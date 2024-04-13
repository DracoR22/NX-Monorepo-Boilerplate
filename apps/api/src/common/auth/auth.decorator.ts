import {
  ExecutionContext,
  SetMetadata,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common'
import { Role } from '@supply-chain/utils'
import { AuthGuard } from './auth.guard'
import { GqlExecutionContext } from '@nestjs/graphql'

export const AllowAuthenticated = (...roles: Role[]) =>
  applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard))

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const context = GqlExecutionContext.create(ctx)
  return context.getContext().req.user
})
