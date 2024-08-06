/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Facturation extends Document {
  

@Prop({ required: true, type: Number })
prixConsultation: number;

@Prop({  type: Number })
prixGlobale: number;

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Medicament', required: true })
medicamentId: mongoose.Types.ObjectId;

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProduitAlimentaire', required: true })
produitalimentaireId: mongoose.Types.ObjectId;


@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MaterielConsommable', required: true })
materielconsommableId: mongoose.Types.ObjectId;
}

export const FacturationSchema = SchemaFactory.createForClass(Facturation);



