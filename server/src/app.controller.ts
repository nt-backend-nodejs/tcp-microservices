import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
@Controller()
export class AppController {
  constructor(@Inject('TCP_SERVICE') private readonly client: ClientProxy) {}

  @MessagePattern({ cmd: 'sum' })
  async sum(data: number[]): Promise<number> {
    console.log('Server  1', data);
    const result = (await firstValueFrom(
      this.client.send<number>({ cmd: 'sum' }, data),
    )) as number;
    return result;
  }
}
