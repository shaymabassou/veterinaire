/* eslint-disable prettier/prettier */
import { Controller, Post, Put, Delete, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { CreateHistoriqueAnimalDto } from './dto/create-historique-animal.dto';
import { UpdateHistoriqueAnimalDto } from './dto/update-historique-animal.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/enum';

@Controller('animals')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Roles(Role.ADMIN)
  @Post()
  async createAnimal(@Request() req, @Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.createAnimal(createAnimalDto);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async updateAnimal(@Param('id') animalId: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalService.updateAnimal(animalId, updateAnimalDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteAnimal(@Param('id') animalId: string) {
    return this.animalService.deleteAnimal(animalId);
  }

  @Get(':id')
  async getAnimal(@Param('id') animalId: string) {
    return this.animalService.getAnimal(animalId);
  }

  @Get()
  async getAllAnimals() {
    return this.animalService.getAllAnimals();
  }

  @Get('client/:clientId')
  async getAnimalsByClientId(@Param('clientId') clientId: string) {
    return this.animalService.getAnimalsByClientId(clientId);
  }
  
  @Roles(Role.ADMIN)
  @Post(':id/historique')
  async addHistorique(@Param('id') animalId: string, @Body() createHistoriqueAnimalDto: CreateHistoriqueAnimalDto) {
    return this.animalService.addHistorique(animalId, createHistoriqueAnimalDto);
  }
  @Roles(Role.ADMIN)
  @Get(':animalId/historique/:historiqueId')
  async getHistoriqueById(
    @Param('animalId') animalId: string,
    @Param('historiqueId') historiqueId: string
  ) {
    return this.animalService.getHistoriqueById(historiqueId, animalId);
  }

  @Get(':id/historiques')
async getHistoriquesByAnimalId(@Param('id') animalId: string) {
  return this.animalService.getHistoriquesByAnimalId(animalId);
}

  

  @Roles(Role.ADMIN)
  @Put(':animalId/historique/:historiqueId')
  async updateHistorique(
    @Param('animalId') animalId: string,
    @Param('historiqueId') historiqueId: string,
    @Body() updateHistoriqueAnimalDto: UpdateHistoriqueAnimalDto,
  ) {
    return this.animalService.updateHistorique(historiqueId, updateHistoriqueAnimalDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':animalId/historique/:historiqueId')
  async deleteHistorique(@Param('animalId') animalId: string, @Param('historiqueId') historiqueId: string) {
    return this.animalService.deleteHistorique(historiqueId);
  }
}
