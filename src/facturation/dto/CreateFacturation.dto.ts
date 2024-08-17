/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsMongoId, IsString, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFacturationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  prixConsultation: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  facture_n?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nom_medecin?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  adresse_medecin?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  prixGlobale?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
   date?: string;

@ApiProperty()
@IsNotEmpty()
@IsMongoId()
clientId?: string;

@ApiProperty()
  @IsOptional()
  @IsMongoId()
  medicamentId?: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
 status?: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  produitalimentaireId?: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  materielconsommableId?: string;
}
