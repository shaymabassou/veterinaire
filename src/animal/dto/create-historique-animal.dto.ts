/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateHistoriqueAnimalDto {
  @IsDate()
  dateVisite: Date;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  animalId: string;
}
