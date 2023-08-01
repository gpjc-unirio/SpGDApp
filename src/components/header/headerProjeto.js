import { getAuth, signOut } from "firebase/auth";
import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import iconeLogout from '../../assets/log-out 1.png';
import { AuthContext } from "../../context/auth";
import { idProjEtapa } from "../../pages/detalheProjeto/detalheProjeto";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../../services/FirebaseConnection';
import './header.css';

export default function HeaderProjeto() {

    useEffect(() => {
        getProjeto();
    }, []);

    const navigate = useNavigate();
    const idProj = idProjEtapa;
    var nomeProjeto = useState('')

    const { signOut } = useContext(AuthContext);

    async function deslogar() {
        signOut();
        navigate("/");
    }

    async function getProjeto() {
        const q = query(collection(db, "projeto"), where("id", "==", idProjEtapa));
        const querySnapshot = await getDocs(q);
        //setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        querySnapshot.forEach((doc) => {
            nomeProjeto = doc.data().titulo
        });
    }

    return (
        <div>
        <div className="infos-usuario">
            <div className='titulo'>
                <h1>{nomeProjeto}</h1>
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