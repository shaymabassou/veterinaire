/* eslint-disable prettier/prettier */
/* create-animal.dto.ts */
import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Sex } from '../sex.enum';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  race: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsEnum(Sex)
  @IsNotEmpty()
  sex: Sex;

  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;
}
