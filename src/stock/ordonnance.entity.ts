/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Medicament } from './medicament.entity';
import * as mongoose from 'mongoose';

@Schema()
export class Ordonnance extends Document {
  @Prop({ required: true })
  dosage: string;

  @Prop({ required: true })
  nombreDeFoisParJour: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Medicament', required: true })
  medicament: Medicament;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true })
  animalId: mongoose.Types.ObjectId;
}

export const OrdonnanceSchema = SchemaFactory.createForClass(Ordonnance);
