/* eslint-disable prettier/prettier */
/* animal.entity.ts */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Sex } from './sex.enum';
// import { Espece } from './espece.enum';
// import { Race } from './race.enum';

@Schema()
export class Animal extends Document {
  @Prop({ required: true })
  numero_de_fiche: string;

  @Prop({ required: true })
  nom_prioritaire: string;

  @Prop({ required: true })
  espece: string;

  @Prop({ required: true })
  race: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, enum: Sex })
  sex: Sex;

  @Prop({ required: true })
  identification: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true })
  clientId: mongoose.Types.ObjectId; // Référence vers l'ID du client

  // D'autres champs et méthodes peuvent être ajoutés selon vos besoins
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
