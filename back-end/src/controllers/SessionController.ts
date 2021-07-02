import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Vendedor from '../models/vendedor';

class SessionController {
  async authenticate(request: Request, response: Response){
    

    const { email, pass } = request.body;

    const vendedorRepository = getRepository(Vendedor);
    const user = await vendedorRepository.findOne({where: { email }});

    if (!user){
      return response.status(401).json({alert: "Email informado não existe em nossa base de dados"});      
    }

    const isValidPass = await bcrypt.compare(pass, user.pass);

    if (!isValidPass){
      return response.status(401).json({alert: "Senha inválida"});
    }
    
    const token = jwt.sign({ id: user.id }, 'secret', {expiresIn: '1d'});
    
    delete user.pass;


    return response.json({ user, token });

  }
}
export default new SessionController();










// import { Request, Response } from 'express';
// import { getRepository, JoinColumn } from 'typeorm';
// import sessionsView from '../views/sessions_view';

// import Vendedor from '../models/vendedor';

// export default {
//     async create( request: Request, response: Response){

//       const { id } = request.body;
      
//       const vendedorRepository = getRepository(Vendedor);
  
//       const vendedores = await vendedorRepository.findOneOrFail({
//         where: id,
//         select: name   
//       })
  
//       return response.json(sessionsView.render(vendedores));
  
//     }
// };

