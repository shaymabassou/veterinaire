/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, Client } from './user.entity';
import { Animal } from '../animal/animal.entity';
import * as bcrypt from 'bcrypt';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { HistoriqueClient } from './historique-client.entity';
import { CreateHistoriqueClientDto } from './dto/create-historique-client.dto';
import { UpdateHistoriqueClientDto } from './dto/update-historique-client.dto';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(Animal.name) private readonly animalModel: Model<Animal>,
    @InjectModel(HistoriqueClient.name) private readonly historiqueClientModel: Model<HistoriqueClient>,
  ) {}

  async onModuleInit(): Promise<void> {
    const adminLastname = 'admin';
    const adminFirstname = 'user';
    const adminPassword = 'admin123'; // Définissez ici le mot de passe de l'admin par défaut
    const adminEmail = 'admin@example.com'; // Définissez ici l'email de l'admin par défaut
    
    const adminExists = await this.userModel.findOne({ email: adminEmail }).exec();
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const adminUser = new this.userModel({ 
        firstname: adminFirstname,
        lastname: adminLastname,
        email: adminEmail,
        password: hashedPassword, 
        role: 'admin' 
      });
      try {
        await adminUser.save();
        console.log("Admin user created successfully");
      } catch (error) {
        console.error("Failed to create admin user:", error);
      }
    } else {
      console.log("Admin already exists");
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(userId: string): Promise<User | undefined> {
    return this.userModel.findById(userId).exec();
  }

  async findClientById(id: string): Promise<Client> {
    const client = await this.clientModel.findById(id).exec();
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async findClientByAnimalId(animalId: string): Promise<Client> {
    const animal = await this.animalModel.findById(animalId).exec();
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${animalId} not found`);
    }
    
    const client = await this.clientModel.findOne({ animalid: animalId }).exec();
    if (!client) {
      throw new NotFoundException(`Client with Animal ID ${animalId} not found`);
    }
    return client;
  }

  async register(userData: Partial<User>): Promise<User> {
    const { email, password, firstname, lastname } = userData;
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new Error('Email already exists');
    }

    let role = 'client';
    const isFirstUser = (await this.userModel.countDocuments({}).exec()) === 0;
    if (isFirstUser) {
      role = 'admin';
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ firstname, lastname, email, password: hashedPassword, role });
    return newUser.save();
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const { firstname, lastname, email, password, CIN, tel, adresse, dateNaissance, animalid } = createClientDto;

    // Check if the animal with the given animalid exists in the database
    const animalExists = await this.animalModel.findById(animalid).exec();
    if (!animalExists) {
      throw new NotFoundException(`Animal with ID ${animalid} not found`);
    }

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = new this.clientModel({ 
      firstname, 
      lastname, 
      email, 
      password: hashedPassword, 
      role: 'client', 
      CIN, 
      tel, 
      adresse, 
      dateNaissance, 
      animalid 
    });
    return newClient.save();
  }

  async updateClient(clientId: string, updateClientDto: UpdateClientDto): Promise<{ message: string }> {
    const client = await this.findClientById(clientId);
    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }
    await this.clientModel.findByIdAndUpdate(clientId, updateClientDto).exec();
    return { message: 'Client updated successfully' };
  }

  async deleteClient(clientId: string): Promise<{ message: string }> {
    const client = await this.findClientById(clientId);
    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }
    await this.clientModel.findByIdAndDelete(clientId).exec();
    return { message: 'Client deleted successfully' };
  }

  async getClientById(clientId: string): Promise<Client> {
    return this.findClientById(clientId);
  }

  async getClientByAnimalId(animalId: string): Promise<Client> {
    return this.findClientByAnimalId(animalId);
  }

  async addHistorique(clientId: string, createHistoriqueClientDto: CreateHistoriqueClientDto): Promise<HistoriqueClient> {
    const client = await this.findClientById(clientId);
    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }
    
    const historiqueClient = new this.historiqueClientModel({
      ...createHistoriqueClientDto,
      clientId,
    });
    
    await historiqueClient.save(); // Sauvegarder l'historique client dans la base de données
    
    return historiqueClient;
  }

  async getHistoriqueById(historiqueId: string): Promise<HistoriqueClient> {
    const historiqueClient = await this.historiqueClientModel.findById(historiqueId).exec();
    if (!historiqueClient) {
      throw new NotFoundException(`Historique with ID ${historiqueId} not found`);
    }
    return historiqueClient;
  }

  async updateHistorique(historiqueId: string, updateHistoriqueClientDto: UpdateHistoriqueClientDto): Promise<{ message: string }> {
    const historiqueClient = await this.getHistoriqueById(historiqueId);
    if (!historiqueClient) {
      throw new NotFoundException(`Historique with ID ${historiqueId} not found`);
    }
    await this.historiqueClientModel.findByIdAndUpdate(historiqueId, updateHistoriqueClientDto).exec();
    return { message: 'Historique updated successfully' };
  }

  async deleteHistorique(historiqueId: string): Promise<{ message: string }> {
    const historiqueClient = await this.getHistoriqueById(historiqueId);
    if (!historiqueClient) {
      throw new NotFoundException(`Historique with ID ${historiqueId} not found`);
    }
    await this.historiqueClientModel.findByIdAndDelete(historiqueId).exec();
    return { message: 'Historique deleted successfully' };
  }
}
