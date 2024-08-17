/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Put, Param, Delete, Get, Patch } from '@nestjs/common';
import { FacturationService } from './facturation.service';
import { CreateFacturationDto } from './dto/CreateFacturation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/enum';
// import { Facturation } from './facturation.entity';

@Controller('facturation')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FacturationController {
  constructor(private readonly facturationService: FacturationService) {}

  @Roles(Role.ADMIN)
  @Post()
  async createFacturation(@Body() createFacturationDto: CreateFacturationDto) {
    return this.facturationService.createFacturation(createFacturationDto);
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async getFacturation(@Param('id') id: string) {
    return this.facturationService.getFacturationById(id);
  }

  @Roles(Role.ADMIN)
  @Get()
  async getAllFacturations() {
    return this.facturationService.getAllFacturations();
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async updateFacturation(@Param('id') id: string, @Body() createFacturationDto: CreateFacturationDto) {
    return this.facturationService.updateFacturation(id, createFacturationDto);
  }
  
  @Roles(Role.ADMIN)
  @Patch(':id/pay')
  async payFacturation(@Param('id') id: string) {
    return this.facturationService.updateStatus(id, 'payée');
  }
  

  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteFacturation(@Param('id') id: string) {
    return this.facturationService.deleteFacturation(id);
  }
}
