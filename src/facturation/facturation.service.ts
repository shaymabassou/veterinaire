/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Facturation } from './facturation.entity';
import { Medicament } from '../stock/medicament.entity';
import { MaterielConsommable } from '../stock/materiel-consommable.entity';
import { ProduitAlimentaire } from '../stock/produit-alimentaire.entity';
import { Client } from 'src/user/user.entity'; // Assurez-vous que le chemin est correct
import { CreateFacturationDto } from './dto/CreateFacturation.dto';

@Injectable()
export class FacturationService {
  constructor(
    @InjectModel(Facturation.name) private readonly facturationModel: Model<Facturation>,
    @InjectModel(Medicament.name) private readonly medicamentModel: Model<Medicament>,
    @InjectModel(MaterielConsommable.name) private readonly materielConsommableModel: Model<MaterielConsommable>,
    @InjectModel(ProduitAlimentaire.name) private readonly produitAlimentaireModel: Model<ProduitAlimentaire>,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>, // Injection du modèle Client
  ) {}

  async createFacturation(createFacturationDto: CreateFacturationDto): Promise<Facturation> {
    const { prixConsultation, clientId, medicamentId, produitalimentaireId, materielconsommableId } = createFacturationDto;

    // Validation du client
    const client = await this.clientModel.findById(clientId).exec();
    if (!client) {
        throw new NotFoundException(`Client with ID ${clientId} not found`);
    }

    let prixGlobale = prixConsultation;

    // Vérifiez et ajoutez le prix des médicaments si l'ID est valide
    if (medicamentId && Types.ObjectId.isValid(medicamentId)) {
        const medicament = await this.medicamentModel.findById(medicamentId).exec();
        if (medicament) {
            prixGlobale += Number(medicament.prixVente);
        } else {
            throw new NotFoundException(`Medicament with ID ${medicamentId} not found`);
        }
    }

    // Vérifiez et ajoutez le prix des produits alimentaires si l'ID est valide
    if (produitalimentaireId && Types.ObjectId.isValid(produitalimentaireId)) {
        const produitAlimentaire = await this.produitAlimentaireModel.findById(produitalimentaireId).exec();
        if (produitAlimentaire) {
            prixGlobale += Number(produitAlimentaire.prixVente);
        } else {
            throw new NotFoundException(`Produit Alimentaire with ID ${produitalimentaireId} not found`);
        }
    }

    // Vérifiez et ajoutez le prix des matériels consommables si l'ID est valide
    if (materielconsommableId && Types.ObjectId.isValid(materielconsommableId)) {
        const materielConsommable = await this.materielConsommableModel.findById(materielconsommableId).exec();
        if (materielConsommable) {
            prixGlobale += Number(materielConsommable.prixVente);
        } else {
            throw new NotFoundException(`Materiel Consommable with ID ${materielconsommableId} not found`);
        }
    }

    // Préparez les données pour la création de la facturation
    const facturationData: any = {
        prixConsultation,
        clientId,
        prixGlobale,
        date: createFacturationDto.date,
        facture_n: createFacturationDto.facture_n,
        
    };

    if (medicamentId && Types.ObjectId.isValid(medicamentId)) {
        facturationData.medicamentId = medicamentId;
    }

    if (produitalimentaireId && Types.ObjectId.isValid(produitalimentaireId)) {
        facturationData.produitalimentaireId = produitalimentaireId;
    }

    if (materielconsommableId && Types.ObjectId.isValid(materielconsommableId)) {
        facturationData.materielconsommableId = materielconsommableId;
    }

    // Créez la nouvelle facturation
    const newFacturation = new this.facturationModel(facturationData);

    return await newFacturation.save();
}



async getFacturationById(id: string): Promise<Facturation> {
  console.log(`Fetching facturation with ID: ${id}`); // Debugging line

  if (!id) {
    throw new BadRequestException('ID is required');
  }

  const facturation = await this.facturationModel.findById(id)
    .populate('medicamentId')
    .populate('produitalimentaireId')
    .populate('materielconsommableId')
    .populate('clientId').exec();

  if (!facturation) {
    throw new NotFoundException(`Facturation with ID ${id} not found`);
  }

  return facturation;
}


  async getAllFacturations(): Promise<Facturation[]> {
    return this.facturationModel.find()
    .populate('medicamentId')
    .populate('produitalimentaireId')
    .populate('materielconsommableId')
    .populate('clientId').exec();
  }

  async updateFacturation(id: string, createFacturationDto: CreateFacturationDto): Promise<Facturation> {
    const facturation = await this.facturationModel.findByIdAndUpdate(id, createFacturationDto, { new: true }).exec();
    if (!facturation) {
      throw new NotFoundException(`Facturation with ID ${id} not found`);
    }
    return facturation;
  }
  async updateStatus(id: string, status: string): Promise<Facturation> {
    return this.facturationModel.findByIdAndUpdate(id, { status }, { new: true });
  }
  

  async deleteFacturation(id: string): Promise<{ message: string }> {
    const facturation = await this.facturationModel.findByIdAndDelete(id).exec();
    if (!facturation) {
      throw new NotFoundException(`Facturation with ID ${id} not found`);
    }
    return { message: 'Facturation deleted successfully' };
  }
}
