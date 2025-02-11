import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com'
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongP@ssw0rd',
    minLength: 8
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
