import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async createEmp(email: string, name: string, password: string) {
    const user = await this.prisma.employee.create({
      data: {
        email,
        name,
        password,
      },
    });
    return user;
  }
}
