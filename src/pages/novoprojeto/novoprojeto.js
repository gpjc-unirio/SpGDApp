import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../services/FirebaseConnection';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import './novoprojeto.css';
import Header from '../../components/header/header';

function NovoProjeto() {

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [objetivos, setObjetivos] = useState("");
    const [projeto, setProjeto] = useState([]);
    const [id, setId] = useState("");
    const data = new Date();
    var diaHoje = data.getDate();
    var mesHoje = data.getMonth() + 1;
    var anoHoje = data.getFullYear();
    var stringData = diaHoje + "/" + mesHoje + "/" + anoHoje;
    const { user } = useContext(AuthContext);
    const nomeUser = user.nome;
    const navigate = useNavigate();

    async function addProjeto(e) {
        e.preventDefault();
        adicionar(titulo, descricao, objetivos);
    }


    async function adicionar(titulo, descricao, objetivos) {
        const docRef = addDoc(collection(db, "projeto"), {
            id: id,
            titulo: titulo,
            descricao: descricao,
            objetivos: objetivos,
            data: stringData,
            proprietario: nomeUser,
            etapa: "Etapa 1",
            idUser: user.uid,
            envolvidos: {personName: [user.nome]},
            idEnvolvidos: user.uid
        }).then(function (docRef) {
            //console.log(docRef.id)
            const atualizaId = doc(db, "projeto", docRef.id);
            updateDoc(atualizaId, {
            id: docRef.id
        });
            /*setIdProj(docRef.id);
            console.log("Document written with ID: ", docRef.id);
            setId(docRef.id);*/
            navigate('/projetos')
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
            
    }

    return (
        <>

            <Header />

            <form id='register' className="form-style" onSubmit={addProjeto}>

                <Box>

                    <div className='titulo-novo-projeto'>
                        <TextField
                            label="Título"
                            type="text"
                            fullWidth
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>

                    <br></br>

                    <div className='descricao'>
                        <TextField
                            fullWidth
                            label="Descrição"
                            type="text"
                            value={descricao}
                            multiline
                            rows={5}
                            maxRows={10}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    <br></br>

                    <div className='objetivos'>
                        <TextField
                            fullWidth
                            label="Objetivos de Segurança"
                            type="text"
                            value={objetivos}
                            multiline
                            rows={5}
                            maxRows={10}
                            onChange={(e) => setObjetivos(e.target.value)}
                        />
                    </div>

                </Box>

                <br></br>


                <div className='div-gravar-projeto'>
                    <button type="submit" className='button-azul'>Gravar</button>
                </div>


                <Link to="/projetos">
                    <div className='div-cancelar-projeto'>
                        <button type="button" className='button-azul'>Cancelar</button>
                    </div>
                </Link>

            </form>


        </>
    );
}

export function recebeId(idProj) {
    const id = idProj;
    console.log(idProj)
}

export default NovoProjeto;
