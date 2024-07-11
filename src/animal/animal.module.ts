/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { Animal, AnimalSchema } from './animal.entity';
import { HistoriqueAnimal, HistoriqueAnimalSchema } from './historique-animal.entity';
import { UserModule } from '../user/user.module'; // Importez UserModule pour gérer les dépendances avec les utilisateurs
import { Client, ClientSchema } from 'src/user/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Animal.name, schema: AnimalSchema },
      { name: HistoriqueAnimal.name, schema: HistoriqueAnimalSchema },
      { name: Client.name, schema: ClientSchema }
    ]),
    UserModule, // Assurez-vous que UserModule est importé pour les vérifications de rôle
  ],
  controllers: [AnimalController],
  providers: [AnimalService],
  exports: [AnimalService], // Exportez AnimalService si nécessaire dans d'autres modules
})
export class AnimalModule {}
