/* eslint-disable prettier/prettier */
// src/user/dto/update-client.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateClientDto {
  // @IsNotEmpty()
  // @IsString()
  // readonly CIN: string;

  @IsNotEmpty()
  @IsNumber()
  readonly tel: number;

  @IsNotEmpty()
  @IsString()
  readonly adresse: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  // @IsNotEmpty()
  // @IsDateString()
  // readonly dateNaissance: Date;

  @IsNotEmpty()
  @IsString()
  readonly animalid: string;
}
