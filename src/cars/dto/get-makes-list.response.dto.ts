import { ApiProperty } from '@nestjs/swagger';

export class GetMakesListResDto {
  @ApiProperty({ type: Number, example: 4 })
  id: number;

  @ApiProperty({ type: String, example: 'BMW' })
  title: string;
}
