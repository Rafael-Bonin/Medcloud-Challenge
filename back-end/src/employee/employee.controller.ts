import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('employees')
export class EmployeeController {
  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@GetUser() user: Employee) {
    return user;
  }
}
