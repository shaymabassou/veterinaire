/* eslint-disable prettier/prettier */
import { SchemaFactory } from '@nestjs/mongoose';
import { Stock } from './stock.entity';

export class ProduitAlimentaire extends Stock {}

export const ProduitAlimentaireSchema = SchemaFactory.createForClass(ProduitAlimentaire);