import React,{ useEffect, useState, ChangeEvent, FormEvent } from 'react';  
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import swal from 'sweetalert';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Header from '../../../components/Header';
import InputFeel from '../../../components/Layout/InputFeel';

import api from '../../../services/api';

import './styles.css';

interface sintoma {
    ds_sintoma : string,
    id_sintoma: number,
    checked : boolean
}
const Details = () => {

    const history = useHistory();

    const[userData,setUserData] = useState({
        ds_email : '',
        ds_senha : '',
        ds_nome : '',
        ds_cpf : '',
        ds_telefone :'',
        id_emp : '',
        id_usuario : ''
    });

    const [formValue, setFormValue] = useState({
        ds_usa_epi : false,
        ds_epi: false,
        ds_possui_epi: false
    });

    const [sintomas,setSintomas] = useState([]);

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userData');
    
    async function handleSubmit( event : FormEvent){
        event.preventDefault();
        var data = {
            id_sintoma : '',
            ds_usa_epi : 0,
            ds_epi: 0,
            ds_possui_epi: 0,
            id_usuario : '',
            dt_consulta : ''
        }

        sintomas.forEach(function(s: sintoma){
            if(s.checked){
                data.id_sintoma += s.ds_sintoma + ", "
            }
        });

        data.ds_epi = formValue.ds_epi ? 1 : 0;
        data.ds_usa_epi = formValue.ds_usa_epi ? 1 : 0;
        data.ds_possui_epi = formValue.ds_possui_epi ? 1 : 0;
        data.id_usuario = userData.id_usuario;
      
        console.log(token)
        api.request({
            method : 'POST',
            url : '/followup',
            headers :{
                'x-access-token' : token
            },
            data: {
                followUp: data
            },
        }).then(function(response){
            console.log(response)
            if(response.data.valid){
                swal({
                    title: "Obrigado!",
                    text:"Sua resposta foi computada com sucesso!",
                    icon: "success",
                })
                .then(() => {
                    localStorage.clear();
                    history.push('/');
                });
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
                text: "Ocorreu um erro interno, favor contatar a administração : " + err,
                icon: "error"
            });
        });
    }

    function handleRadioChange(event : ChangeEvent<HTMLInputElement>){
        const { value,name } = event.target;
        let check = false;
        
        if(value === "true")
            check = true
        setFormValue({
            ...formValue,
            [name] : check
        });
    }

    function doLogout(){
        localStorage.clear();
        history.push('/');
    }

    function addSintoma(sintoma : sintoma){
        sintoma.checked = !sintoma.checked;
    }

    async function loadSintomas(){
        api.request({
            method : 'GET',
            url : '/symptoms',
            headers :{
                'x-access-token' : token
            },
        }).then(function(response){
            setSintomas(response.data.sysmtomsData);
        }).catch(function(err){
            swal({
                title: "Erro!",
                text: "Ocorreu um erro interno, favor contatar a administração : " + err,
                icon: "error"
              });
        })

    }
    
    function loadUser(value : string){
        const user = JSON.parse(value);
        setUserData(user);
        return user.id_usuario;
    }
    async function validateScreen(){
        var user = localStorage.getItem('userData');

        if(user){
       
            await loadSintomas();

            //Busca última resposta do usuário
            
            api.request({
                method : 'GET',
                url : '/lastAnswer',
                headers :{
                    'x-access-token' : token
                },
                params: {
                    idUser: loadUser(user)
                },
            }).then(function(response){
                if(!response.data.valid){
                    swal({
                        title: "Obrigado!",
                        text:"Mas você já respondeu hoje! Volte amanhã",
                        icon: "success",
                    })
                    .then(() => {
                        localStorage.clear();
                        history.push('/');
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
        else
            history.push('/');
    }
    useEffect(() => {

        validateScreen();

    },[]);
    return(
        <div id="page-details">
            <header>
                <Header />
                <button onClick={doLogout}>
                    <FiArrowLeft />
                    Sair
                </button>
            </header>

            <div className="user-data">
                <h1>Olá, {userData.ds_nome}!</h1>
                <br/>
                {/* <label>Último acesso: 05/07/2020 21:30</label> */}
            </div>
            <form onSubmit={handleSubmit}>
                <label className="title">Preencha o formulário de acordo com o que está sentido hoje :</label>
                <br/>
     
                {sintomas.map(function(sintoma: sintoma){
                    return(
                        <div className="field-group"> 
                            <div className="check-box row">
                                <InputFeel label={sintoma.ds_sintoma} name={sintoma.ds_sintoma} onChange={() => addSintoma(sintoma)} value={sintoma.ds_sintoma} checked={sintoma.checked}/>
                                <label>{sintoma.ds_sintoma}</label>
                                <br/>
                            </div>
                      </div>
                    )
                })
                }

                <br/>
                <label className="title">Em relação a sua empresa:</label>
                <br/>
                <label>Você usa EPI'S na sua empresa?</label>
                <RadioGroup aria-label="quiz" name="ds_epi" onChange={handleRadioChange}>
                    <Grid container spacing={3}>
                        <Grid item>
                            <FormControlLabel
                                value={true} 
                                control={<Radio />} 
                                label="Sim"
                                checked={formValue.ds_epi === true}
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel 
                                value={false} 
                                control={<Radio />} 
                                label="Não"
                                checked={formValue.ds_epi === false}
                            />
                        </Grid>  
                    </Grid>
                </RadioGroup>
                <br/>
                <label>Você recebeu EPI'S  da sua empresa  ?</label>
                <RadioGroup aria-label="quiz" name="ds_possui_epi" onChange={handleRadioChange}>
                    <Grid container spacing={3}>
                        <Grid item>
                            <FormControlLabel 
                                name="ds_possui_epi"
                                value={true} 
                                control={<Radio />} 
                                label="Sim"
                                checked={formValue.ds_possui_epi === true}
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel 
                                name="ds_possui_epi"
                                value={false} 
                                control={<Radio />} 
                                label="Não"
                                checked={formValue.ds_possui_epi === false}
                            />
                        </Grid>  
                    </Grid>
                </RadioGroup>
                <br/>
                <label>Você recebeu treinamento sobre o uso de EPI'S ?</label>
                <RadioGroup aria-label="quiz" name="ds_usa_epi" onChange={handleRadioChange}>
                    <Grid container spacing={3}>
                        <Grid item>
                            <FormControlLabel 
                                name="ds_usa_epi"
                                value={true} 
                                control={<Radio />} 
                                label="Sim"
                                checked={formValue.ds_usa_epi === true}
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel 
                                name="ds_usa_epi"
                                value={false}  
                                control={<Radio />} 
                                label="Não"
                                checked={formValue.ds_usa_epi === false}
                            />
                        </Grid>  
                    </Grid>
                </RadioGroup>
                <br/>
                <button type="submit">
                        Salvar
                    </button>
            </form>
        </div>
    )
};

export default Details;