import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth.gaurd';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponseDto } from '../common/dto/base-response.dto';

@ApiTags('User Management')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get user profile',
    description: 'Retrieve the profile information of the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: BaseResponseDto,
    schema: {
      example: {
        error: false,
        msg: 'User profile',
        data: {
          _id: '507f1f77bcf86cd799439011',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          verified: false,
          createdAt: '2024-02-11T14:27:39.845Z',
          updatedAt: '2024-02-11T14:27:39.845Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
    schema: {
      example: {
        error: true,
        msg: 'Unauthorized',
        data: null,
      },
    },
  })
  profile(@Request() req: any) {
    return this.userService.getProfile(req.user._id as string);
  }
}
