/* eslint-disable prettier/prettier */
// src/stock/stock.service.ts
import { Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medicament } from './medicament.entity';
import { MaterielConsommable } from './materiel-consommable.entity';
import { ProduitAlimentaire } from './produit-alimentaire.entity';
import { CreateMedicamentDto } from './dto/create-medicament.dto';
import { CreateMaterielConsommableDto } from './dto/create-materiel-consommable.dto';
import { CreateProduitAlimentaireDto } from './dto/create-produit-alimentaire.dto';
// import { CreateOrdonnanceDto } from './dto/create-ordonnance.dto';
// import { Ordonnance } from './ordonnance.entity';
import { UserService } from '../user/user.service';
import { Animal } from '../animal/animal.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectModel('Medicament') private medicamentModel: Model<Medicament>,
    @InjectModel('MaterielConsommable') private materielConsommableModel: Model<MaterielConsommable>,
    @InjectModel('ProduitAlimentaire') private produitAlimentaireModel: Model<ProduitAlimentaire>,
    // @InjectModel('Ordonnance') private ordonnanceModel: Model<Ordonnance>,
    @InjectModel('Animal') private animalModel: Model<Animal>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async createMedicament(createMedicamentDto: CreateMedicamentDto): Promise<Medicament> {
    const newMedicament = new this.medicamentModel(createMedicamentDto);
    return newMedicament.save();
  }

  async createMaterielConsommable(createMaterielConsommableDto: CreateMaterielConsommableDto): Promise<MaterielConsommable> {
    const newMaterielConsommable = new this.materielConsommableModel(createMaterielConsommableDto);
    return newMaterielConsommable.save();
  }

  async createProduitAlimentaire(createProduitAlimentaireDto: CreateProduitAlimentaireDto): Promise<ProduitAlimentaire> {
    const newProduitAlimentaire = new this.produitAlimentaireModel(createProduitAlimentaireDto);
    return newProduitAlimentaire.save();
  }

  async findMedicamentById(medicamentId: string): Promise<Medicament | null> {
    return this.medicamentModel.findById(medicamentId).exec();
  }

  async findAnimalById(animalId: string): Promise<Animal | null> {
    return this.animalModel.findById(animalId).exec();
  }

  // async createOrdonnance(createOrdonnanceDto: CreateOrdonnanceDto): Promise<Ordonnance> {
  //   const medicament = await this.findMedicamentById(createOrdonnanceDto.medicamentId);
  //   if (!medicament) {
  //     throw new NotFoundException('Medicament not found');
  //   }

  //   const animal = await this.findAnimalById(createOrdonnanceDto.animalId);
  //   if (!animal) {
  //     throw new NotFoundException('Animal not found');
  //   }

  //   const nouvelleOrdonnance = new this.ordonnanceModel({
  //     dosage: createOrdonnanceDto.dosage,
  //     nombreDeFoisParJour: createOrdonnanceDto.nombreDeFoisParJour,
  //     medicament: medicament._id,
  //     animalId: animal._id,
  //   });

  //   return nouvelleOrdonnance.save();
  // }

  // async getOrdonnanceById(id: string): Promise<Ordonnance> {
  //   const ordonnance = await this.ordonnanceModel.findById(id).exec();
  //   if (!ordonnance) {
  //     throw new NotFoundException(`Ordonnance with ID ${id} not found`);
  //   }
  //   return ordonnance;
  // }

  // async updateOrdonnance(id: string, createOrdonnanceDto: CreateOrdonnanceDto): Promise<Ordonnance> {
  //   const ordonnance = await this.ordonnanceModel.findByIdAndUpdate(id, createOrdonnanceDto, { new: true }).exec();
  //   if (!ordonnance) {
  //     throw new NotFoundException(`Ordonnance with ID ${id} not found`);
  //   }
  //   return ordonnance;
  // }

  // async deleteOrdonnance(id: string): Promise<{ message: string }> {
  //   const ordonnance = await this.ordonnanceModel.findByIdAndDelete(id).exec();
  //   if (!ordonnance) {
  //     throw new NotFoundException(`Ordonnance with ID ${id} not found`);
  //   }
  //   return { message: 'Ordonnance deleted successfully' };
  // }

  async getMedicamentById(id: string): Promise<Medicament> {
    const medicament = await this.medicamentModel.findById(id).exec();
    if (!medicament) {
      throw new NotFoundException(`Medicament with ID ${id} not found`);
    }
    return medicament;
  }

  async updateMedicament(id: string, createMedicamentDto: CreateMedicamentDto): Promise<Medicament> {
    const medicament = await this.medicamentModel.findByIdAndUpdate(id, createMedicamentDto, { new: true }).exec();
    if (!medicament) {
      throw new NotFoundException(`Medicament with ID ${id} not found`);
    }
    return medicament;
  }

  async deleteMedicament(id: string): Promise<{ message: string }> {
    const medicament = await this.medicamentModel.findByIdAndDelete(id).exec();
    if (!medicament) {
      throw new NotFoundException(`Medicament with ID ${id} not found`);
    }
    return { message: 'Medicament deleted successfully' };
  }

  async getMaterielConsommableById(id: string): Promise<MaterielConsommable> {
    const materielConsommable = await this.materielConsommableModel.findById(id).exec();
    if (!materielConsommable) {
      throw new NotFoundException(`MaterielConsommable with ID ${id} not found`);
    }
    return materielConsommable;
  }

  async updateMaterielConsommable(id: string, createMaterielConsommableDto: CreateMaterielConsommableDto): Promise<MaterielConsommable> {
    const materielConsommable = await this.materielConsommableModel.findByIdAndUpdate(id, createMaterielConsommableDto, { new: true }).exec();
    if (!materielConsommable) {
      throw new NotFoundException(`MaterielConsommable with ID ${id} not found`);
    }
    return materielConsommable;
  }

  async deleteMaterielConsommable(id: string): Promise<{ message: string }> {
    const materielConsommable = await this.materielConsommableModel.findByIdAndDelete(id).exec();
    if (!materielConsommable) {
      throw new NotFoundException(`MaterielConsommable with ID ${id} not found`);
    }
    return { message: 'MaterielConsommable deleted successfully' };
  }

  async getProduitAlimentaireById(id: string): Promise<ProduitAlimentaire> {
    const produitAlimentaire = await this.produitAlimentaireModel.findById(id).exec();
    if (!produitAlimentaire) {
      throw new NotFoundException(`ProduitAlimentaire with ID ${id} not found`);
    }
    return produitAlimentaire;
  }

  async updateProduitAlimentaire(id: string, createProduitAlimentaireDto: CreateProduitAlimentaireDto): Promise<ProduitAlimentaire> {
    const produitAlimentaire = await this.produitAlimentaireModel.findByIdAndUpdate(id, createProduitAlimentaireDto, { new: true }).exec();
    if (!produitAlimentaire) {
      throw new NotFoundException(`ProduitAlimentaire with ID ${id} not found`);
    }
    return produitAlimentaire;
  }

  async deleteProduitAlimentaire(id: string): Promise<{ message: string }> {
    const produitAlimentaire = await this.produitAlimentaireModel.findByIdAndDelete(id).exec();
    if (!produitAlimentaire) {
      throw new NotFoundException(`ProduitAlimentaire with ID ${id} not found`);
    }
    return { message: 'ProduitAlimentaire deleted successfully' };
  }
}
