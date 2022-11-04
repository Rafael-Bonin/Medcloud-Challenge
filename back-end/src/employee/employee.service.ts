import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { EmployeeRepository } from './employee.repository';
import * as argon from 'argon2';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async createEmployee(data: AuthDto) {
    const hash = await argon.hash(data.password);
    data.password = hash;
    const findUser = await this.employeeRepository.getByEmail(data.email);
    if (findUser) throw new ConflictException('Email already registered');
    const user = await this.employeeRepository.createEmp(data);
    delete user.password;
    return user;
  }

  async getAll() {
    const allEmployees = await this.employeeRepository.getAll();
    return allEmployees;
  }

  async delete(id: number) {
    const findUser = await this.employeeRepository.getOne(id);
    if (!findUser) {
      throw new NotFoundException(`A user with the id ${id} was not found`);
    }
    const employee = await this.employeeRepository.delete(id);
    return employee;
  }
}
