/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { HistoriqueAnimal } from './historique-animal.entity';
import { CreateHistoriqueAnimalDto } from './dto/create-historique-animal.dto';
import { UpdateHistoriqueAnimalDto } from './dto/update-historique-animal.dto';
import { Client } from 'src/user/user.entity';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal.name) private readonly animalModel: Model<Animal>,
    @InjectModel(HistoriqueAnimal.name) private readonly historiqueAnimalModel: Model<HistoriqueAnimal>,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
  ) {}

  async createAnimal(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const client = await this.clientModel.findById(createAnimalDto.clientId).exec();
    if (!client) {
      throw new NotFoundException(`Client with ID ${createAnimalDto.clientId} not found`);
    }
  
    const newAnimal = new this.animalModel(createAnimalDto);
    const savedAnimal = await newAnimal.save();
    console.log('Saved Animal:', savedAnimal);  // Log for debugging
    return savedAnimal;
  }

  async updateAnimal(animalId: string, updateAnimalDto: UpdateAnimalDto): Promise<{ message: string }> {
    const animal = await this.animalModel.findById(animalId).exec();
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${animalId} not found`);
    }
    await this.animalModel.findByIdAndUpdate(animalId, updateAnimalDto).exec();
    return { message: 'Animal updated successfully' };
  }

  async deleteAnimal(animalId: string): Promise<{ message: string }> {
    const animal = await this.animalModel.findById(animalId).exec();
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${animalId} not found`);
    }
    await this.animalModel.findByIdAndDelete(animalId).exec();
    return { message: 'Animal deleted successfully' };
  }

  async getAnimal(animalId: string): Promise<Animal> {
    const animal = await this.animalModel.findById(animalId).populate('clientId').exec();
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${animalId} not found`);
    }
    return animal;
  }

  async getAllAnimals(): Promise<Animal[]> {
    return this.animalModel.find().populate('clientId').exec();
  }

  async getAnimalsByClientId(clientId: string): Promise<Animal[]> {
    return this.animalModel.find({ clientId }).populate('clientId').exec();
  }
  
  async addHistorique(animalId: string, createHistoriqueAnimalDto: CreateHistoriqueAnimalDto): Promise<HistoriqueAnimal> {
    const animal = await this.animalModel.findById(animalId).exec();
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${animalId} not found`);
    }

    const historiqueAnimal = new this.historiqueAnimalModel({
      ...createHistoriqueAnimalDto,
      animalId,
    });

    await historiqueAnimal.save(); // Sauvegarder l'historique animal dans la base de données

    return historiqueAnimal;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getHistoriqueById(historiqueId: string, animalId: string): Promise<HistoriqueAnimal> {
    return this.historiqueAnimalModel.findOne({ _id: historiqueId, animalId });
  }
  async getHistoriquesByAnimalId(animalId: string): Promise<HistoriqueAnimal[]> {
    return this.historiqueAnimalModel.find({ animalId }).exec();
  }

  async updateHistorique(historiqueId: string, updateHistoriqueAnimalDto: UpdateHistoriqueAnimalDto): Promise<{ message: string }> {
    const historiqueAnimal = await this.historiqueAnimalModel.findById(historiqueId).exec();
    if (!historiqueAnimal) {
      throw new NotFoundException(`Historique with ID ${historiqueId} not found`);
    }
    await this.historiqueAnimalModel.findByIdAndUpdate(historiqueId, updateHistoriqueAnimalDto).exec();
    return { message: 'Historique updated successfully' };
  }

  async deleteHistorique(historiqueId: string): Promise<{ message: string }> {
    const historiqueAnimal = await this.historiqueAnimalModel.findById(historiqueId).exec();
    if (!historiqueAnimal) {
      throw new NotFoundException(`Historique with ID ${historiqueId} not found`);
    }
    await this.historiqueAnimalModel.findByIdAndDelete(historiqueId).exec();
    return { message: 'Historique deleted successfully' };
  }
}
