import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { updatePatientDto } from './dto';

@Injectable()
export class PatientRepository {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const allPatients = await this.prisma.patient.findMany();
    return allPatients;
  }

  async createPatient(
    name: string,
    birth_date: Date,
    email: string,
    address: string,
  ) {
    const patient = await this.prisma.patient.create({
      data: {
        name,
        birth_date,
        email,
        address,
      },
    });
    return patient;
  }

  async deletePatient(id: number) {
    const patient = await this.prisma.patient.delete({ where: { id } });
    return patient;
  }

  async updatePatient(id: number, data: updatePatientDto) {
    const patient = await this.prisma.patient.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return patient;
  }
}
