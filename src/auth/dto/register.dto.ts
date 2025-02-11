import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class RegisterDto {
  @ApiProperty({
    description: 'User\'s full name',
    example: 'John Doe',
    minLength: 2
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  name: string;

  @ApiProperty({
    description: 'User\'s email address',
    example: 'john.doe@example.com'
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @ApiProperty({
    description: 'User\'s password. Must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    example: 'StrongP@ssw0rd',
    minLength: 8,
    maxLength: 20
  })
  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegEx, {
    message: 'Password must contain minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;
}
