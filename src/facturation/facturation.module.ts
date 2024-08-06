/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacturationService } from './facturation.service';
import { FacturationController } from './facturation.controller';
import { Facturation, FacturationSchema } from './facturation.entity';
import { ProduitAlimentaire, ProduitAlimentaireSchema } from 'src/stock/produit-alimentaire.entity';
import { Medicament, MedicamentSchema } from 'src/stock/medicament.entity';
import { MaterielConsommable, MaterielConsommableSchema } from 'src/stock/materiel-consommable.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Facturation.name, schema: FacturationSchema }]),
    MongooseModule.forFeature([{ name: Medicament.name, schema: MedicamentSchema }]),
    MongooseModule.forFeature([{ name: ProduitAlimentaire.name, schema: ProduitAlimentaireSchema }]),
    MongooseModule.forFeature([{ name: MaterielConsommable.name, schema: MaterielConsommableSchema }]),
    UserModule,
  ],
  providers: [FacturationService],
  controllers: [FacturationController],
  exports: [FacturationService],
})
export class FacturationModule {}
