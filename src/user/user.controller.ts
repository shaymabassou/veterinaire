/* eslint-disable prettier/prettier */
import { Controller, Post, Put, Delete, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { User } from './user.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/enum';
import { CreateHistoriqueClientDto } from './dto/create-historique-client.dto';
import { UpdateHistoriqueClientDto } from './dto/update-historique-client.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() userData: Partial<User>) {
    const user = await this.userService.register(userData);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('client')
  async createClient(@Body() createClientDto: CreateClientDto) {
    return this.userService.createClient(createClientDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put('clients/:id')
  async updateClient(@Param('id') clientId: string, @Body() updateClientDto: UpdateClientDto) {
    return this.userService.updateClient(clientId, updateClientDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('clients/:id')
  async deleteClient(@Param('id') clientId: string) {
    return this.userService.deleteClient(clientId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('clients/:id')
  async getClientById(@Param('id') clientId: string) {
    return this.userService.getClientById(clientId);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('clients')
  async getAllClients() {
    return this.userService.getAllClients();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('clients/animal/:animalId')
  async getClientByAnimalId(@Param('animalId') animalId: string) {
    return this.userService.getClientByAnimalId(animalId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('clients/:id/historique')
  async addHistorique(@Param('id') clientId: string, @Body() createHistoriqueClientDto: CreateHistoriqueClientDto) {
    return this.userService.addHistorique(clientId, createHistoriqueClientDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put('clients/:clientId/historique/:historiqueId')
  async updateHistorique(
    @Param('clientId') clientId: string,
    @Param('historiqueId') historiqueId: string,
    @Body() updateHistoriqueClientDto: UpdateHistoriqueClientDto,
  ) {
    return this.userService.updateHistorique(historiqueId, updateHistoriqueClientDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('clients/:clientId/historique/:historiqueId')
  async deleteHistorique(@Param('clientId') clientId: string, @Param('historiqueId') historiqueId: string) {
    return this.userService.deleteHistorique(historiqueId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('clients/:id/historique')
  async getHistorique(@Param('id') clientId: string) {
    return this.userService.getClientById(clientId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('clients/:id/with-animals')
  async getClientWithAnimals(@Param('id') clientId: string) {
    return this.userService.getClientWithAnimals(clientId);
  }
  
}
