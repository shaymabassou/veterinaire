/* eslint-disable prettier/prettier */
// create-client.dto.ts
import { IsNotEmpty, IsString, IsEmail,IsArray, IsNumber } from 'class-validator';
import { Animal } from 'src/animal/animal.entity';


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
  @IsNumber()
  tel: number;

  @IsNotEmpty()
  @IsString()
  adresse: string;

  @IsArray()
  @IsNotEmpty()
  animals: Animal[];
}
