import * as React from 'react';
import Box from '@mui/material/Box';
import TextField, { textFieldClasses } from '@mui/material/TextField';
import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../services/FirebaseConnection';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { idProjEtapa } from '../detalheProjeto/detalheProjeto';

import './novapergunta.css';
import Header from '../../components/header/header';

function NovaPergunta() {

    const [questao, setQuestao] = useState("");
    const [nivel, setNivel] = useState("");
    const [titulo] = useState("");
    const [idProjeto] = useState("");

    async function addQuestao(e) {
        e.preventDefault();
        adicionar(questao, nivel, idProjeto, titulo);
    }

    async function adicionar(questao, nivel, idProjeto, titulo) {
        const docRef = addDoc(collection(db, "questao"), {
            questao: questao,
            nivel: nivel,
            idProjeto: idProjEtapa,            
        })
    }


    return (

        <>

            <Header />

            <h2>Nova Questão</h2>

            <Box>

                <TextField
                    className='questao'
                    label="Questão"
                    type="text"
                    multiline
                    rows={5}
                    value={questao}
                    onChange={(e) => setQuestao(e.target.value)}
                />


                <div className='nivel-kirkpatric'>
                    <div className='nivel'>
                        <h3>Nível</h3>
                        <FormControl className='select-kirkpatric'>
                            <InputLabel>Nível</InputLabel>
                            <Select
                                value={nivel}
                                onChange={(e) => setNivel(e.target.value)}
                            >
                                <MenuItem value={'Reação'}>Reação</MenuItem>
                                <MenuItem value={'Aprendizado'}>Aprendizado</MenuItem>
                                <MenuItem value={'Comportamento'}>Comportamento</MenuItem>
                                <MenuItem value={'Resultado'}>Resultado</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </Box>

            <br></br>

            <div className='bt-nova-pergunta'>
                <button type="submit" className='bt-projetos' onClick={addQuestao}>Cadastrar</button>
                <button type="submit" className='bt-projetos'>Cancelar</button>
            </div>

        </>
    );

}

export default NovaPergunta;