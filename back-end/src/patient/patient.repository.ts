import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { updatePatientDto } from './dto';

@Injectable()
export class PatientRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Patient[]> {
    const allPatients = await this.prisma.patient.findMany();
    return allPatients;
  }

  async createPatient(
    name: string,
    birth_date: Date,
    email: string,
    address: string,
  ): Promise<Patient> {
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

  async deletePatient(id: number): Promise<Patient> {
    const patient = await this.prisma.patient.delete({ where: { id } });
    return patient;
  }

  async updatePatient(id: number, data: updatePatientDto): Promise<Patient> {
    const patient = await this.prisma.patient.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return patient;
  }
}
