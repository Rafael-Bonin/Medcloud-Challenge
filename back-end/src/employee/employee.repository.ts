import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeDto } from './dto';

@Injectable()
export class EmployeeRepository {
  constructor(private prisma: PrismaService) {}
  async getMe(email: string) {
    const user = await this.prisma.employee.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  async createEmp(data: EmployeeDto) {
    const user = await this.prisma.employee.create({
      data: { ...data },
    });
    return user;
  }

  async getAll() {
    const allEmployees = await this.prisma.employee.findMany({
      select: { id: true, email: true, name: true },
    });
    return allEmployees;
  }

  async getByEmail(email: string) {
    const employee = await this.prisma.employee.findFirst({ where: { email } });
    return employee;
  }

  async getOne(id: number) {
    const employee = await this.prisma.employee.findFirst({ where: { id } });
    return employee;
  }

  async delete(id: number) {
    const employee = await this.prisma.employee.delete({ where: { id } });
    return employee;
  }
}
