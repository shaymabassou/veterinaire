/* eslint-disable prettier/prettier */
// medicament.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Stock } from './stock.entity';
import * as mongoose from 'mongoose';
import { Ordonnance } from 'src/ordonance/ordonnance.entity';


@Schema()
export class Medicament extends Stock {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ordonnance' }] })
  ordonnances: Ordonnance[];
}

export const MedicamentSchema = SchemaFactory.createForClass(Medicament);
