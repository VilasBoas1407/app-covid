import React from 'react';  
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import Header from '../../../components/Header';
import InputFeel from '../../../components/Layout/InputFeel';

import './styles.css';

const Details = () => {

    const history = useHistory();
    function doLogout(){
        history.push('/');
    }
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
                <h1>Olá,Lucas!</h1>
                <br/>
                <label>Último acesso: 05/07/2020 21:30</label>
            </div>
            <form>
                <label>Preencha o formulário de acordo com o que está sentido hoje :</label>
                <br/>
                <div className="field-group"> 
                    <div className="check-box row">
                        <InputFeel label={"Febre"} name={"Febre"}/>
                        <label>Febre</label>
                    </div>
                    <div className="check-box row">
                        <InputFeel label={"Tosse seca"}  name={"TosseSeca"}/>
                        <label>Tosse seca</label>
                    </div>
                    <div className="check-box row">
                        <InputFeel label={"Cansaço"}  name={"Cansaco"}/>
                        <label>Cansaço</label>
                    </div>
                    <div className="check-box row">
                        <InputFeel label={"Febre"} name={"Febre"}/>
                        <label>Febre</label>
                    </div>
                </div>
                <button type="submit">
                        Salvar
                    </button>
            </form>
        </div>
    )
};

export default Details;