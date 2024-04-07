import { Injectable } from '@nestjs/common'
import { Hello } from '@suply-chain/nest-lib'

@Injectable()
export class AppService {
  getHello(): string {
    const hello = Hello()
    console.log(hello)
    return hello
  }
}
