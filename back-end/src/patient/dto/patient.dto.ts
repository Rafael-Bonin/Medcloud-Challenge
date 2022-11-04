import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birth_date: Date;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
