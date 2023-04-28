import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Dir, Order } from 'src/constants/enums';

export class PaginationDto {
  @ApiProperty({ type: Number, name: 'pageSize', default: 10, required: true })
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(1000)
  pageSize: number;

  @ApiProperty({ type: Number, name: 'page', default: 1, required: true })
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10000000)
  page: number;

  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  searchTerm: string;

  @ApiPropertyOptional({ type: Dir })
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Dir)
  Dir: Dir.ASC;

  @ApiPropertyOptional({ type: Order })
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Order)
  Order: Order.saleDate;
}
