import React, {useState, useEffect, FormEvent, ChangeEvent} from "react";

import api from "../../services/api";

import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';


import { FiArrowLeft, FiPlus } from "react-icons/fi";

import './style.css';

export default function UpdateProduct() {
  const { goBack } = useHistory();
  const history = useHistory();
  const [produto, setProduto] = useState([]);
  const params = useParams();

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const[images, setImages] = useState([]);
  const[previewImages, setPreviewImages] = useState([]);
  const userId = localStorage.getItem('idUser');
  

  console.log(userId)

    if (!userId){
      history.push('/logon');
      alert('Por favor faça login para cadastrar seus produtos!');
      
      
    }

  
    // function getMoney( str )
    // {
    //         return formatReal(parseInt( str.replace(/[\D]+/g,'') ));
            
    // }

    useEffect(() => {
      api.get(`produtos/${params.id}`).then(response =>{
          setProduto(response.data)    
        });
      }, [params.id]);

    function formatReal( int )
    {
          int = parseInt( int.replace(/[\D]+/g,'') );
            var tmp = int+'';
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
            if( tmp.length > 6 )
                    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

            return tmp;
    }


  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if (!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages([...selectedImages]);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });
    setPreviewImages([...selectedImagesPreview]);

  }

  async function handleSubmit(event){
    event.preventDefault();

    const data = new FormData();

    data.append('title', title);
    data.append('description', description);
    data.append('value', formatReal(value));
    data.append('vendedor_id', userId);
    
    images.forEach(image => {
      data.append('images', image);
    })
    await api.post(`/update/${params.id}`, data);
    
    alert(`${title} Atualizado(a) com sucesso!`);

    history.push('/profile');
    
  }  

  return (
    <div id="page-create-product">
      <aside>
        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>

      <main>
        <form onSubmit={handleSubmit} className="create-product-form">
          <fieldset>
            <legend>Dados do Produto</legend>

            <div className="input-block">
              <label htmlFor="name">Nome do produto</label>
              <input id="name" value={title} onChange={event => setTitle(event.target.value)} placeholder={produto.title} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Descrição <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" value={description}  onChange={event => setDescription(event.target.value)} maxLength={300} placeholder={produto.description} />
            </div>

            <div className="input-block">
              <label htmlFor="name">Valor</label>
              <input id="name" value={value} onChange={event => setValue(event.target.value)} placeholder={produto.value} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return(
                    <img key={image} src={image} alt={title}/>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
              
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
