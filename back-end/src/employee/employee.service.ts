import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { EmployeeRepository } from './employee.repository';
import * as argon from 'argon2';
import { Employee } from '@prisma/client';
import { IEmployee } from './interfaces';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async createEmployee(data: AuthDto): Promise<Employee> {
    const hash = await argon.hash(data.password);
    data.password = hash;
    const findUser = await this.employeeRepository.getByEmail(data.email);
    if (findUser) throw new ConflictException('Email already registered');
    const user = await this.employeeRepository.createEmp(data);
    delete user.password;
    return user;
  }

  async getAll(): Promise<IEmployee[]> {
    const allEmployees = await this.employeeRepository.getAll();
    return allEmployees;
  }

  async delete(id: number): Promise<Employee> {
    const findUser = await this.employeeRepository.getOne(id);
    if (!findUser) {
      throw new NotFoundException(`A user with the id ${id} was not found`);
    }
    const employee = await this.employeeRepository.delete(id);
    return employee;
  }
}
