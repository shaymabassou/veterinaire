/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateOrdonnanceDto } from './dto/create-ordonnance.dto';
// import { OrdonnanceService } from './ordonnance.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/enum';
import { OrdonnanceService } from './ordonance.service';

@Controller('ordonnance')
export class OrdonnanceController {
  constructor(private readonly ordonnanceService: OrdonnanceService) {}

  @Roles(Role.ADMIN)
  @Post()
  async createOrdonnance(@Body() createOrdonnanceDto: CreateOrdonnanceDto) {
    try {
      return await this.ordonnanceService.createOrdonnance(createOrdonnanceDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Roles(Role.ADMIN)
  @Get()
  async getAllOrdonnances() {
    return await this.ordonnanceService.getAllOrdonnances();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async getOrdonnance(@Param('id') id: string) {
    return await this.ordonnanceService.getOrdonnanceById(id);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async updateOrdonnance(@Param('id') id: string, @Body() createOrdonnanceDto: CreateOrdonnanceDto) {
    return await this.ordonnanceService.updateOrdonnance(id, createOrdonnanceDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteOrdonnance(@Param('id') id: string) {
    return await this.ordonnanceService.deleteOrdonnance(id);
  }
}
