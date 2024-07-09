/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsInt, IsMongoId } from 'class-validator';

export class CreateAnimalDto {

  @IsString()
  @IsNotEmpty()
  race: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  sex: string;

  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsMongoId()
  @IsString()
  clientId: string; // Assurez-vous que clientId est une chaîne, car c'est l'identifiant de l'utilisateur
}
