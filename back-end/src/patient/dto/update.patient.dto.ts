import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class updatePatientDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birth_date: Date;

  @IsString()
  @IsOptional()
  address: string;
}
