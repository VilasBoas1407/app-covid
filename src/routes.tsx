import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Details from './pages/User/Details';
import Dashboard from './pages/Dashboard/Dashboard';
import ListUser from './pages/UserData/ListUser';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact/>
            <Route component={Login} path="/login"/>
            <Route component={Register} path="/create-account" />
            <Route component={Details} path="/user/Details"/>
            <Route component={Dashboard} path="/comp/Dashboard"/>
            <Route component={ListUser} path="/user/List"/>
        </BrowserRouter>
    );
}

export default Routes;



