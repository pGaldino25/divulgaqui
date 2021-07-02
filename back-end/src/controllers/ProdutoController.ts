import { Request, Response } from 'express';
import { getRepository} from 'typeorm';
import produtoView from '../views/produtos_view';
import * as Yup from 'yup';

import Produto from '../models/produtos';

import Image from '../models/images';

export default {
  async index( request: Request, response: Response){
    const produtoRepository = getRepository(Produto);

    const produtos = await produtoRepository.find({
      relations: ['images']
    });

    return response.json(produtoView.renderMany(produtos));

  },
  
  async show(request: Request, response: Response){
    const { id } = request.params;
    
    const produtoRepository = getRepository(Produto);

    const produto = await produtoRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(produtoView.render(produto)); 

  },
    async create(request: Request, response: Response){

        const {
            title,
            description,
            value,
            vendedor_id
          } = request.body;

          const produtoRepository = getRepository(Produto);

          // const id = vendedorRepository.query()

          // const requestImages = request.files as Express.Multer.File[];
          
          // const images = requestImages.map(image => {
          //   return { path: image.filename }
          // });

          const data = {
              title,
              description,
              value,
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

          const produto = await produtoRepository.query('INSERT INTO "produto"("title", "description", "value", "vendedor_id") VALUES ($1, $2, $3, $4)', [title,description,value, vendedor_id]);

          const produto_id = produto;

          const imageRepository = getRepository(Image);
          const  requestImages = request.files as Express.Multer.File[];
            
            const images = requestImages.map(image => {
              const path = image.filename
              console.log(path);
              imageRepository.query('INSERT INTO "images"("path","produto_id") VALUES ($1, $2)', [path, produto_id]); 
            });

          return response.status(201).json({ produto });
    },
    async delete(request: Request, response: Response){
      const { id } = request.params;
      
      const produtoRepository = getRepository(Produto);
  
      const produto = await produtoRepository.delete(id);
  
      return response.status(204).send() 
  
    },
    async update(request: Request, response: Response){
      const { id } = request.params;
      
      const {
        title,
        description,
        value,
        vendedor_id
      } = request.body;

      const produtoRepository = getRepository(Produto);

      // const id = vendedorRepository.query()

      // const requestImages = request.files as Express.Multer.File[];
      
      // const images = requestImages.map(image => {
      //   return { path: image.filename }
      // });

      const data = {
          title,
          description,
          value,
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

      const produto = await produtoRepository.query(`UPDATE produto SET title = "${data.title}", description="${data.description}" ,value="${data.value}", vendedor_id ="${vendedor_id}" WHERE id = ${id}`);

      const produto_id = produto;

        // const imageRepository = getRepository(Image);
        // const  requestImages = request.files as Express.Multer.File[];
          
        //   const images = requestImages.map(image => {
        //     const path = image.filename
        //     console.log(path);
        //     imageRepository.query('INSERT INTO "images"("path","produto_id") VALUES ($1, $2)', [path, produto_id]); 
        //   });

      return response.status(201).json({ produto });
  
    }
};