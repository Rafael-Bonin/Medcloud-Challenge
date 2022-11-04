import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, AuthLoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmployeeRepository } from 'src/employee/employee.repository';

@Injectable()
export class AuthService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(data: AuthLoginDto) {
    try {
      const user = await this.employeeRepository.getMe(data.email);
      if (!user) throw new ForbiddenException('Email or password incorrect');
      const hash = await argon.verify(user.password, data.password);
      if (!hash) throw new ForbiddenException('Email or password incorrect');

      return this.signToken(user.id, user.email, user.name);
    } catch (e) {
      throw e;
    }
  }

  async signup(data: AuthDto) {
    try {
      const hash = await argon.hash(data.password);
      data.password = hash;
      const user = await this.employeeRepository.createEmp({ ...data });
      return this.signToken(user.id, user.email, user.name);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Email already registered');
        }
      }
      throw e;
    }
  }

  async signToken(
    userId: number,
    email: string,
    name: string,
  ): Promise<{ token: string }> {
    const data = {
      sub: userId,
      email,
      name,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(data, {
      expiresIn: '1d',
      secret,
    });
    return { token };
  }
}
