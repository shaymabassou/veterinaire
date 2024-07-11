/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Stock extends Document {
 
  @Prop({ required: true })
  nom: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  quantite: string;

  @Prop({ required: true })
  prixAchat: number;

  @Prop({ required: true })
  dateExpiration: Date;

  @Prop({ required: true })
  prixVente: number;
}

export const StockSchema = SchemaFactory.createForClass(Stock);