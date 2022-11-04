import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeDto } from './dto';
import { IEmployee } from './interfaces';

@Injectable()
export class EmployeeRepository {
  constructor(private prisma: PrismaService) {}
  async getMe(email: string): Promise<Employee> {
    const user = await this.prisma.employee.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  async createEmp(data: EmployeeDto): Promise<Employee> {
    const user = await this.prisma.employee.create({
      data: { ...data },
    });
    return user;
  }

  async getAll(): Promise<IEmployee[]> {
    const allEmployees = await this.prisma.employee.findMany({
      select: { id: true, email: true, name: true },
    });
    return allEmployees;
  }

  async getByEmail(email: string): Promise<Employee> {
    const employee = await this.prisma.employee.findFirst({ where: { email } });
    return employee;
  }

  async getOne(id: number): Promise<Employee> {
    const employee = await this.prisma.employee.findFirst({ where: { id } });
    return employee;
  }

  async delete(id: number): Promise<Employee> {
    const employee = await this.prisma.employee.delete({ where: { id } });
    delete employee.password
    return employee;
  }
}
