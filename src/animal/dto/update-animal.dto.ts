/* eslint-disable prettier/prettier */
/* update-animal.dto.ts */
import { IsEnum,  IsString, IsNumber, IsOptional } from 'class-validator';
import { Sex } from '../sex.enum';

export class UpdateAnimalDto {
  @IsString()
  @IsOptional()
  race?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  type?: string;

  @IsEnum(Sex)
  @IsOptional()
  sex?: Sex;

  @IsString()
  @IsOptional()
  identifier?: string;

  @IsString()
  @IsOptional()
  clientId?: string;
}
