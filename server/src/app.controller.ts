import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    console.log('Kelib tushgan massiv:', data);
    return data.reduce((acc, val) => acc + val, 0);
  }
}
