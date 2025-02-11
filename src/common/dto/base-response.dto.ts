import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class BaseResponseDto<T> {
  @ApiProperty({ example: false })
  error: boolean;

  @ApiProperty({ example: 'Successful' })
  msg: string;

  @ApiProperty()
  @IsOptional()
  data?: T | T[];
}

export class SuccessResponse<T> extends BaseResponseDto<T> {
  constructor(msg: string, data?: T) {
    super();
    this.error = false;
    this.msg = msg || 'Successful';
    this.data = data;
  }
}
