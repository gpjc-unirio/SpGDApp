import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import React, {useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import './login.css';

import Icone from '../../assets/icone.png';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

export default function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { signIn } = useContext(AuthContext);
  
  function handleLogin(e) {
    e.preventDefault();
    signIn(email,senha);
  }
/*
  async function signIn(email, senha) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.id);
      })
      .catch((error) => {        
        console.log(error);
        if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
            alert('email ou senha inválido');
        }
      });
  }
*/


  return (
    <>

      <div className="card">
        <form className="form" onSubmit={handleLogin}>

          <div className="card-top">
            <h1 className="azul">Game Design 4 Training System</h1>
            <hr></hr>
          </div>

          <img src={Icone} width="30%" alt="Icone Joystick" id="joystick"></img>

          <div className='form'>

            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />
            <FormControl fullWidth>
              <InputLabel>Senha</InputLabel>
              <Input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </FormControl>
          </div>

          <br />
          <div className='button'>

            <div className="div-entrar">
              <button className="button-azul" type="submit" value="Entrar">Entrar</button>
            </div>

            <Link to="/cadastro">
              <div className='div-novo'>
                <button className="button-azul" type="button">Novo Usuário</button>
              </div>
            </Link>
          </div>
        </form>
      </div>
      <br />


    </>
  );

}

;