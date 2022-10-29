import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../entities/user.entity';
import { LocalAuthGuard } from '../local-auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: User) {
    let newUser;
    try {
      newUser = await this.usersService.createNewUser(user);
    } catch (e) {
      throw new BadRequestException('Username is already taken');
    }
    return newUser;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: User) {
    return this.usersService.login(user);
  }
}
