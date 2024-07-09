/* eslint-disable prettier/prettier */
import { SchemaFactory } from '@nestjs/mongoose';
import { Stock } from './stock.entity';

export class MaterielConsommable extends Stock {}

export const MaterielConsommableSchema = SchemaFactory.createForClass(MaterielConsommable);