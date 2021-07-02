
import { Request, Response } from 'express';
import { getRepository, JoinColumn } from 'typeorm';
import produtoView from '../views/produtos_view';
import * as Yup from 'yup';

import Produto from '../models/produtos';

import Vendedor from '../models/vendedor';


export default {
  async index( request: Request, response: Response){

    const idVend  = request.headers.authorization;
    
    const produtoRepository = getRepository(Produto);

    const produtos = await produtoRepository.find({
      where:{vendedor:idVend},
      relations: ['images', 'vendedor'],
    });

    return response.json(produtoView.renderMany(produtos));

  },
  async show(request: Request, response: Response){
    
    const id  = request.headers.authorization;
    const vendedorRepository = getRepository(Vendedor);

    const vendedor = await vendedorRepository.findOneOrFail(id);

    delete vendedor.pass;

    return response.json(vendedor);

  },
    async create(request: Request, response: Response){

      console.log(request.files);
        const {
            title,
            description,
            value
          } = request.body;
          
          const produtoRepository = getRepository(Produto);
          
          const requestImages = request.files as Express.Multer.File[];
         
          const images = requestImages.map(image => {
            return { path: image.filename }
          })

          const data = {
              title,
              description,
              value,
              images,
          };

          const schema = Yup.object().shape({
            title: Yup.string().required('Oops... Titulo do produto é obrigatório!'),
            description: Yup.string().max(300),
            images: Yup.array(
              Yup.object().shape({
                path:  Yup.string().required()
              })
            )
          })

          await schema.validate(data, {
            abortEarly: false,
          })

          const produto = produtoRepository.create(data);
          
          
          await produtoRepository.save(produto);
          
          return response.status(201).json({ produto });
    }
};