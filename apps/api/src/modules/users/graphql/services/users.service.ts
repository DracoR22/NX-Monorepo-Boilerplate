import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly jwtService: JwtService,
  ) {}
}
