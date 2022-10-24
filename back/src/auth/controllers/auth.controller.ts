import {
  Body,
  Request,
  Controller,
  Post,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities/user.entity';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: User) {
    try {
      const newUser = await this.usersService.createNewUser(user);
    } catch (e) {
      throw new BadRequestException('Username is already taken');
    }
    return this.usersService.login(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: User) {
    return this.usersService.login(user);
  }
}
