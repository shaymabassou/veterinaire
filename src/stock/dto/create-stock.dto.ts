/* eslint-disable prettier/prettier */
import { IsDateString, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateStockDto {
  @IsString()
  readonly nom: string;

  @IsString()
  readonly type: string;

  @IsString()
  readonly quantite: string;

  @IsString()
  readonly prixAchat: string;

  @IsDateString()
  readonly dateExpiration: string;

  @IsString()
  readonly prixVente: number;

 
}