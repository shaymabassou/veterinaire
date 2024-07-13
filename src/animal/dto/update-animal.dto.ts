/* eslint-disable prettier/prettier */
/* update-animal.dto.ts */
import { IsEnum, IsString, IsNumber, IsOptional } from 'class-validator';
import { Sex } from '../sex.enum';
import { Espece } from '../espece.enum';
import { Race } from '../race.enum';

export class UpdateAnimalDto {
  @IsString()
  @IsOptional()
  numero_de_fiche?: string;

  @IsString()
  @IsOptional()
  nom_prioritaire?: string;

  @IsEnum(Espece)
  @IsOptional()
  espece?: Espece;

  @IsEnum(Race)
  @IsOptional()
  race?: Race;

  @IsNumber()
  @IsOptional()
  age?: number;

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
