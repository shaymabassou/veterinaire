/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { Animal, AnimalSchema } from './animal.entity';
import { UserModule } from '../user/user.module'; // Importez UserModule pour gérer les dépendances avec les utilisateurs

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
    UserModule, // Assurez-vous que UserModule est importé pour les vérifications de rôle
  ],
  controllers: [AnimalController],
  providers: [AnimalService],
  exports: [AnimalService], // Exportez AnimalService si nécessaire dans d'autres modules
})
export class AnimalModule {}
