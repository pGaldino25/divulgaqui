import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.png';

import './style.css';
export default function NewProduct(){
    return (
        <div className="new-product-container">
        <div className="content">
        <center><section>
                <img src={ logoImg } alt="DivulgAqui C&M Software"/>

                <h1><center>Cadastrar novo produto</center></h1>
                <p>Descreva o produto detalhadamente para aumentar suas chances de ganhar uma grana extra</p>

                <Link className='back-link' to="/profile">
                    <FiArrowLeft size={21} color='ffcc00' />
                    Voltar para home</Link>
            </section></center>

            <form>
                <input placeholder='Titulo do produto'/>
                <textarea placeholder='Descrição'/>
                <input placeholder='Valor em reais'/>
                
                <button className='button' type='submit'>Cadastrar</button>
            </form>
        </div>
    </div>
    )
}