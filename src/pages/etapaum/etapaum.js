import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../../services/FirebaseConnection';
import './etapaum.css';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { idProjEtapa } from '../detalheProjeto/detalheProjeto';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import Header from '../../components/header/header';

import { Link } from 'react-router-dom';

export var idPergunta = ('');

export default function EtapaUm(props) {

    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [questoes, setQuestoes] = useState([]);
    const [nivel, setNivel] = useState("");
    //const idProjeto = idProjEtapa;

    useEffect(() => {
        getEtapaUm();
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(nivelKirkPatric, questao, resposta) {
        return { nivelKirkPatric, questao, resposta };
    }

    /*const rows = [
        createData('Reação', 'Qual é a reação dos treinados durante o treinamento?', 'Ver Respostas'),
        createData('Aprendizado', 'Qual o aprendizado esperado?', 'Ver Respostas'),
        createData('Comportamento', 'Observa mudança de comportamento?', 'Ver Respostas'),
    ];*/

    function mostraId() {
        console.log(idProjEtapa);
    }

    async function getEtapaUm() {
        let lista = [];
        const q = query(collection(db, "questao"), where("idProjeto", "==", idProjEtapa))
        const data = await getDocs(q);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        /*data.forEach((doc) => {
            lista.push({
                id: doc.id,
                idProjeto: idProjEtapa,
                questao: doc.data().questao,
                nivel: doc.data().nivel
              })            
        });
        console.log(lista)
        setRows(lista);*/
        console.log()
        console.log(rows)
    };

    function novaQuestao() {
        console.log(idProjEtapa)
        navigate('/novapergunta')
    }

    function verRespostas(id) {
        console.log(id)
        idPergunta = id;
        navigate('/respostas')
        return idPergunta;
    }

    async function buscaNivel(e) {
        e.preventDefault();
        console.log(nivel)
        mostraBusca(nivel)
    }

    async function mostraBusca(nivel) {
        setRows([])
        console.log(nivel)
        let lista = [];
        const q1 = query(collection(db, "questao"), where("idProjeto", "==", idProjEtapa));
        const data1 = await getDocs(q1);
        data1.forEach((doc) => {
            let value = (doc.data().nivel);
            console.log(value)
            if (value == nivel) {
                lista.push({
                    id: doc.id,
                    idProjeto: idProjEtapa,
                    questao: doc.data().questao,
                    nivel: doc.data().nivel
                })
                console.log('igual')
            }
        })
        console.log(lista)
        console.log(lista)
        setRows(lista)
        console.log(rows)
    }

    function limpaFiltro() {
        setNivel("");
        setRows([])
        getEtapaUm();
    }

    async function deletarPergunta(id) {
        console.log(id)
        await deleteDoc(doc(db, "questao", id));
    }

    async function atualizarEtapa() {
        const mostraEtapa = doc(db, "projeto", idProjEtapa);
        await updateDoc(mostraEtapa, {
            etapa: "Etapa 2"
        });
    }

    return (
        <>
            <Header />
            
            <h2>Busca</h2>
            <div className='busca'>
                <FormControl className='form-busca'>
                    <InputLabel>Buscar</InputLabel>
                    <Select
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                    >
                        <MenuItem value={"Reação"}>Reação</MenuItem>
                        <MenuItem value={"Aprendizado"}>Aprendizado</MenuItem>
                        <MenuItem value={"Comportamento"}>Comportamento</MenuItem>
                        <MenuItem value={"Resultado"}>Resultado</MenuItem>
                    </Select>
                </FormControl>
                <div className='bt-busca' onClick={buscaNivel}>
                    <button type="submit" className='bt-projetos'>Buscar</button>
                </div>
                <div className='bt-busca' onClick={limpaFiltro}>
                    <button type="submit" className='bt-projetos'>Limpar Filtro</button>
                </div>
            </div>

            <h2>Questões de Treinamento</h2>
            <TableContainer component={Paper} className='tabela-questoes'>

                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className='table'>Nível</StyledTableCell>
                            <StyledTableCell align="right" className='table'>Questão</StyledTableCell>
                            <StyledTableCell align="right" className='table'>Resposta</StyledTableCell>
                            <StyledTableCell align="right" className='table'>Excluir</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow
                                key={row.nivel}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" className='table'>
                                    {row.nivel}
                                </StyledTableCell>
                                <StyledTableCell align="right" className='table'>{row.questao}</StyledTableCell>
                                <StyledTableCell align="right" className='table' onClick={() => { verRespostas(row.id) }}><div>Ver Respostas</div></StyledTableCell>
                                <StyledTableCell align="right" className='table'>
                                    <DeleteIcon style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                                        onClick={() => { deletarPergunta(row.id) }} />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className='bt-etapa1'>
                <button type="submit" className='bt-projetos' onClick={novaQuestao}>Nova Questão</button>
                <button type="submit" className='bt-projetos' onClick={atualizarEtapa}>Concluir Etapa</button>
            </div>
        </>
    );

}


