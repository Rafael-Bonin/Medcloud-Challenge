import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Patient } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { PatientDto, updatePatientDto } from './dto';
import { PatientService } from './patient.service';

@UseGuards(JwtGuard)
@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Get()
  async getAll(): Promise<Patient[]> {
    const allPatients = await this.patientService.getAll();
    return allPatients;
  }

  @Post()
  async createPatient(@Body() data: PatientDto): Promise<Patient> {
    const patient = this.patientService.createPatient(data);
    return patient;
  }

  @Delete(':id')
  async deletePatient(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    const patient = await this.patientService.deletePatient(id);
    return patient;
  }

  @Patch(':id')
  async updatePatient(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updatePatientDto,
  ): Promise<Patient> {
    const patient = await this.patientService.updatePatient(id, data);
    return patient;
  }
}
