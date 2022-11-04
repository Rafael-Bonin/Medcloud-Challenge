import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PatientDto } from './dto';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  constructor(private patientRepository: PatientRepository) {}

  async getAll() {
    const allPatients = await this.patientRepository.getAll();
    return allPatients;
  }

  async createPatient(data: PatientDto) {
    try {
      const { name, birth_date, email, address } = data;
      const patient = await this.patientRepository.createPatient(
        name,
        birth_date,
        email,
        address,
      );
      return patient;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Email already registered');
        }
      }
      throw e;
    }
  }

  async deletePatient(id: number) {
    const patient = await this.patientRepository.deletePatient(id);
    return patient;
  }

  async updatePatient(id: number, data: PatientDto) {
    const patient = await this.patientRepository.updatePatient(id, data);
    return patient;
  }
}
