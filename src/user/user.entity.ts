/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { HistoriqueClient, HistoriqueClientSchema } from './historique-client.entity';

@Schema({ 
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
  discriminatorKey: 'role' 
})
export class User extends Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ 
    required: true, 
    default: 'admin',  
    enum: ['admin', 'client'],
    type: String
  })
  role: string;

  @Prop({ type: Date, default: null })
  deleted_at: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Client extends User {

  @Prop({ required: true, unique: true })
  CIN: string;

  @Prop({ required: true })
  tel: string;

  @Prop({ required: true })
  adresse: string;

  @Prop({ required: true })
  dateNaissance: Date;

  // @Prop({ required: true })
  // animalid: string;

  @Prop({
    default: 'client',
    enum: ['admin', 'client'],
    type: String
  })
  role: string;


}

export const ClientSchema = SchemaFactory.createForClass(Client);
