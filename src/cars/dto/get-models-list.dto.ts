import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetModelsListDto {
  @ApiProperty({ type: Number, example: 4 })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
