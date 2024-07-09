/* eslint-disable prettier/prettier */
/* animal.entity.ts */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Animal extends Document {

  @Prop({ required: true })
  race: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  sex: string;

  @Prop({ required: true })
  identifier: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true })
  clientId: mongoose.Types.ObjectId; // Référence vers l'ID du client

  // D'autres champs et méthodes peuvent être ajoutés selon vos besoins
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
