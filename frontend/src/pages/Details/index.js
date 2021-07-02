import React, { useEffect, useState } from 'react';
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

import './styles.css';

export default function Details() {
  const { goBack } = useHistory();
  const params = useParams();
  const [produto, setProduto] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [dadosVendedor, setDadosVendedor] = useState([]);


        useEffect(() => {
          api.get(`vendedor/${dadosVendedor.id}`).then(response =>{
              setDadosVendedor(response.data)    
          });
      }, [dadosVendedor.id]);

        useEffect(() => {
            api.get(`produtos/${params.id}`).then(response =>{
                setProduto(response.data)    
            });
        }, [params.id]);

        if (!produto){
          return <p>Carregando...</p>;
        }   
      // "Foi necessario desestruturar o array de imagens, pois o metodo 'produto.images[0].url' nao me trazia resultados "
      const img = produto.images;
      
      let allImg = []
      let indexImage = []

      for (var x in img){
        var dic = new Object();
        dic.id = img[x].id
        dic.url = img[x].url
        allImg.push(dic)
        indexImage.push(allImg[x].url);
      }

  return (
    <div id="page-orphanage">
      <aside>
        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>  

      <main>
        <div className="orphanage-details">
          <img src={indexImage[activeImageIndex]} alt="Lar das meninas" />

          <div className="images">
            {allImg.map((image, index) => {
              return(
                <button key={image.id} 
                className={activeImageIndex === index ? 'active' : '' } 
                type="button"
                onClick={() => {
                  setActiveImageIndex(index);
                }}>
                  <img src={image.url} alt={produto.title} />
                </button>
               )
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{produto.title}</h1>

            <p>{produto.description + ', R$: ' + produto.value }</p>

            <h2>Informações do vendedor:</h2>
            
            <div className="open-details">
              <div className="hour">
                <h3>{dadosVendedor.name}<br/></h3>< br/>
                Whatsapp:< br/>
                <FaWhatsapp size={28} color="#15B6D6" /> {dadosVendedor.whatsapp}< br/>< br/>
                Ramal:<br/>
                <FaPhone size={28} color="#15B6D6" /> {dadosVendedor.extension}< br/>< br/>    
                E-mail:<br/>
                <FiMail size={28} color="#15B6D6" /> {dadosVendedor.email}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
