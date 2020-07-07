import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';


import './styles.css';

import Header from '../../components/Header';
import Input from '../../components/Layout/Input';

const CreatePoint = () => {


    return (
        <div id="page-create-point">
            <header>
                <Header />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
        
            <form>
                <h1> Cadastro de funcionário</h1>
                <fieldset>
                    <legend>
                        <h2>
                            Dados
                        </h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome Completo</label>
                        <Input
                            type="text"
                            name="name"
                            id="id"
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Telefone</label>
                            <Input
                                type="text"
                                name="tefone"
                                id="telefone"
                            />
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">CPF</label>
                            <Input
                                type="text"
                                name="cpf"
                                id="cpf"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Código Empresa</label>
                            <Input
                                type="text"
                                name="cod_emp"
                                id="cod_emp"
                            />
                        </div>
                    </div>
                </fieldset>
                <div>
                    <button type="submit">
                        Criar Conta
                    </button>
                </div>

            </form>
        </div> 
    );
}

export default CreatePoint;