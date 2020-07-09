import React, {useState, ChangeEvent, FormEvent } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import Header from '../../components/Header';
import Input from '../../components/Layout/Input';

import user from '../../assets/people/login.png';



const Login = () => {



    const[formData,setFormData] = useState({
        ds_email : '',
        ds_senha: ''
    });

    const history = useHistory();

    function SubmitToLogin( event : FormEvent ){
        event.preventDefault();

        console.log(formData);

        history.push('/comp/Dashboard');
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
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
                        <Input type="text" name="ds_email" id="ds_email" required={true} placeholder="Digite seu e-mail" onChange={handleInputChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="name">Senha</label>
                        <Input type="password" name="ds_senha" id="ds_senha" required={true} placeholder="Digite sua senha" onChange={handleInputChange}/>
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