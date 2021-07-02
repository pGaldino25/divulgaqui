import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Vendedor from '../models/vendedor';

export default {
  async index(request: Request, response: Response){

    const vendedorRepository = getRepository(Vendedor);

    const vendedor = await vendedorRepository.find();

    return response.send(vendedor); 

  },
  
  async show(request: Request, response: Response){
    const id  = request.headers.authorization;
    const vendedorRepository = getRepository(Vendedor);

    const vendedor = await vendedorRepository.findOneOrFail(id);

    delete vendedor.pass;

    return response.json(vendedor);

  },
    async create(request: Request, response: Response){
        const {
            name,
            email,
            whatsapp,
            extension,
            department,
            pass,
          } = request.body;

          console.log(request.body);
          
          const vendedorRepository = getRepository(Vendedor);

          const userExists = await vendedorRepository.findOne({where: { email }});

          if (userExists){
          return response.status(409).json({alert: "Já existe um usuário cadastrado com esse email"})
          }
          
          const vendedor = vendedorRepository.create({
            name,
            email,
            whatsapp,
            extension,
            department,
            pass,
          });
          
          await vendedorRepository.save(vendedor);
          
          return response.status(201).json({ vendedor });
    }
}