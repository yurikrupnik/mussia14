import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginatedDto<TData> {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsNumber()
  limit: number;

  @ApiProperty()
  @IsNumber()
  offset: number;

  results: TData[];
}
