import React,{ useEffect, useState } from 'react';  
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import swal from 'sweetalert';

import Header from '../../../components/Header';
import InputFeel from '../../../components/Layout/InputFeel';

import api from '../../../services/api';

import './styles.css';

interface sintoma {
    ds_sintoma : string,
    id_sintoma: number
}
const Details = () => {

    const history = useHistory();

    const[userData,setUserData] = useState({
        ds_email : '',
        ds_senha : '',
        ds_nome : '',
        ds_cpf : '',
        ds_telefone :'',
        id_emp : ''
    });

    const token = localStorage.getItem('token');

    const [sintomas,setSintomas] = useState([]);

    function doLogout(){
        localStorage.clear();
        history.push('/');
    }

    function loadSintomas(){

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
    useEffect(() => {

        var user = localStorage.getItem('userData');
        if(user)
            setUserData(JSON.parse(user));

        loadSintomas()
    },[])
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
            <form>
                <label>Preencha o formulário de acordo com o que está sentido hoje :</label>
                <br/>
     
                {sintomas.map(function(sintoma: sintoma){
                    return(
                        <div className="field-group"> 
                            <div className="check-box row">
                                <InputFeel label={sintoma.ds_sintoma} name={sintoma.ds_sintoma}/>
                                <label>{sintoma.ds_sintoma}</label>
                                <br/>
                            </div>
                      </div>
                    )
                })
                }
                <button type="submit">
                        Salvar
                    </button>
            </form>
        </div>
    )
};

export default Details;