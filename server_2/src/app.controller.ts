import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern({ cmd: 'sort' })
  sort(data: number[]): number[] {
    console.log('Kelib tushgan massiv:', data);
    return data.sort((a, b) => a - b);
  }

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    console.log('Server 2:', data);
    console.log('Kelib tushgan massiv:', data);
    return data.reduce((a, b) => a + b, 0);
  }
}
