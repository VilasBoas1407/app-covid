import React from 'react';


import logo from '../../assets/coronavirus.svg';
import './styles.css';

const Header = () => {
    return(
        <header>
        <div className="row">
            <h1 className="title">Stop Covid-19</h1>
            <img src={logo} alt="covid-icon" height="64px" width="64px"/>
        </div>
        
    </header>   
    );
};

export default Header;