/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFacturationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  prixConsultation: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  prixGlobale?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  medicamentId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  produitalimentaireId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  materielconsommableId: string;
}
