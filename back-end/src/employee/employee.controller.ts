import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Employee } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EmployeeDto } from './dto';
import { EmployeeService } from './employee.service';

@UseGuards(JwtGuard)
@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() data: EmployeeDto, @GetUser() user: Employee) {
    const me = await this.getMe(user);
    if (me.role !== 'admin') throw new UnauthorizedException();
    const employee = await this.employeeService.createEmployee(data);
    return employee;
  }

  @Get('me')
  async getMe(@GetUser() user: Employee) {
    return user;
  }

  @Get('all')
  async getAll() {
    const allEmployees = await this.employeeService.getAll();
    return allEmployees;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const employee = await this.employeeService.delete(id);
    return employee;
  }
}
