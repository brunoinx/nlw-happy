import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import '../database/connection';

import Orphanage from "../models/Orphanage";
import orphanageView from '../views/orphanages_view';

export default class OrphanagesController {
  async index(req: Request, res: Response) {
    const orphanagesRepo = getRepository(Orphanage);

    const orphanages = await orphanagesRepo.find({
      relations: ['images']
    });

    return res.json(orphanageView.rendenMany(orphanages));
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepo = getRepository(Orphanage);

    const orphanage = await orphanagesRepo.findOneOrFail(id, {
      relations: ['images']
    });

    if (!orphanage) {
      return res.status(400).json({ MessageError: "Orphanage does not exist." });
    }

    return res.json(orphanageView.render(orphanage));
  }

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = req.body;

    const orphanagesRepo = getRepository(Orphanage);

    const reqImages = req.files as Express.Multer.File[];

    const images = reqImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.string().required(),
      longitude: Yup.string().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        }))
    });

    // Validar todos os erros dos dados passados (abortEarly: false)
    await schema.validate(data, {
      abortEarly: false,
    })

    const orphanage = orphanagesRepo.create(data);

    await orphanagesRepo.save(orphanage);

    return res.status(201).json(orphanage);
  }
}