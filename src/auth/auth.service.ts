import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { SuccessResponse } from '../common/dto/base-response.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findOneByEmail(registerDto.email);
    if (user) {
      throw new ConflictException('Email is already registered');
    }
    const newUser = await this.userService.create(registerDto);
    const token = this.jwtService.sign({
      _id: newUser._id,
      role: newUser.role,
    });

    return new SuccessResponse('User registered successfully', {
      token,
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('Invalid Email/Password');
    }
    const verify = await user.comparePassword(loginDto.password);
    if (!verify) {
      throw new ConflictException('Invalid Email/Password');
    }
    const token = this.jwtService.sign({ _id: user._id, role: user.role });
    return new SuccessResponse('User logged in successfully', {
      token,
    });
  }
}
