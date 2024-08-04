/* eslint-disable prettier/prettier */
// medicament.entity.ts
import {  Schema, SchemaFactory } from '@nestjs/mongoose';
import { Stock } from './stock.entity';
// import * as mongoose from 'mongoose';
// import { Ordonnance } from 'src/ordonance/ordonnance.entity';
// import { MedicamentType } from './medicament-type.enum';
// import { MedicamentName } from './medicament-name.enum';

@Schema()
export class Medicament extends Stock {
  // @Prop({ required: true, enum: MedicamentType })
  // type: MedicamentType;

  // @Prop({ required: true, enum: MedicamentName })
  // nom: MedicamentName;

//   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ordonnance' }] })
//   ordonnances: Ordonnance[];
 }

export const MedicamentSchema = SchemaFactory.createForClass(Medicament);
