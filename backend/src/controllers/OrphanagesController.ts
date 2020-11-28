import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import Image from '../models/Image';
import orphanageView from '../views/orphanages_view';
import fs from 'fs';
import path from 'path';
import * as Yup from 'yup';

export default { 
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(orphanageView.render(orphanage));
  },

  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async create(request: Request, response: Response) {
    const { 
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
      whatsapp,
      user_id: request.user.id
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      user_id: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      ),
      whatsapp: Yup.string(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanagesRepository = getRepository(Orphanage);
  
    const orphanage = orphanagesRepository.create(data);
  
    await orphanagesRepository.save(orphanage);
    
    return response.status(201).json(orphanage);
  },

  async edit(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);
    const imagesRepository = getRepository(Image);

    const orphanage = await orphanagesRepository.findOne(id);
    if (!orphanage) {
      return response.status(400).json({message: 'Não há um orfanato registrado com esse id'});
    }

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp,
    } = request.body;
  
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
      whatsapp,
      user_id: request.user.id
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      user_id: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      ),
      whatsapp: Yup.string(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const previousImages = await imagesRepository.find({where: {orphanage: orphanage.id}}); 
    await imagesRepository.remove(previousImages);

    previousImages.map(current => {
      const currentPath = path.resolve('uploads', current.path);

      fs.unlink(currentPath, (err => {
          !!err && console.log(`Erro na remoção: ${err}`);
        })
      );
    });

    const newImages = imagesRepository.create(images);    

    orphanage.name = name;
    orphanage.about = about;
    orphanage.whatsapp = whatsapp;
    orphanage.images = newImages;
    orphanage.instructions = instructions;
    orphanage.opening_hours = opening_hours;
    orphanage.open_on_weekends = data.open_on_weekends;

    await orphanagesRepository.save(orphanage);
        
    return response.status(201).json(orphanage);
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const orphanageRepository = getRepository(Orphanage);

    const orphanage = await orphanageRepository.findOne({ where: { id }});

    if (!orphanage) {
      return response.status(400).json({error: 'Orfanato não existe'})
    }

    await orphanageRepository.delete(id);

    return response.status(200).json({message: 'Orfanato removido'});
  }
}