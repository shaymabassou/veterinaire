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

@Prop({  type: String })
nom_medecin: string;

@Prop({ required: true })
date: Date;

@Prop({  type: String })
adresse_medecin: string;

@Prop({  type: Number })
facture_n: number;

@Prop({  type: Number })
tel: number;

// Ajout du champ `status` pour indiquer si la facturation est payée ou impayée
@Prop({ type: String, enum: ['impayée', 'payée'], default: 'impayée' })
status: string;

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true })
clientId: mongoose.Types.ObjectId;

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Medicament' })
medicamentId?: mongoose.Types.ObjectId;

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProduitAlimentaire' })
produitalimentaireId?: mongoose.Types.ObjectId;


@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MaterielConsommable' })
materielconsommableId?: mongoose.Types.ObjectId;
}

  

export const FacturationSchema = SchemaFactory.createForClass(Facturation);



