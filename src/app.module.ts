/* eslint-disable prettier/prettier */
// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StockModule } from './stock/stock.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AnimalModule } from './animal/animal.module';
import { OrdonnanceModule } from './ordonance/ordonance.module';
// import { FacturationService } from './facturation/facturation.service';
// import { FacturationController } from './facturation/facturation.controller';
import { FacturationModule } from './facturation/facturation.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/veterinaire'),
    UserModule,
    AuthModule,
    StockModule,
    AnimalModule,
    OrdonnanceModule,
    FacturationModule,
  ],
  // providers: [FacturationService],
  // controllers: [FacturationController],
})
export class AppModule {}
