/* eslint-disable prettier/prettier */
/* animal.entity.ts */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,  Types } from 'mongoose';
import { Sex } from './sex.enum';
import { Client } from 'src/user/user.entity';
// import { Espece } from './espece.enum';
// import { Race } from './race.enum';

@Schema()
export class Animal extends Document {
  @Prop({ required: true })
  numero_de_fiche: string;

  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  espece: string;

  @Prop({ required: true })
  race: string;

  @Prop({ required: true })
  age: string;

  @Prop({ required: true, enum: Object.values(Sex) })
  sex: Sex;

  @Prop({ required: true })
  identification: string;

  @Prop({ type: Types.ObjectId, ref: Client.name, required: true })
  clientId: Types.ObjectId;
}

  // D'autres champs et méthodes peuvent être ajoutés selon vos besoins


export const AnimalSchema = SchemaFactory.createForClass(Animal);
