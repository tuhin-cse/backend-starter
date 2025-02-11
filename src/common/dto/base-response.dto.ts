import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class BaseResponseDto<T> {
  @ApiProperty({
    description: 'Indicates if the response contains an error',
    example: false,
  })
  error: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Operation successful',
  })
  msg: string;

  @ApiProperty({
    description: 'Response data',
    required: false,
    type: Object,
  })
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
