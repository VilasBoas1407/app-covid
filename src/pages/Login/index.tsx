//Teste
import React, {useState, ChangeEvent, FormEvent } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

import Header from '../../components/Header';
import Input from '../../components/Layout/Input';

import user from '../../assets/people/login.png';

import api from '../../services/api'
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
      width : '100%',
      background : '#F0F0F5',
      borderRadius : '8px',
      border : 0,
      padding : ' ',
      fontSize : 16,
      color :  '#6C6C80'
    },
    formControl_hasError: {
        border:1,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FF0000',
        width : '100%',
        background : '#F0F0F5',
        borderRadius : '8px',
        fontSize : 16,
    },
    spanError :{
        color: '#FF0000',
        fontSize: 12,
        fontStyle: '#FF0000',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const Login = () => {

    const[formData,setFormData] = useState({
        ds_email : '',
        ds_senha: ''
    });

    const[selectedType,setSelectedType] = useState('worker');

    const history = useHistory();
    const classes = useStyles();

    function handleSelect(event : any){
        setSelectedType(event.target.value); 
    }

    async function SubmitToLogin( event : FormEvent ){
        event.preventDefault();

        const { ds_email, ds_senha} = formData;

        if(selectedType === 'worker'){
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
    
                    history.push('/user/Details');
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
        else{
            api.request({
                method: 'POST',
                url: `/company`,
                data: {
                  ds_email: ds_email,
                  ds_senha : ds_senha
                },
              
              }).then(function(response){
    
                  if(response.data.auth){
    
                    const userData = response.data.userData[0];
    
                    localStorage.setItem("userData", JSON.stringify(userData));
                    localStorage.setItem("token",response.data.token);
                    localStorage.setItem("loginUser", "false");
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

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    }
    
    return(
        <Container component='main' maxWidth='xs' id="page-login">
                            
            <header className='header'>
                <Header /> 
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <div className="content">

                <form onSubmit={SubmitToLogin} className="form">
                    <img src={user} alt="Pessoa com cadeado"  width="300px" height="300px"/>
                    <br/>
                    <h2>Bem Vindo de Volta!</h2>
                    <br/>
                    <br/>
                    <Grid  container spacing={1}>
                             <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Eu sou:</InputLabel>
                                    <Select
                                        native={false}
                                        label="Selecione sua empresa:"
                                        name="company"
                                        onChange={handleSelect}
                                        value={selectedType}
                                    >
                                        <option aria-label="Empregado" value="worker">Funcionário</option>
                                        <option aria-label="Empresa" value="company">Empresa</option>
                                    </Select>
                              </FormControl>
                    </Grid>
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
        </Container>
    )
};

export default Login;