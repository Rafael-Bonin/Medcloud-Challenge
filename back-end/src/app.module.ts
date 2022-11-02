import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { PatientModule } from './patient/patient.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, PatientModule, EmployeeModule, PrismaModule],
})
export class AppModule {}
