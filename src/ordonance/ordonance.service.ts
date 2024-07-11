/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrdonnanceDto } from './dto/create-ordonnance.dto';
import { Ordonnance } from './ordonnance.entity';
import { Animal } from '../animal/animal.entity';
import { Medicament } from 'src/stock/medicament.entity';

@Injectable()
export class OrdonnanceService {
  constructor(
    @InjectModel(Ordonnance.name) private readonly ordonnanceModel: Model<Ordonnance>,
    @InjectModel(Medicament.name) private readonly medicamentModel: Model<Medicament>,
    @InjectModel(Animal.name) private readonly animalModel: Model<Animal>,
  ) {}

  async createOrdonnance(createOrdonnanceDto: CreateOrdonnanceDto): Promise<Ordonnance> {
    const medicament = await this.medicamentModel.findById(createOrdonnanceDto.medicamentId).exec();
    if (!medicament) {
      throw new NotFoundException('Medicament not found');
    }

    const animal = await this.animalModel.findById(createOrdonnanceDto.animalId).exec();
    if (!animal) {
      throw new NotFoundException('Animal not found');
    }

    const nouvelleOrdonnance = new this.ordonnanceModel({
      dosage: createOrdonnanceDto.dosage,
      nombreDeFoisParJour: createOrdonnanceDto.nombreDeFoisParJour,
      medicament: medicament._id,
      animalId: animal._id,
    });

    return nouvelleOrdonnance.save();
  }

  async getOrdonnanceById(id: string): Promise<Ordonnance> {
    const ordonnance = await this.ordonnanceModel.findById(id).exec();
    if (!ordonnance) {
      throw new NotFoundException(`Ordonnance with ID ${id} not found`);
    }
    return ordonnance;
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
}
