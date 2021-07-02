 import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.png';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [extension, setExtension] = useState('');
    const [department, setDepartment] = useState('');
    const [pass, setPass] = useState('');
    
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            extension,
            department,
            pass
        };
        try{
        const response = await api.post('vendedor', data);
    alert(`Cadastro realizado com sucesso! `);
    history.push('/');
    } catch(err){
        alert('Erro no cadastro, tente novamente.');
        }
    }

    return(
    <div className="register-container">
        <div className="content">
        <center><section>
                <img src={ logoImg } alt="DivulgAqui C&M Software"/>

                <h1><center>Cadastro</center></h1>
                <p>Faça seu cadastro, entre na plataforma e ajude os amarelinhos a encontrar o seu produto</p>

                <Link className='back-link' to="/">
                    <FiArrowLeft size={21} color='ffcc00' />
                    Voltar para início</Link>
            </section></center>

            <form onSubmit={handleRegister}>
                <input 
                    placeholder='Nome'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                
                <input 
                    type='email' placeholder='E-mail'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                
                <input 
                    placeholder='Whatsapp'
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                />
                <input 
                    placeholder='Ramal'
                    value={extension}
                    onChange={e => setExtension(e.target.value)}
                />
                
                <input 
                    placeholder='Departamento'
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                />
                
                <input 
                    placeholder='Escolha sua Senha'
                    type="password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                />
                <button className='button' type='submit'>Cadastrar</button>
            </form>
        </div>
    </div>
    );
}