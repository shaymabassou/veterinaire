/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ordonnance, OrdonnanceSchema } from './ordonnance.entity';
import { Animal, AnimalSchema } from '../animal/animal.entity';
import { UserModule } from 'src/user/user.module';
import { Medicament, MedicamentSchema } from 'src/stock/medicament.entity';
import { OrdonnanceService } from './ordonance.service';
import { OrdonnanceController } from './ordonance.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ordonnance.name, schema: OrdonnanceSchema }]),
    MongooseModule.forFeature([{ name: Medicament.name, schema: MedicamentSchema }]),
    MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [OrdonnanceService],
  controllers: [OrdonnanceController],
  exports: [OrdonnanceService],
})
export class OrdonnanceModule {}
