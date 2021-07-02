import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { RiMapPinUserLine } from 'react-icons/ri';

import './styles.css';

import logoImg from '../../assets/logo.png'
import api from '../../services/api';

export default function AllProducts(){


const user = localStorage.userName;

console.log(user)
function getGreeting(user) {
    // if (user == 'Visitante'){
    if (!user){
        localStorage.userName = 'Visitante';
        return <header>
                   <img src={logoImg} alt="Divulga Aqui C e M" />
                   <span>Bem Vindo, {user}!</span>
   
                   <Link className="menuIndex" to='/logon'>
                       <RiMapPinUserLine className="store" size={35}/>Fazer Logon</Link>
                            
               </header>
            }else{
        return <header>
                    <img src={logoImg} alt="Divulga Aqui C e M" />
                    <span>Bem Vindo, {user}!</span>

                    <Link className="menuIndex" to='/profile'>
                        <RiMapPinUserLine className="store" size={35}/>Minha Loja</Link>

                    <button type="button"> 
                        <FiPower size={18} color="#E02041" />
                    </button>
                    
               </header>
  }
}
 
    const [produtos, setProdutos] = useState([]);
    console.log(produtos);
    

        useEffect(() => {
            api.get('produtos').then(response =>{
                setProdutos(response.data)
            });
        }, []);

        

    return (
        <div className="profile-container">
            
            {getGreeting(user)}
            
            <center><h1>Produtos cadastrados</h1></center>

            
                <ul>
                {produtos.map(produto =>{
                return(
                    <li key={produto.id}>
                    
                    {/* <div style={{ backgroundImage: `url(${produto.images[0].url})` }}> */}
                    <Link to={`/details/${produto.id}`}>
                    
                    <p><h3>{produto.title}</h3></p>
                    
                    <strong>DESCRIÇÃO:</strong>
                    <p>{produto.description}</p>
                    
                    <strong>Valor:</strong>
                    {/* <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(produto.value)}</p> */}
                    <p>R$: {produto.value}</p>

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