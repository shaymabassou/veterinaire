/* eslint-disable prettier/prettier */
/* create-animal.dto.ts */
import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Sex } from '../sex.enum';
// import { Espece } from '../espece.enum';
// import { Race } from '../race.enum';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  numero_de_fiche: string;

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  espece: string;

  @IsString()
  @IsNotEmpty()
  race: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsEnum(Sex)
  @IsNotEmpty()
  sex: Sex;

  @IsString()
  @IsNotEmpty()
  identification: string;

  @IsString()
  @IsNotEmpty()
  clientId: string; // Assuming this is a string representation of the ObjectId
}
