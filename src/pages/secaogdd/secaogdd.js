import React, { useState, useEffect } from 'react';
import './secaogdd.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { db } from '../../services/FirebaseConnection';

import Header from '../../components/header/header';

export default function SecaoGDD() {

    const [rows, setRows] = useState([]);
    const [secao, setSecao] = useState("");
    const [descricao, setDescricao] = useState("");

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
    getSecao();
  }, []);

const getSecao = async () => {
    const q = query(collection(db, "secaogdd"))
    const data = await getDocs(q);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

async function addSecao(e) {
    e.preventDefault();
    adicionar(secao, descricao);
}

async function adicionar(secao, descricao) {
    const docRef = addDoc(collection(db, "secaogdd"), {
        secao: secao,
        descricao: descricao
    })
}

    return (
        <>

            <Header/>

            <div className='secoes-gdd'>
                <div className='tabela-gdd'>

                    <h3>Seções</h3>

                    <TableContainer component={Paper} className='tabela-gdd'>
                        <Table sx={{ maxWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className='table'>Seção</StyledTableCell>
                                    <StyledTableCell align="right" className='table'>Descrição</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow
                                        key={row.secao}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" className='table'>
                                            {row.secao}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" className='table'>{row.descricao}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <br></br>

                    <div className='bt-excluir-secao'>
                        <button className='bt-projetos'>Voltar</button>
                    </div>

                </div>

                <div className='secao-gdd'>
                    <div className='nova-secao'>

                        <h3>Nova Seção</h3>

                        <TextField
                            className='secao'
                            label="Seção"
                            type="text"
                            value={secao}
                            onChange={(e) => setSecao(e.target.value)}
                        />
                        <br></br>
                        <TextField
                            multiline
                            rows={5}
                            className='descricao-gdd'
                            label="Descrição"
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>
                    <br></br>
                    <div className='bt-adicionar-secao'>
                        <button className='bt-projetos' onClick={addSecao}>Adicionar Seção</button>
                    </div>
                </div>
            </div>

        </>
    );
}
