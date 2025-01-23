import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('TCP_SERVICE_1') private readonly client_1: ClientProxy,
    @Inject('TCP_SERVICE_2') private readonly client_2: ClientProxy,
  ) {}

  @Get('sum')
  async getSum() {
    const numbers = [1, 2, 3, 4, 5];
    console.log('Client 1', numbers);
    const result = await firstValueFrom(
      this.client_1.send<number>({ cmd: 'sum' }, numbers),
    );

    return {
      message: 'Sum of [1,2,3,4,5]',
      result,
    };
  }
  @Get('sort')
  async getSort() {
    const numbers = [51, 5, 62, 96, 69, 11, 90, 33, 115, 4, 5, 3, 2, 1];
    const result = await firstValueFrom(
      this.client_2.send<number[]>({ cmd: 'sort' }, numbers),
    );

    return {
      message: 'Sorted [5,4,3,2,1]',
      result,
    };
  }
}
