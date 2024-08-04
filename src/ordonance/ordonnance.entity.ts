/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import * as mongoose from 'mongoose';
// import { Medicament } from 'src/stock/medicament.entity';

@Schema()
export class Ordonnance extends Document {
  @Prop({ required: true })
  dosage: string;

  @Prop({ required: true })
  nombreDeFoisParJour: number;

  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  type: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Medicament', required: true })
  // medicament: Medicament;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true })
  animalId: mongoose.Types.ObjectId;
}

export const OrdonnanceSchema = SchemaFactory.createForClass(Ordonnance);
