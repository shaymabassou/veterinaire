/* eslint-disable prettier/prettier */
// create-produit-alimentaire.dto.ts
// import { IsEnum, IsNotEmpty } from 'class-validator';
import { CreateStockDto } from './create-stock.dto';
// import { ProduitAlimentaireType } from '../produit-alimentaire-type.enum';
// import { ProduitAlimentaireNom } from '../produit-alimentaire-nom.enum';


export class CreateProduitAlimentaireDto extends CreateStockDto {
  // @IsEnum(ProduitAlimentaireType)
  // @IsNotEmpty()
  // type: ProduitAlimentaireType;

  // @IsEnum(ProduitAlimentaireNom)
  // @IsNotEmpty()
  // nom: ProduitAlimentaireNom;
}
