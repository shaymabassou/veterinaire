/* eslint-disable prettier/prettier */
// src/stock/stock.controller.ts
import { Controller, Post, Body, UseGuards, Put, Param, Delete, Get} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateMedicamentDto } from './dto/create-medicament.dto';
import { CreateMaterielConsommableDto } from './dto/create-materiel-consommable.dto';
import { CreateProduitAlimentaireDto } from './dto/create-produit-alimentaire.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/enum';

@Controller('stock')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Roles(Role.ADMIN)
  @Post('medicament')
  async createMedicament(@Body() createMedicamentDto: CreateMedicamentDto) {
    return this.stockService.createMedicament(createMedicamentDto);
  }

  @Roles(Role.ADMIN)
  @Post('materiel-consommable')
  async createMaterielConsommable(@Body() createMaterielConsommableDto: CreateMaterielConsommableDto) {
    return this.stockService.createMaterielConsommable(createMaterielConsommableDto);
  }

  @Roles(Role.ADMIN)
  @Post('produit-alimentaire')
  async createProduitAlimentaire(@Body() createProduitAlimentaireDto: CreateProduitAlimentaireDto) {
    return this.stockService.createProduitAlimentaire(createProduitAlimentaireDto);
  }

   @Roles(Role.ADMIN)
  @Get('medicament/:id')
  async getMedicament(@Param('id') id: string) {
    return this.stockService.getMedicamentById(id);
  }

  @Roles(Role.ADMIN)
  @Put('medicament/:id')
  async updateMedicament(@Param('id') id: string, @Body() createMedicamentDto: CreateMedicamentDto) {
    return this.stockService.updateMedicament(id, createMedicamentDto);
  }

  @Get('materiel-consommable')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getAllMaterielConsommable() {
    return this.stockService.getAllMaterielConsommable();
  }

  @Get('medicaments')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getAllMedicaments() {
    return this.stockService.getAllMedicaments();
  }


  @Get('produit-alimentaires')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getAllProduitAlimentaires() {
    return this.stockService.getAllProduitAlimentaires();
  }



  @Roles(Role.ADMIN)
  @Delete('medicament/:id')
  async deleteMedicament(@Param('id') id: string) {
    return this.stockService.deleteMedicament(id);
  }

  @Get('materiel-consommable/:id')
  async getMaterielConsommable(@Param('id') id: string) {
    return this.stockService.getMaterielConsommableById(id);
  }

  @Roles(Role.ADMIN)
  @Put('materiel-consommable/:id')
  async updateMaterielConsommable(@Param('id') id: string, @Body() createMaterielConsommableDto: CreateMaterielConsommableDto) {
    return this.stockService.updateMaterielConsommable(id, createMaterielConsommableDto);
  }

  @Roles(Role.ADMIN)
  @Delete('materiel-consommable/:id')
  async deleteMaterielConsommable(@Param('id') id: string) {
    return this.stockService.deleteMaterielConsommable(id);
  }

  @Get('produit-alimentaire/:id')
  async getProduitAlimentaire(@Param('id') id: string) {
    return this.stockService.getProduitAlimentaireById(id);
  }

  @Roles(Role.ADMIN)
  @Put('produit-alimentaire/:id')
  async updateProduitAlimentaire(@Param('id') id: string, @Body() createProduitAlimentaireDto: CreateProduitAlimentaireDto) {
    return this.stockService.updateProduitAlimentaire(id, createProduitAlimentaireDto);
  }

  @Roles(Role.ADMIN)
  @Delete('produit-alimentaire/:id')
  async deleteProduitAlimentaire(@Param('id') id: string) {
    return this.stockService.deleteProduitAlimentaire(id);
  }

  
}
