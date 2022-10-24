import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from '../services/room.service';
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
