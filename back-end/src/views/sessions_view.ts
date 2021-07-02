import Vendedor from '../models/vendedor';

export default {
    render(vendedor: Vendedor){
        return{
            email: vendedor.email,
            pass: vendedor.pass
        };
    },

    renderMany(vendedor: Vendedor[]){
        return vendedor.map(vendedor => this.render(vendedor));
    }
}
