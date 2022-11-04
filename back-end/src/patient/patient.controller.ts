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
import { JwtGuard } from 'src/auth/guard';
import { PatientDto, updatePatientDto } from './dto';
import { PatientService } from './patient.service';

@UseGuards(JwtGuard)
@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Get()
  async getAll() {
    const allPatients = await this.patientService.getAll();
    return allPatients;
  }

  @Post()
  async createPatient(@Body() data: PatientDto) {
    const patient = this.patientService.createPatient(data);
    return patient;
  }

  @Delete(':id')
  async deletePatient(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientService.deletePatient(id);
    return patient;
  }

  @Patch(':id')
  async updatePatient(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updatePatientDto,
  ) {
    const patient = await this.patientService.updatePatient(id, data);
    return patient;
  }
}
