import React, {useState, ChangeEvent, FormEvent } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import swal from 'sweetalert';
import './styles.css';

import Header from '../../components/Header';
import Input from '../../components/Layout/Input';

import user from '../../assets/people/login.png';

import api from '../../services/api'

const Login = () => {

    const[formData,setFormData] = useState({
        ds_email : '',
        ds_senha: ''
    });

    const history = useHistory();

    async function SubmitToLogin( event : FormEvent ){
        event.preventDefault();

        console.log(formData);

        const { ds_email, ds_senha} = formData;

        api.request({
            method: 'POST',
            url: `/user`,
            data: {
              ds_email: ds_email,
              ds_senha : ds_senha
            },
          
          }).then(function(response){

              if(response.data.userData){

                const userData = response.data.userData[0];

                localStorage.setItem("userData", JSON.stringify(userData));
                localStorage.setItem("token",response.data.token);

                history.push('/comp/Dashboard');
              }
              else{
                swal({
                    title: "Erro!",
                    text: "Usuário ou senha inválidos!",
                    icon: "error"
                  });
              }
          }).catch(function(err){
                swal({
                    title: "Erro!",
                    text: "Ocorreu um erro interno, favor contatar a administração : " + err,
                    icon: "error"
                  });
          });
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