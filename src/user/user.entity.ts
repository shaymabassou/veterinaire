/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
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

  @Prop({ required: false})
  password?: string;

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

  @Prop({ required: true })
  tel: number;

  @Prop({ required: true })
  adresse: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Animal' }])
  animals: MongooseSchema.Types.ObjectId[];

  @Prop({
    default: 'client',
    enum: ['admin', 'client'],
    type: String
  })
  role: string;


}

export const ClientSchema = SchemaFactory.createForClass(Client);
