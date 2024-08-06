/* eslint-disable prettier/prettier */
/* create-animal.dto.ts */
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
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

  @IsString()
  @IsNotEmpty()
  age: string;

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
