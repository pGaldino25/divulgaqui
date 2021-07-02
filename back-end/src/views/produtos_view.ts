import Produto from '../models/produtos';
import Vendedor from '../models/vendedor';
import imagesView from './images_view';
import produtosView from './produtos_view';

export default {
    render(produto: Produto){
        return{
            id: produto.id,
            title: produto.title,
            description: produto.description,
            value: produto.value,
            images: imagesView.renderMany(produto.images),
            vendedor_id: produto.vendedor

        };

    },

    renderMany(produtos: Produto[]){
        return produtos.map(produto => this.render(produto));
    }
}
