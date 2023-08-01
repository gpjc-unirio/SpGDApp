import React, { useState, useEffect } from 'react';
import './respostas.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { db } from '../../services/FirebaseConnection';
import { collection, where, getDocs, query, addDoc } from 'firebase/firestore';
import Header from '../../components/header/header';
import { idPergunta } from '../etapaum/etapaum';
import { idProjEtapa } from '../detalheProjeto/detalheProjeto';
import { Link } from 'react-router-dom';

function Respostas() {

    const [resposta, setResposta] = useState("");
    const [idProjeto, setIdProjeto] = useState("");
    const [questao, setQuestao] = useState("");
    const [nivel, setNivel] = useState("");
    const projeto = idProjEtapa;

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
        getRespostas();
        verquestao();
        vernivel();
    }, []);


    function verid(respostas) {
        console.log(idPergunta)
    }

    async function vernivel() {
        const q = query(collection(db, "questao"), where("idProjeto", "==", projeto));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idPergunta) {
                setNivel(doc.data().nivel)
                console.log(doc.id);
            }
        });
    }

    async function verquestao() {
        const q = query(collection(db, "questao"), where("idProjeto", "==", projeto));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idPergunta) {
                setQuestao(doc.data().questao)
                console.log(doc.id);
            }
        });
    }

    const [rows, setRows] = useState([]);
    const getRespostas = async () => {
        const q = query(collection(db, "resposta"), where("idPergunta", "==", idPergunta))
        const data = await getDocs(q);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    async function addResposta(e) {
        e.preventDefault();
        adicionar(resposta, idProjeto, idPergunta, questao, nivel);
    }


    async function adicionar(resposta, idProjeto, idPergunta, questao, nivel) {
        const docRef = addDoc(collection(db, "resposta"), {
            resposta: resposta,
            idProjeto: projeto,
            idPergunta: idPergunta,
            questao: questao,
            nivel: nivel
        })
    }

    /*const rows = [
        createData("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
        createData("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
        createData("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
        createData("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
    ];*/

    return (
        <>

            <Header />

            <h3>Questão</h3>
            <p>{questao}</p>

            <h3>Respostas</h3>

            <TableContainer component={Paper} className='tabela-questoes'>
                <Table sx={{ minWidth: 300 }} aria-label="customized table">
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow
                                key={row.resposta}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" className='table'>
                                    {row.resposta}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h3>Nova Resposta</h3>

            <div className='adicionar-resposta'>
                <Box>
                    <div>
                        <TextField
                            className='resposta'
                            label="Resposta"
                            multiline
                            rows={5}
                            maxRows={10}
                            value={resposta}
                            onChange={(e) => setResposta(e.target.value)}
                        />
                    </div>
                </Box>
            </div>
            <br></br>

            <div className='bt-adicionar-resposta'>
                <button type="submit" className='bt-projetos' onClick={addResposta}>Adicionar</button>
            </div>

        </>
    );
}

export default Respostas;