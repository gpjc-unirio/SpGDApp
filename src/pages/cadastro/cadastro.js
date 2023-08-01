import firebase from '../../services/FirebaseConnection';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../services/FirebaseConnection';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import Header from '../../components/header/header';

import './cadastro.css';
import { Link } from 'react-router-dom';

export default function Cadastro() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [perfil, setPerfil] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const {signUp} = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        signUp(nome, email, perfil, usuario, senha);
    }

/*    async function signUp(nome, email, perfil, usuario, senha) {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const docRef = addDoc(collection(db, "users"), {
                    nome: nome,
                    email: email,
                    perfil: perfil,
                    usuario: usuario
                });
                console.log('cadastrado');
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('email já utilizado');
                }

                console.log(error);
            })

    }*/


    return (
        <>

            <div className='container-center'>
                <div className='register'>
                    <div className='register-title azul'>
                        <h1 className="azul">Game Design 4 Training System - Novo Usuário</h1>
                        <hr />
                    </div>
                    <form id='register' className="form-style" onSubmit={handleSubmit}>

                        <TextField

                            label="Nome completo"
                            type="text"
                            value={nome}
                            required
                            onChange={(e) => setNome(e.target.value)}
                            fullWidth
                        /><br /><br />

                        <TextField

                            label="Email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        /><br /><br />

                        <FormControl

                            fullWidth
                        >
                            <InputLabel>Perfil</InputLabel>
                            <Select
                                value={perfil}
                                onChange={(e) => setPerfil(e.target.value)}
                                required
                            >
                                <MenuItem value={"Treinador"}>Treinador</MenuItem>
                                <MenuItem value={"Game Designer"}>Game Designer</MenuItem>
                            </Select>

                        </FormControl>
                        <br /><br />

                        <div className='div-usuario'>
                            <TextField
                                required
                                label="Usuário"
                                type="text"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                fullWidth
                            /><br /><br />

                        </div>

                        <div className='div-senha'>
                            <TextField
                                required
                                label="Senha"
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                fullWidth
                            /><br /><br />
                        </div>

                        <div className='div-gravar'>
                            <button type="submit" className='button-azul'>Cadastrar</button>
                        </div>



                        <div className='div-cancelar'>
                            <Link to='/'>
                            <button type="button" className='button-azul'>Cancelar</button>
                            </Link>
                        </div>


                    </form>
                    <br />
                </div>
            </div>
        </>
    );

}


