/* eslint-disable prettier/prettier */
import { IsDate, IsString } from 'class-validator';

export class CreateHistoriqueAnimalDto {
  @IsDate()
  dateVisite: Date;

  @IsString()
  description: string;
}
