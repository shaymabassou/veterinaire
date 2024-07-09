/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
 

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class HistoriqueClient extends Document {
  @Prop({ required: true })
  dateVisite: Date;

  @Prop({ required: true })
  description: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true })
  clientId: mongoose.Types.ObjectId;
}

export const HistoriqueClientSchema = SchemaFactory.createForClass(HistoriqueClient);
