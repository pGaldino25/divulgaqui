import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AllProducts from './pages/AllProducts';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Details from './pages/Details';
import CreateProduct from './pages/NewProduct';
import UpdateProduct from './pages/UpdateProduct';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ AllProducts } />
                <Route path="/products" exact component={ AllProducts } />
                <Route path="/logon" component={ Logon } />
                <Route path="/register" component={ Register } />
                
                <Route path="/profile" component={ Profile } />
                <Route path="/details/:id" component={ Details } />
                <Route path="/products/new" component={ CreateProduct } />
                <Route path="/products/update/:id" component={ UpdateProduct } />

            </Switch>
        </BrowserRouter>
    );
}