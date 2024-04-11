import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { Role } from '@supply-chain/utils'
import { AuthGuard } from './auth.guard'

export const AllowAuthenticated = (...roles: Role[]) => {
  applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard))
}
