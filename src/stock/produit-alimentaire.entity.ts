/* eslint-disable prettier/prettier */
// produit-alimentaire.entity.ts
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Stock } from './stock.entity';
// import { ProduitAlimentaireType } from './produit-alimentaire-type.enum';
// import { ProduitAlimentaireNom } from './produit-alimentaire-nom.enum';

@Schema()
export class ProduitAlimentaire extends Stock {
//   @Prop({ required: true, enum: ProduitAlimentaireType })
//   type: ProduitAlimentaireType;

//   @Prop({ required: true, enum: ProduitAlimentaireNom })
//   nom: ProduitAlimentaireNom;
 }

export const ProduitAlimentaireSchema = SchemaFactory.createForClass(ProduitAlimentaire);
