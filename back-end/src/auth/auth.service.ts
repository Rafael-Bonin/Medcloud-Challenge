import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, AuthLoginDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(data: AuthLoginDto) {
    try {
      const user = await this.prisma.employee.findFirst({
        where: {
          email: data.email
        }
      })
      if (!user) throw new ForbiddenException('Email or password incorrect');
      const hash = await argon.verify(user.password, data.password)
      if (!hash) throw new ForbiddenException('Email or password incorrect');

      delete user.password

      return user
    } catch(e) {
      throw e
    }
  }

  async signup(data: AuthDto) {
    try {
      const hash = await argon.hash(data.password);
      const user = await this.prisma.employee.create({
        data: {
          email: data.email,
          name: data.name,
          password: hash
        },
      });
  
      delete user.password
  
      return user
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Email already registered')
        }
      }
      throw e;
    }
  }
}
