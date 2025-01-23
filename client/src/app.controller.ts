import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(@Inject('TCP_SERVICE') private readonly client: ClientProxy) {}

  @Get('sum')
  async getSum() {
    const numbers = [1, 2, 3, 4, 5];
    const result = await firstValueFrom(
      this.client.send<number>({ cmd: 'sum' }, numbers),
    );

    return {
      message: 'Sum of [1,2,3,4,5]',
      result,
    };
  }
}
