/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class HistoriqueAnimal extends Document {
  @Prop({ required: true })
  dateVisite: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true })
  animalId: mongoose.Types.ObjectId;
}

export const HistoriqueAnimalSchema = SchemaFactory.createForClass(HistoriqueAnimal);