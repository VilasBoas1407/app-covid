import React, { useState, useEffect , ChangeEvent,FormEvent } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import swal from 'sweetalert';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

import Header from '../../components/Header';

import api from '../../services/api';



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
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  interface Company {
    id_emp : number,
    ds_email : string,
    ds_senha : string,
    ds_nome : string,
    ds_cnpj : string,
    dt_cadastro : Date
  }
const CreatePoint = () => {

    const history = useHistory();
    const classes = useStyles();

    const [companies,setCompanies] = useState([]);
    const [selectedCompany,setSelectedCompany] = useState('');

    const [formValue, setFormValue] = useState({
        type: 'worker',
        formName : 'Funcionário',
        formValidate : {
            all_ok: true,
            ds_cpf : true,
            ds_email : true,
            ds_senha : true,
            ds_nome : true,
            ds_cnpj : true
        },
    });


    const [formData,setFormData] = useState({
        ds_email : '',
        ds_senha : '',
        ds_senha_confirm: '',
        ds_nome : '',
        ds_cpf : '',
        ds_telefone :'',
        id_emp : ''
    });

    //#region Function Inputs

    function handleInputChange(event : ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target;
        setFormData({...formData, [name]: value });
    }

    function handleSelect(event : any){
        setSelectedCompany(event.target.value); 
    }


    function handleRadioChange(event : ChangeEvent<HTMLInputElement>){
        const { value } = event.target;
        let formName = '';
        if(value === 'worker')
            formName = 'Funcionário'
        else
            formName = 'Empresa'
        setFormValue({
            ...formValue,
            type : value,
            formName: formName,
        });
    }

    //#endregion

    async function registerUser( event : FormEvent ){
        event.preventDefault();
        let userData = {  
            ds_email : '',
            ds_senha : '',
            ds_nome : '',
            ds_cpf : '',
            ds_telefone :'',
            id_emp : ''
        };

        userData.ds_email = formData.ds_email;
        userData.ds_senha = formData.ds_senha;
        userData.ds_cpf = formData.ds_cpf;
        userData.ds_nome = formData.ds_nome;
        userData.ds_telefone = formData.ds_telefone;
        userData.id_emp = selectedCompany;

        //Separar em uma outra função, pois tenho que validar o CPF também, e o e-mail.
        if(userData.ds_senha !== formData.ds_senha_confirm){
            swal({
                title: "Erro!",
                text: "As senhas não batem!",
                icon: "error"
              });
        }  
        else{
            api.request({
                method: 'POST',
                url: `users`,
                data:{
                    userData : userData
                }
            })
            .then(function(response){
                if(response.data.valid){
                    swal({
                        title: "Sucesso!",
                        text: "Usuário Cadastrado com sucesso!",
                        icon: "success"
                      });
                      history.push('/login');
                }   
                else{
                    swal({
                        title: "Erro!",
                        text: response.data.message,
                        icon: "error"
                      });
                }
            }).catch(function(err){
                swal({
                    title: "Erro!",
                    text: err,
                    icon: "error"
                  });
            });
        }    

    }

    useEffect(() => {
        api.request({
            method: 'GET',
            url: `/companies`,
        })
        .then(function(response){
            if(response.data.companyData){
                setCompanies(response.data.companyData);
            }   
            else{
                swal({
                    title: "Erro!",
                    text: response.data.message,
                    icon: "error"
                  });
            }
        }).catch(function(err){});
    },[])

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
                <RadioGroup aria-label="quiz" name="type" onChange={handleRadioChange}>
                    <Grid container spacing={3}>
                            <Grid item>
                                <FormControlLabel 
                                    value="worker" 
                                    control={<Radio />} 
                                    label="Cadastro Funcionário"
                                    checked={formValue.type === 'worker'} 
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel value="company" control={<Radio />} label="Cadastro Empresa"/>
                            </Grid>  
                    </Grid>
                </RadioGroup>
                <h1> Cadastro de {formValue.formName}</h1>
                <fieldset>
                    <legend>
                        <h2>
                            Dados
                        </h2>
                        {
                            formValue.formValidate.all_ok !== true ?<span className={classes.spanError}>Por favor, preencha todos os campos</span>: null

                        }
                        </legend>
                    <div>
                        <Grid container spacing={3}>
                                <TextField
                                    label="Nome Completo"
                                    id="ds_nome"
                                    name="ds_nome"
                                    variant="outlined"
                                    className={
                                        formValue.formValidate.ds_cpf === true ?  classes.formControl : classes.formControl_hasError
                                    }
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
                        <br/>
                        <br/>
                        <Grid  container spacing={3}>
                             <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Selecione sua empresa:</InputLabel>
                                    <Select
                                        native={false}
                                        label="Selecione sua empresa:"
                                        name="company"
                                        onChange={handleSelect}
                                    >
                                        <option aria-label="None" value="" />
                                        {companies.map(function(company : Company,key){
                                            return <option value={company.id_emp} > {company.ds_nome}</option>
                                        })}
                                    </Select>
                              </FormControl>
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