import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiAlignRight, FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.png'
import api from '../../services/api';

export default function Profile(){
    const [produtos, setProdutos] = useState([]);
    console.log(produtos);
    

        useEffect(() => {
            api.get('produtos').then(response =>{
                setProdutos(response.data)
            });
        }, []);

    
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Divulga Aqui C e M" />
                <span>Bem Vindo, {localStorage.userName}!</span>

                <Link className="button" to="/products/new">Cadastrar novo produto</Link>
                <button type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <center><h1>Produtos cadastrados</h1></center>
            
                <ul>
                {produtos.map(produto =>{
                return(
                    <li>
                    <Link to={`/details/${produto.id}`}>
                    {/* <strong>PRODUTO:</strong> */}
                    <p>{produto.title}</p>
                    
                    <strong>DESCRIÇÃO:</strong>
                    <p>{produto.description}</p>
                    
                    <strong>Valor:</strong>
                    <p>R$ {produto.value}</p>

                    <button type='button'>
                        <FiTrash2 size={20} color='#a8a8b3'/>
                        
                    </button>
                    </Link>
                    
                    {/* <Link to={`/details/${produto.id}`}>
                        Mais detalhes do produto
                        <FiAlignRight size={20} color='#a8a8b3'/>
                    </Link> */}

                </li>
                )
            })}

            </ul>
               
            
        </div>
    );

}