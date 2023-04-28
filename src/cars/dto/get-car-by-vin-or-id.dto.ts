import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class GetCarByVinOrIdDto {
  @ApiProperty({ type: String, example: '46306393' })
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  vinOrId: string;
}
