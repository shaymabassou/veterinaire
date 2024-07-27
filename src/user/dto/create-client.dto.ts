/* eslint-disable prettier/prettier */
// create-client.dto.ts
import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsString()
  CIN: string;

  @IsNotEmpty()
  @IsString()
  tel: string;

  @IsNotEmpty()
  @IsString()
  adresse: string;

  @IsNotEmpty()
  @IsDate()
  dateNaissance: Date;

  // @IsNotEmpty()
  // @IsString()
  // animalid: string;
}
