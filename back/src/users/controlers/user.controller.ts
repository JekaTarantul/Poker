import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common";
import { User } from "../../auth/entities/user.entity";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('api/v1/user')
export class UserController {
  @Get('')
  async getUser(@Request() req) {
    console.log(req.user)
    return req.user;
  }
}
