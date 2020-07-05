//Parei em 01:00:00

import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import Header from '../../components/Header';

const Home = () => {
    return(
        <div id="page-home">
            <div className="content">
                <Header />
                <main>
                    <h1>Ajude sua empresa a combater o COVID-19.</h1>
                    <p>Responda o questiónario diaremente sobre como está se sentindo.</p>

                    <div className="row">
                        <Link to="/login">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Login</strong>
                        </Link>
                        
                        <Link to="/create-point">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Criar conta</strong>
                        </Link>
                    </div>
                  
                </main> 
            </div>
        </div>
    )
}

export default Home;