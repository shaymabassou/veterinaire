/* eslint-disable prettier/prettier */
// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StockModule } from './stock/stock.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AnimalModule } from './animal/animal.module';
import { OrdonnanceModule } from './ordonance/ordonance.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/veterinaire'),
    UserModule,
    AuthModule,
    StockModule,
    AnimalModule,
    OrdonnanceModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
