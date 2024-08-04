/* eslint-disable prettier/prettier */
import { IsDateString, IsString, IsNumber } from "class-validator";

export class CreateStockDto {
  @IsString()
  readonly nom: string;

  @IsString()
  readonly type: string;

  @IsNumber({}, { message: 'Quantité doit être un nombre entier' })
  readonly quantite: number; // Utilisez number ici

  @IsNumber({}, { message: 'Prix d\'achat doit être un nombre décimal' })
  readonly prixAchat: number;

  @IsNumber({}, { message: 'Prix de vente doit être un nombre décimal' })
  readonly prixVente: number;

  @IsDateString()
  readonly dateExpiration: string;

  @IsNumber({}, { message: 'Marge doit être un nombre décimal' })
  readonly margin: number;
}
