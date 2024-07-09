/* eslint-disable prettier/prettier */
export class CreateStockDto {
    nom: string;
    description?: string;
    quantite: string;
    prixAchat: number;
    dateExpiration: Date;
    prixVente: number;
  }