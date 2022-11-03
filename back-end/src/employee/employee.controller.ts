import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('employees')
export class EmployeeController {
  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    return req.user
  }
}
