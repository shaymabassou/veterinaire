/* eslint-disable prettier/prettier */
import { IsString, IsInt,  IsOptional } from 'class-validator';

export class UpdateAnimalDto {
  @IsString()
  @IsOptional()
  race?: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  sex?: string;

  @IsString()
  @IsOptional()
  identifier?: string;

  @IsString()
  @IsOptional()
  clientId?: string; // Vous pouvez aussi décider de rendre ce champ non modifiable si besoin
}
