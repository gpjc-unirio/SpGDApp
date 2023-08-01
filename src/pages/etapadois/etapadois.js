import React, { useState, useEffect } from 'react';
import './etapadois.css';
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
import Header from '../../components/header/header';
import { db } from '../../services/FirebaseConnection';
import { collection, where, getDocs, query, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from "@mui/icons-material/Delete";

export default function EtapaDois() {
    const [rows, setRows] = useState([]);
    const [rowsRelac, setRowsRelac] = useState([]);
    const [elemento, setElemento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [lista] = useState([]);
    const [questao] = useState("");
    const [nivel, setNivel] = useState("");
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    /*var questaoSelec = useState("");
    var nivelSelec = useState("");
    var elementoSelec = useState("");
    var descricaoSelec = useState("");*/

    const [questaoSelec, setQuestaoSelec] = useState("");
    const [nivelSelec, setNivelSelec] = useState("");
    const [elementoSelec, setElementoSelec] = useState("");
    const [respostaSelec, setRespostaSelec] = useState("");
    const [state, setState] = useState([]);


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

    useEffect(() => {
        getEtapaDois();
        getRelacionamentos();
    }, []);

    const getEtapaDois = async () => {
        const q = query(collection(db, "resposta"), where("idProjeto", "==", idProjEtapa))
        const data = await getDocs(q);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getRelacionamentos = async () => {
        const q = query(collection(db, "relacionamento"), where("idProjeto", "==", idProjEtapa))
        const data = await getDocs(q);
        setRowsRelac(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    async function addRelacionamento(e) {
        e.preventDefault();
        /*
        const q = query(collection(db, "resposta"), where("idProjeto", "==", idProjEtapa))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data().descricao);

            lista = {
                questao: questaoSelec,
                nivel: nivelSelec,
                descricao: descricaoSelec,
                elemento: elementoSelec
            }*/

        adicionar(questaoSelec, nivelSelec, elementoSelec, respostaSelec)
    }

    async function adicionar(questaoSelec, nivelSelec, elementoSelec, respostaSelec) {
        console.log(questaoSelec)
        const docRef = addDoc(collection(db, "relacionamento"), {
            idProjeto: idProjEtapa,
            questao: questaoSelec,
            nivel: nivelSelec,
            resposta: respostaSelec,
            elemento: elementoSelec
        })
    }


    function createData2(possui, elemento, descricao) {
        return { possui, elemento, descricao };
    }

    function createData3(nivelKirkPatricrelac, questaorelac, respostarelac, elementorelac) {
        return { nivelKirkPatricrelac, questaorelac, respostarelac, elementorelac };
    }

    const rows2 = [
        createData2('[X]', 'Mecânica', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'),
        createData2('[ ]', 'Dinâmica', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'),
        createData2('[X]', 'Estética', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'),
    ];

    const rows3 = [
        createData3('Aprendizado', 'Qual o aprendizado esperado?', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Mecânica | Estética'),
        createData3('Comportamento', 'Observa mudança de comportamento?', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Estética'),
    ];

    function selecao(questao, nivel, resposta) {
        setQuestaoSelec(questao)
        setNivelSelec(nivel)
        setRespostaSelec(resposta)
        console.log(questaoSelec);
        console.log(nivelSelec);
    }

    function selecaoElemento(elemento) {
        setElementoSelec(elemento);
        console.log(elementoSelec)
    }

    async function excluirRelacionamento(id, resposta) {
        await deleteDoc(doc(db, "relacionamento", id));
        /*var idPergunta = ''
        const q = query(collection(db, "ideia"), where("resposta", "==", resposta))
        const data = await getDocs(q);
        data.forEach((doc) => {
            idPergunta = doc.id
        });
        console.log(idPergunta)
        console.log(resposta)        
        if (idPergunta) {
            await deleteDoc(doc(db, "ideia", idPergunta));
        }*/
    }



    async function atualizarEtapa() {
        const mostraEtapa = doc(db, "projeto", idProjEtapa);
        await updateDoc(mostraEtapa, {
            etapa: "Etapa 3"
        });
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
        const q1 = query(collection(db, "resposta"), where("idProjeto", "==", idProjEtapa));
        const data1 = await getDocs(q1);
        data1.forEach((doc) => {
            let value = (doc.data().nivel);
            console.log(value)
            if (value == nivel) {
                lista.push({
                    id: doc.id,
                    idProjeto: idProjEtapa,
                    questao: doc.data().questao,
                    nivel: doc.data().nivel,
                    resposta: doc.data().resposta
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
        getEtapaDois();
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

            <div className='tabelas'>
                <div className='questoes'>
                    <h2>Questões de Treinamento</h2>
                    <TableContainer component={Paper} className='tabela-questoes' >

                        <Table sx={{ minWidth: 300 }} aria-label="customized table" >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className='table'></StyledTableCell>
                                    <StyledTableCell className='table'>Nível</StyledTableCell>
                                    <StyledTableCell align="right" className='table'>Questão</StyledTableCell>
                                    <StyledTableCell align="right" className='table'>Resposta</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell align="right" className='table' onClick={() => { selecao(row.questao, row.nivel, row.resposta) }}><Checkbox /></StyledTableCell>
                                        <StyledTableCell component="th" scope="row" className='table'>
                                            {row.nivel}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" className='table'>{row.questao}</StyledTableCell>
                                        <StyledTableCell align="right" className='table'>{row.resposta}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </TableContainer>

                </div>
                <div className='elementos'>
                    <h2>Elementos de Game Design</h2>
                    <TableContainer component={Paper} className='tabela-questoes'>

                        <Table sx={{ minWidth: 300 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className='table'> </StyledTableCell>
                                    <StyledTableCell align="right" className='table'>Elemento</StyledTableCell>
                                    <StyledTableCell align="right" className='table'>Descrição</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows2.map((row) => (
                                    <StyledTableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell align="right" className='table' onClick={() => { selecaoElemento(row.elemento, row) }}><Checkbox /></StyledTableCell>
                                        <StyledTableCell align="right" className='table'>{row.elemento}</StyledTableCell>
                                        <StyledTableCell align="right" className='table'>{row.descricao}</StyledTableCell>
                                    </StyledTableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <br></br>

            <div className='bt-relacionamento'>
                <button type="submit" className='bt-projetos' onClick={addRelacionamento}>Incluir relacionamento</button>
            </div>

            <h2>Relacionamentos</h2>
            <TableContainer component={Paper} className='tabela-questoes'>

                <Table sx={{ minWidth: 300 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className='table'>Nível</StyledTableCell>
                            <StyledTableCell align="right" className='table'>Questão</StyledTableCell>
                            <StyledTableCell align="right" className='table'>Resposta</StyledTableCell>
                            <StyledTableCell align="right" className='table'>Elemento</StyledTableCell>
                            <StyledTableCell align="right" className='table'>Excluir</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsRelac.map((row) => (
                            <StyledTableRow
                                key={row.nivel}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" className='table'>
                                    {row.nivel}
                                </StyledTableCell>
                                <StyledTableCell align="right" className='table'>{row.questao}</StyledTableCell>
                                <StyledTableCell align="right" className='table'>{row.resposta}</StyledTableCell>
                                <StyledTableCell align="right" className='table'>{row.elemento}</StyledTableCell>
                                <StyledTableCell align="right" className='table'>
                                    <DeleteIcon style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                                        onClick={() => { excluirRelacionamento(row.id, row.resposta) }} />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <br></br>

            <div className='bt-concluir'>
                <button type="submit" className='bt-projetos' onClick={atualizarEtapa}>Concluir Etapa</button>
            </div>

        </>
    );
}

