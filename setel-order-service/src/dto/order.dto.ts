import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty({ type: 'string', required: true })
  name: string;

  @ApiProperty({ type: 'number', required: true })
  price: number;

  @ApiProperty({ type: 'string', required: false })
  description: string;
}
