/* eslint-disable prettier/prettier */
// src/stock/stock.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Medicament, MedicamentSchema } from './medicament.entity';
import { MaterielConsommable, MaterielConsommableSchema } from './materiel-consommable.entity';
import { ProduitAlimentaire, ProduitAlimentaireSchema } from './produit-alimentaire.entity';
// import { Ordonnance, OrdonnanceSchema } from './ordonnance.entity'; // Import du modèle Ordonnance
import { UserModule } from '../user/user.module'; 
import { AnimalModule } from 'src/animal/animal.module';
import { Animal, AnimalSchema } from 'src/animal/animal.entity';
// Import du UserModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Medicament.name, schema: MedicamentSchema }]),
    MongooseModule.forFeature([{ name: MaterielConsommable.name, schema: MaterielConsommableSchema }]),
    MongooseModule.forFeature([{ name: ProduitAlimentaire.name, schema: ProduitAlimentaireSchema }]),
    // MongooseModule.forFeature([{ name: Ordonnance.name, schema: OrdonnanceSchema }]),
    MongooseModule.forFeature([ { name: Animal.name, schema: AnimalSchema }]), // Ajout du modèle Ordonnance
    forwardRef(() => UserModule),
    AnimalModule, // Importez UserModule
  ],
  providers: [StockService],
  controllers: [StockController],
  exports: [StockService], // Exporter StockService si nécessaire
})
export class StockModule {}
