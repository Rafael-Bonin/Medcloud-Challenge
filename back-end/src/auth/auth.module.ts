import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeModule } from 'src/employee/employee.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({}), EmployeeModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
