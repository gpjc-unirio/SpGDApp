import React, { useEffect, useState } from 'react';
import './etapatres.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, where, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../services/FirebaseConnection';
import { idProjEtapa } from '../detalheProjeto/detalheProjeto';
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import documentoPDF from '../documento/documento';

export var idResposta = ("");

export default function EtapaTres() {

    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    
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
        getEtapaTres();
    }, []);

    const getEtapaTres = async () => {
        const q = query(collection(db, "relacionamento"), where("idProjeto", "==", idProjEtapa))
        const data = await getDocs(q);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    async function verRelacionamento(resposta) {        
        idResposta = resposta;
        console.log(resposta)
        navigate('/relacionamento');
    }

    function gerarDocumento(){
        navigate('/documento')
    }

    return (
        <>

            <Header />

            <h2>Brainstorming</h2>
            <TableContainer component={Paper} className='tabela-questoes'>

                <Table sx={{ minWidth: 300 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className='table'>Nível</StyledTableCell>
                            <StyledTableCell align="right" className='table'>Questão</StyledTableCell>
                            <StyledTableCell align="right" className='table'>Resposta</StyledTableCell>
                            <StyledTableCell align="right" className='table'>Elemento</StyledTableCell>
                            <StyledTableCell align="right" className='table'></StyledTableCell>
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
                                <StyledTableCell align="right" className='table'>{row.resposta}</StyledTableCell>
                                <StyledTableCell align="right" className='table'>{row.elemento}</StyledTableCell>
                                <AddIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
                                    className="cursor-pointer" onClick={() => { verRelacionamento(row.resposta) }} />
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <br></br>

            <div className='bt-explorar'>
                <button type="submit" className='bt-projetos' onClick={gerarDocumento}><PictureAsPdfIcon/> Gerar Documento</button>
            </div>

        </>
    );

}
