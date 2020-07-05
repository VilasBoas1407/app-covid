import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact/>
            <Route component={Login} path="/login"/>
            <Route component={Register} path="/create-account" />
        </BrowserRouter>
    );
}

export default Routes;



