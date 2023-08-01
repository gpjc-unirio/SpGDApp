import React from 'react';

import './relacionamento.css';
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
import { idResposta } from '../etapatres/etapatres';
import { db } from '../../services/FirebaseConnection';
import { collection, where, getDocs, query, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from "@mui/icons-material/Delete";
import { idProjEtapa } from '../detalheProjeto/detalheProjeto';

export default function Relacionamento() {

    const [rows, setRows] = useState([]);
    const [infoRelacionamento, setInfoRelacionamento] = useState([]);
    var lista = useState([]);
    const [listaSecao, setListaSecao] = useState([]);
    const [elemento, setElemento] = useState("");
    const [ideia, setIdeia] = useState("");
    const [resposta, setResposta] = useState("");
    const navigate = useNavigate();
    const [personName, setPersonName] = useState([]);
    const theme = useTheme();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

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
        getRelacionamento();
        getIdeias();
        mostraLista();
    }, []);

    const getRelacionamento = async () => {
        const q = query(collection(db, "relacionamento"), where("resposta", "==", idResposta))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            lista = {
                id: doc.id,
                nivel: doc.data().nivel,
                questao: doc.data().questao,
                resposta: doc.data().resposta,
                elemento: doc.data().elemento
            }
        });
        setInfoRelacionamento(lista);
        setResposta(lista.resposta);
    };

    const getIdeias = async () => {
        const q = query(collection(db, "ideia"), where("resposta", "==", idResposta))
        const data = await getDocs(q);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            //value
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(value);
        console.log(value.length)
        const lista = [];
        for (let i = 0, l = value.length; i < l; i += 1) {

            lista.push(value[i] + " | ");

        }
        setSecaogdd(lista);
        console.log(lista)
    };

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    function verid() {
        console.log()
    }

    const names = [
        'Narrativa',
        'Game Play',
        'Mecânica',
        'Regras',
        'Personagens',
    ];

    const elementos = [
        'Mecânica',
        'Dinâmica',
        'Estética'
    ];

    const [secaogdd, setSecaogdd] = useState([]);
    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value, " | ");
            }
        }
        //setSecaogdd(value);
        console.log(value)
    };

    async function mostraLista() {
        const lista = [];
        const q = query(collection(db, "secaogdd"))
        const data = await getDocs(q)
        data.forEach((doc) => {
            lista.push(doc.data().secao)
        });
        //setListaUsers(listaUsuarios);
        //console.log(listaUsers)
        setListaSecao(lista)
        console.log(lista)
        console.log(listaSecao)
        //console.log(listaUsuarios)
        //console.log(doc.data())
    }


    async function addIdeia(e) {
        e.preventDefault();
        adicionar(ideia, secaogdd, resposta, idProjEtapa);
    }

    async function adicionar(ideia, secaogdd, resposta, idProjEtapa) {
        const docRef = addDoc(collection(db, "ideia"), {
            ideia: ideia,
            secaogdd: secaogdd,
            resposta: resposta,
            idProjeto: idProjEtapa
        })
    }

    async function excluirIdeia(id){
        console.log(id)
        await deleteDoc(doc(db, "ideia", id));
    }

    return (
        <>

            <Header />
            
            <p><strong>Nível: </strong>{infoRelacionamento.nivel}</p>
            <p><strong>Questão: </strong>{infoRelacionamento.questao} </p>
            <p><strong>Resposta: </strong>{infoRelacionamento.resposta}</p>
            <p><strong>Elementos de Jogo: </strong>{infoRelacionamento.elemento}</p>

            <h3>Ideias</h3>
            <TableContainer component={Paper} className='tabela-questoes'>
                <Table sx={{ minWidth: 300 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className='table'>Ideia</StyledTableCell>
                            <StyledTableCell align="right" className='table'>Seção GDD</StyledTableCell>
                            <StyledTableCell align="right" className='table'>Excluir</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow
                                key={row.ideia}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" className='table'>
                                    {row.ideia}
                                </StyledTableCell>
                                <StyledTableCell align="right" className='table'>{row.secaogdd}</StyledTableCell>
                                <StyledTableCell align="right" className='table'>
                                    <DeleteIcon style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                                        onClick={() => { excluirIdeia(row.id) }} />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <br></br>

            <br></br>


            <div className='nova-ideia'>
                <h3>Adicionar Nova Ideia</h3>
                <div className='descricao-ideia'>
                    <TextField
                        fullWidth
                        id="fullWidth"
                        label="Nova Ideia"
                        multiline
                        rows={9}
                        maxRows={20}
                        value={ideia}
                        onChange={(e) => setIdeia(e.target.value)}
                    />
                </div>
            </div>
            <h3>Seção do GDD</h3>
            <div className='infos-elementos'>
                <div className='select-secaogdd'>                    
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                        <InputLabel shrink htmlFor="select-multiple-native">
                            Seção GDD
                        </InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            className='select-secaogdd'
                            multiple
                            fullWidth
                            value={personName}
                            label="Adicionar Seção"
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {listaSecao.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personName, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className='bt-incluir-ideia'>
                    <button type="submit" className='bt-projetos' onClick={addIdeia}>Incluir Ideia</button>
                </div>

            </div>

            <Link to='/secaogdd'><p>Deseja incluir uma nova Seção? Clique aqui</p></Link>

        </>

    );

}