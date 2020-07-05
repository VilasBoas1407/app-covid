import React, {FormEvent} from 'react';
import {Link} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import Header from '../../components/Header';
import Input from '../../components/Layout/Input';

import user from '../../assets/people/login.png';
const Login = () => {

    function SubmitToLogin( event : FormEvent ){
        console.log("KKK EAE MEN");
        event.preventDefault();
    }
    return(
        <div id="page-login">
                            
            <header>
                <Header /> 
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <div className="content">

                <form onSubmit={SubmitToLogin} className="form">
                    <img src={user} alt="people"  width="300px" height="300px"/>
                    <br/>
                    <h2>Bem Vindo de Volta!</h2>
                    <br/>
                    <div className="field">
                        <label htmlFor="name">E-mail</label>
                        <Input type="text" name="email" id="email" required={true} placeholder="Digite seu e-mail" />
                    </div>
                    <div className="field">
                        <label htmlFor="name">Senha</label>
                        <Input type="password" name="password" id="password" required={true} placeholder="Digite sua senha" />
                    </div>
                    <button type="submit">
                        Login
                    </button>
                </form>
                    
            </div>
        </div>
    )
};

export default Login;