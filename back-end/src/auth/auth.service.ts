import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, AuthLoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(data: AuthLoginDto) {
    try {
      const user = await this.prisma.employee.findFirst({
        where: {
          email: data.email,
        },
      });
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
      const user = await this.prisma.employee.create({
        data: {
          email: data.email,
          name: data.name,
          password: hash,
        },
      });
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
