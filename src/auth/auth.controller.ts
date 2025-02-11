import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponseDto } from '../common/dto/base-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register new user',
    description: 'Create a new user account with name, email, and password'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered',
    type: BaseResponseDto
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Email is already registered',
    schema: {
      example: {
        error: true,
        msg: 'Email is already registered',
        data: null
      }
    }
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user with email and password to receive JWT token'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully logged in',
    type: BaseResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'User not found',
    schema: {
      example: {
        error: true,
        msg: 'Invalid Email/Password',
        data: null
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Invalid credentials',
    schema: {
      example: {
        error: true,
        msg: 'Invalid Email/Password',
        data: null
      }
    }
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
