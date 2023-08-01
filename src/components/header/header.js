import { getAuth, signOut } from "firebase/auth";
import * as React from 'react';
import { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import iconeLogout from '../../assets/log-out 1.png';
import { AuthContext } from "../../context/auth";
import './header.css';

export default function Header() {

    const navigate = useNavigate();

    const { signOut } = useContext(AuthContext);

    async function deslogar() {
        signOut();
        navigate("/");
    }

    return (
        <div>
        <div className="infos-usuario">
            <div className='titulo'>
                <h1>Meus Projetos de Game Design</h1>
            </div>
            <div className='nome-usuario'>
                <div className='perfil'>
                    <h3> Bem vindo, {localStorage.getItem('nome')} </h3>
                </div>
                <button className="buttonLogout button-vermelho" onClick={deslogar}>
                    <div className="divLogout">
                        <img id="logout" src={iconeLogout} alt="iconeLogout" />
                    </div>
                </button>
            </div>

            <br></br><br></br>
            
        </div>
        <hr></hr>
        </div>


    );
}