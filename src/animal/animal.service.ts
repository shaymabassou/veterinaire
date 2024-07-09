/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './animal.entity';
import { UserService } from '../user/user.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel('Animal') private animalModel: Model<Animal>,
    private readonly userService: UserService,
  ) {}

  async createAnimal(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    // Vérifiez ici que le client existe
    const client = await this.userService.findClientById(createAnimalDto.clientId);
    if (!client) {
      throw new NotFoundException(`Client with ID ${createAnimalDto.clientId} not found`);
    }

    // Création de l'animal
    const newAnimal = new this.animalModel({
      ...createAnimalDto,
      clientId: createAnimalDto.clientId, // Assurez-vous que clientId est correctement défini
    });
    return newAnimal.save();
  }

  async updateAnimal(animalId: string, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    const existingAnimal = await this.animalModel.findById(animalId);
    if (!existingAnimal) {
      throw new NotFoundException(`Animal with ID ${animalId} not found`);
    }

    Object.assign(existingAnimal, updateAnimalDto);
    return existingAnimal.save();
  }

  async deleteAnimal(animalId: string): Promise<{ message: string }> {
    const animal = await this.animalModel.findByIdAndDelete(animalId);
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${animalId} not found`);
    }

    return { message: 'Animal deleted successfully' };
  }

  async getAnimal(animalId: string): Promise<Animal> {
    const animal = await this.animalModel.findById(animalId);
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${animalId} not found`);
    }

    return animal;
  }

  async getAllAnimals(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }
}
