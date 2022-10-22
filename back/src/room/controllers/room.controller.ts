import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { RoomService } from '../services/room.service';
import { JwtStrategy } from '../../auth/jwt-strategy';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get(`/:code`)
  getRoom(@Param() code: { code: number }) {
    return this.roomService.getRoom(code.code);
  }

  @Post('create')
  async create(@Request() req) {
    return this.roomService.createRoom(req.user);
  }

  @Post('join/:code')
  async join(@Param() code: { code: number }, @Request() req) {
    return this.roomService.joinRoom(code.code, req.user);
  }

  @Post('leave/:code')
  async leave(@Param() code: { code: number }, @Request() req) {
    return this.roomService.leaveRoom(code.code, req.user);
  }
}
