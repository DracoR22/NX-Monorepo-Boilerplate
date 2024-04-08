import { Injectable } from '@nestjs/common'
import { Hello } from '@supply-chain/nest-lib'

@Injectable()
export class AppService {
  getHello(): string {
    const hello = Hello()
    console.log(hello)
    return hello
  }
}
