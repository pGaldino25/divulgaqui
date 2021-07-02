import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit, FiPower, FiTrash2 } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { RiMapPinAddLine, RiHomeSmileLine } from 'react-icons/ri';

import './styles.css';

import logoImg from '../../assets/logo.png'
import api from '../../services/api';
 


export default function Profile(){
        // const [products, setProducts] = useState([]);

        const history = useHistory();
        const [produtos, setProdutos] = useState([]);

        const userId = localStorage.getItem('idUser');
        const userName = localStorage.getItem('userName');



        console.log(userId)

            if (!userId){
                history.push('/logon');
                alert('Por favor faça login para acessar seus produtos!')
              
            }


            useEffect(() => {
                api.get('profile', {
                    headers: {
                        Authorization: userId,
                    }
                }).then(response =>{
                    setProdutos(response.data)
                    console.log(response.data);
                });
            }, [userId]);

        try{
            if (!userName){
             
            }
        }catch(err){
            alert('Por favor, faça login para acessar seus produtos!')
            history.push('/')
        }

        async function handleDeleteProduct(id){
            try{
                if(window.confirm('Delete the item?')){
                await api.delete(`produtos/${id}`, {
                    headers: {
                        Authorization: userId, 
                    }
                });
                setProdutos(produtos.filter(produto => produto.id !== id));
            }
            }catch(err){
            
                alert('Erro ao deletar produto, tente novamente.')
            }
        }

        async function handleProductUpdate(id){
            try{
                await api.update(`produtos/${id}`, {
                    headers: {
                        Authorization: userId, 
                    }
                });
                setProdutos(produtos.filter(produto => produto.id !== id));
            }catch(err){
                alert('Erro ao deletar produto, tente novamente.')
            }
        }

        function handleLogout(){
            localStorage.clear()

            history.push('/')
        }

    
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Divulga Aqui C e M" />
                <span>Bem Vindo, {userName}!</span>

                <Link className="menuIndex" to="/products/new">
                    <RiMapPinAddLine size={35}/>Divulgar produto </Link>
                <Link className="menuIndex" to="/">
                    <RiHomeSmileLine size={35}/>Voltar para Home</Link>

                <button onClick={handleLogout} type="button" class="logout">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <center><h1>Produtos cadastrados</h1></center>
            
                <ul>
                {produtos.map(produto =>{
                return(
                    <li key={produto.id} title='Click para mais informações!'>
                    <Link to={`/details/${produto.id}`}>
                    
                    <p><h3>{produto.title}</h3></p>
                    
                    <strong>DESCRIÇÃO:</strong>
                    <p id='desctiptionLen'>{produto.description}</p>
                    
                    <strong>Valor:</strong>
                    {/* <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(produto.value)}</p> */}
                    <p>R$: {produto.value}</p>
                    </Link>
                    <button onClick= { () => handleDeleteProduct(produto.id)} type='button' title='Excluir'>
                        <FiTrash2/>
                        
                    </button>
                    <button onClick= { () => history.push(`/products/update/${produto.id}`)} id='button2' title='Editar'>
                        
                        <FiEdit/>
                        
                    </button>
                    
                </li>
                
                )
            })}
            
            </ul>
                        
        </div>
    );

}