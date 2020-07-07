import React from 'react';


import logo from '../../assets/abrasel/logo.png';
import './styles.css';

const Header = () => {
    return(
        <header>
        <div className="row">
            <img src={logo} alt="covid-icon" height="88px" width="208px"/>
        </div>
        
    </header>   
    );
};

export default Header;