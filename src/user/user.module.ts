/* eslint-disable prettier/prettier */
/* user.module.ts */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Client, ClientSchema, User, UserSchema } from './user.entity';
import { HistoriqueClient, HistoriqueClientSchema } from './historique-client.entity';
import { AuthModule } from '../auth/auth.module';
import { Animal, AnimalSchema } from 'src/animal/animal.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Client.name, schema: ClientSchema },
      { name: HistoriqueClient.name, schema: HistoriqueClientSchema },
      { name: Animal.name, schema: AnimalSchema },
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
