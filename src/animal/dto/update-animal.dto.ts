/* eslint-disable prettier/prettier */
/* update-animal.dto.ts */
import { IsEnum, IsString, IsOptional } from 'class-validator';
import { Sex } from '../sex.enum';
// import { Espece } from '../espece.enum';
// import { Race } from '../race.enum';

export class UpdateAnimalDto {
  @IsString()
  @IsOptional()
  numero_de_fiche?: string;

  @IsString()
  @IsOptional()
  nom?: string;

  @IsString()
  @IsOptional()
  espece?: string;

  @IsString()
  @IsOptional()
  race?: string;

  @IsString()
  @IsOptional()
  age?: string;

  @IsEnum(Sex)
  @IsOptional()
  sex?: Sex;

  @IsString()
  @IsOptional()
  identification?: string;

  @IsString()
  @IsOptional()
  clientId?: string; // Assuming this is a string representation of the ObjectId
}
