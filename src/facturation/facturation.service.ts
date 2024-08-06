/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Facturation } from './facturation.entity'; // Assurez-vous que le nom du fichier est correct
import { Medicament } from '../stock/medicament.entity';
import { MaterielConsommable } from '../stock/materiel-consommable.entity';
import { ProduitAlimentaire } from '../stock/produit-alimentaire.entity';
import { CreateFacturationDto } from './dto/CreateFacturation.dto';

@Injectable()
export class FacturationService {
  constructor(
    @InjectModel(Facturation.name) private readonly facturationModel: Model<Facturation>,
    @InjectModel(Medicament.name) private readonly medicamentModel: Model<Medicament>,
    @InjectModel(MaterielConsommable.name) private readonly materielConsommableModel: Model<MaterielConsommable>,
    @InjectModel(ProduitAlimentaire.name) private readonly produitAlimentaireModel: Model<ProduitAlimentaire>,
  ) {}

  async createFacturation(createFacturationDto: CreateFacturationDto): Promise<Facturation> {
    const { prixConsultation, medicamentId, produitalimentaireId, materielconsommableId } = createFacturationDto;
  
    let prixGlobale = prixConsultation;
  
    if (medicamentId) {
      const medicament = await this.medicamentModel.findById(medicamentId).exec();
      if (!medicament) {
        throw new NotFoundException(`Medicament with ID ${medicamentId} not found`);
      }
      prixGlobale += Number(medicament.prixVente);
    }
  
    if (produitalimentaireId) {
      const produitAlimentaire = await this.produitAlimentaireModel.findById(produitalimentaireId).exec();
      if (!produitAlimentaire) {
        throw new NotFoundException(`ProduitAlimentaire with ID ${produitalimentaireId} not found`);
      }
      prixGlobale += Number(produitAlimentaire.prixVente);
    }
  
    if (materielconsommableId) {
      const materielConsommable = await this.materielConsommableModel.findById(materielconsommableId).exec();
      if (!materielConsommable) {
        throw new NotFoundException(`MaterielConsommable with ID ${materielconsommableId} not found`);
      }
      prixGlobale += Number(materielConsommable.prixVente);
    }
  
    const newFacturation = new this.facturationModel({
      ...createFacturationDto,
      prixGlobale, // add calculated prixGlobale
    });
    
    return newFacturation.save();
  }
  
  
  async getFacturationById(id: string): Promise<Facturation> {
    const facturation = await this.facturationModel.findById(id).populate('medicamentId').populate('produitalimentaireId').populate('materielconsommableId').exec();
    if (!facturation) {
      throw new NotFoundException(`Facturation with ID ${id} not found`);
    }
    return facturation;
  }

  async getAllFacturations(): Promise<Facturation[]> {
    return this.facturationModel.find().exec();
  }

  async updateFacturation(id: string, createFacturationDto: CreateFacturationDto): Promise<Facturation> {
    const facturation = await this.facturationModel.findByIdAndUpdate(id, createFacturationDto, { new: true }).exec();
    if (!facturation) {
      throw new NotFoundException(`Facturation with ID ${id} not found`);
    }
    return facturation;
  }

  async deleteFacturation(id: string): Promise<{ message: string }> {
    const facturation = await this.facturationModel.findByIdAndDelete(id).exec();
    if (!facturation) {
      throw new NotFoundException(`Facturation with ID ${id} not found`);
    }
    return { message: 'Facturation deleted successfully' };
  }
}
