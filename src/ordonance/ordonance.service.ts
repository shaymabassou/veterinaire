/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrdonnanceDto } from './dto/create-ordonnance.dto';
import { Ordonnance } from './ordonnance.entity';
import { Animal } from '../animal/animal.entity';
// import { Medicament } from 'src/stock/medicament.entity';

@Injectable()
export class OrdonnanceService {
  constructor(
    @InjectModel(Ordonnance.name) private readonly ordonnanceModel: Model<Ordonnance>,
    @InjectModel(Animal.name) private readonly animalModel: Model<Animal>,
  ) {}

  async createOrdonnance(createOrdonnanceDto: CreateOrdonnanceDto): Promise<Ordonnance> {
    const { nom, type, dosage, nombreDeFoisParJour, animalId } = createOrdonnanceDto;
    const animal = await this.animalModel.findById(animalId).exec();
    if (!animal) {
      throw new NotFoundException('Animal not found');
    }

    // Create new ordonnance
    const nouvelleOrdonnance = new this.ordonnanceModel({
      dosage,
      nombreDeFoisParJour,
      nom,
      type,
      animalId: animal._id,
    });

    return nouvelleOrdonnance.save();
  }

  async getOrdonnanceById(id: string): Promise<Ordonnance> {
    return this.ordonnanceModel.findById(id).populate('animalId').exec();
    }

  async updateOrdonnance(id: string, createOrdonnanceDto: CreateOrdonnanceDto): Promise<Ordonnance> {
    const ordonnance = await this.ordonnanceModel.findByIdAndUpdate(id, createOrdonnanceDto, { new: true }).exec();
    if (!ordonnance) {
      throw new NotFoundException(`Ordonnance with ID ${id} not found`);
    }
    return ordonnance;
  }

  async deleteOrdonnance(id: string): Promise<{ message: string }> {
    const ordonnance = await this.ordonnanceModel.findByIdAndDelete(id).exec();
    if (!ordonnance) {
      throw new NotFoundException(`Ordonnance with ID ${id} not found`);
    }
    return { message: 'Ordonnance deleted successfully' };
  }
  
  async getAllOrdonnances(): Promise<Ordonnance[]> {
    return this.ordonnanceModel.find().populate('animalId').exec();
  }

  async findById(id: string): Promise<Ordonnance> {
    const ordonnance = await this.ordonnanceModel.findById(id).exec();
    if (!ordonnance) {
      throw new NotFoundException(`Ordonnance with ID ${id} not found`);
    }
    return ordonnance;
  }
}


