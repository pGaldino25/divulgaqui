import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';
import vendasImg from '../../assets/conceito_vendas_600_895.png';

export default function Logon (){

    const [email, setEmail] = useState(''); 
    const [pass, setPass] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        try{
       const response = await api.post('auth', {email, pass});

       localStorage.setItem('idUser', response.data.user.id);
       localStorage.setItem('userName', response.data.user.name);
       localStorage.setItem('token', response.data.token);

       history.push('/profile')

            
        }catch(err){
            alert("Falha no login, tente novamente.");
            
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="DivulgAqui CM"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <div className="inputLogon">
                        <input placeholder='Seu email'
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        />
                        <input type="password" placeholder='Sua senha'
                        value={pass}
                        onChange={e=>setPass(e.target.value)}
                        />
                        <button className='button' type='submit'>Entrar</button>
                    </div>
                    <Link className='back-link' to="/register">
                    <FiLogIn size={21} color='ffcc00' />
                    Não tenho cadastro</Link>
                    
                </form>

            </section>

            <img src={vendasImg} alt="Vendedores" />

        </div>
    );
}