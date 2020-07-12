import React, { useState, ChangeEvent,FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import './styles.css';

import Header from '../../components/Header';

import api from '../../services/api';  

  
const CreatePoint = () => {

    const [formData,setFormData] = useState({
        ds_email : '',
        ds_senha : '',
        ds_senha_confirm: '',
        ds_nome : '',
        ds_cpf : '',
        ds_telefone :'',
        id_emp : ''
    });

    function handleInputChange(event : ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target;
        setFormData({...formData, [name]: value });
    }

    async function registerUser( event : FormEvent ){
        event.preventDefault();

        console.log(formData);
    }

    return (
        <div id="page-create-point">
            <header>
                <Header />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
        
            <form onSubmit={registerUser}>
                <h1> Cadastro de funcionário</h1>
                <fieldset>
                    <legend>
                        <h2>
                            Dados
                        </h2>
                    </legend>
                    <div>
                        <Grid container spacing={3}>
                                <TextField
                                    label="Nome Completo"
                                    id="ds_nome"
                                    name="ds_nome"
                                    variant="outlined"
                                    className="input-form"
                                    onChange={handleInputChange}
                                />
                        </Grid>
                        <br/>
                    </div>
                    <br/>
                    <div>
                        <Grid container spacing={3}>
                                <TextField
                                    label="Telefone"
                                    id="ds_telefone"
                                    name="ds_telefone"
                                    variant="outlined"
                                    className="input-form"
                                    onChange={handleInputChange}
                                />
                        </Grid>
                        <br/>
                    </div>
                    <br/>
                    <div>
                        <Grid container spacing={3}>
                                <TextField
                                    label="CPF"
                                    id="ds_cpf"
                                    name="ds_cpf"
                                    variant="outlined"
                                    className="input-form"
                                    onChange={handleInputChange}
                                />
                        </Grid>
                        <br/>
                    </div>
                    <div>
                        <br/>
                        <Grid container spacing={3}>
                                <TextField
                                        label="Email"
                                        id="ds_email"
                                        name="ds_email"
                                        variant="outlined"
                                        className="input-form"
                                        onChange={handleInputChange}
                                />
                        </Grid>
                        <br/>
                        <br/>
                        <Grid container spacing={3}>
                            <Grid  xs={12} sm={6} item>
                                    <TextField
                                        label="Senha"
                                        id="ds_senha"
                                        name="ds_senha"
                                        type="password"
                                        variant="outlined"
                                        className="input-form"
                                        onChange={handleInputChange}
                                    />
                            </Grid>
                            <br/>
                            <br/>
                            <Grid  xs={12} sm={6} item>
                                    <TextField
                                        label="Confirme sua Senha"
                                        id="ds_senha_confirm"
                                        name="ds_senha_confirm"
                                        type="password"
                                        variant="outlined"
                                        className="input-form"
                                        onChange={handleInputChange}
                                    />
                            </Grid>
                        </Grid>
                    </div>
                </fieldset>
                <div>
                    <button type="submit" className="button-confirm">
                        Criar Conta
                    </button>
                </div>

            </form>
        </div> 
    );
}

export default CreatePoint;