/* eslint-disable prettier/prettier */

import { IsString, IsInt, IsMongoId } from 'class-validator';

export class CreateOrdonnanceDto {
  // @IsMongoId()
  // medicamentId: string;
  @IsString()
  nom: string;

  @IsString()
  type: string;
 
 
  @IsString()
  dosage: string;

  @IsInt()
  nombreDeFoisParJour: number;

  @IsMongoId()
  animalId: string;
}
