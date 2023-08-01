import React, { useContext, useState } from 'react';
import { collection, query, getDocs, doc, updateDoc, setDoc, where, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from '../../services/FirebaseConnection';
import { useEffect } from 'react';
import './detalheProjeto.css';
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
import HeaderProjeto from '../../components/header/headerProjeto';
import { Link } from 'react-router-dom';
import { infoProjeto } from '../projeto/projetos';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import DeleteIcon from "@mui/icons-material/Delete";

export var idProjEtapa = ('');

export default function DetalheProjeto() {

    //const {info} = useContext(AuthContext);
    const [rows, setRows] = useState([]);
    const [nome, setNome] = useState([]);
    const [perfil, setPerfil] = useState([]);
    const [projeto, setProjeto] = useState([]);
    const [lista, setLista] = useState([]);
    const [listaId, setListaId] = useState([]);
    const navigate = useNavigate();
    const [descricao, setDescricao] = useState(infoProjeto.descricao);
    const [objetivos, setObjetivos] = useState(infoProjeto.objetivos);
    const idProjeto = useState(infoProjeto.id);
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    var [listaUsuarios, setListaUsuarios] = useState([]);
    const [listaEnvolvidos, setListaEnvolvidos] = useState([]);
    const [listaUsers, setListaUsers] = useState([]);
    const id = useState([]);
    var nomeEnvolvido = useState("");
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    useEffect(() => {
        carregaUsuarios();
        getEnvolvidos();
        //getUsers();
    }, [])

    async function carregaUsuarios() {
        const usuario = [];
        const perfil = [];
        const q = query(collection(db, "users"))
        const data = await getDocs(q)
        data.forEach((doc) => {
            usuario.push(doc.data().nome)
            //perfil: doc.data().perfil
            listaUsuarios.push({
                nome: doc.data().nome,
                perfil: doc.data().perfil
            })
        });
        //setListaUsers(listaUsuarios);
        //console.log(listaUsers)
        setLista(usuario)
        console.log(lista)
        //console.log(listaUsuarios)
        //console.log(doc.data())
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            //value
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(value)
        console.log(listaUsers)
        //addUsuario(value)
    };



    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

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

    function etapaum() {
        navigate('/etapaum')
        idProjEtapa = infoProjeto.id;
        console.log(idProjEtapa);
        return idProjEtapa
    }

    function etapadois() {
        navigate('/etapadois')
        idProjEtapa = infoProjeto.id;
        console.log(idProjEtapa);
        return idProjEtapa
    }

    function etapatres() {
        navigate('/etapatres')
        idProjEtapa = infoProjeto.id;
        console.log(idProjEtapa);
        return idProjEtapa
    }

    async function atualizarProjeto() {
        const mostraProjeto = doc(db, "projeto", infoProjeto.id);
        await updateDoc(mostraProjeto, {
            descricao: descricao,
            objetivos: objetivos
        });
    }

    async function getEnvolvidos() {
        const q = query(collection(db, "projeto"), where("id", "==", infoProjeto.id));
        const querySnapshot = await getDocs(q);
        //setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        querySnapshot.forEach((doc) => {
            let nome = (doc.data().envolvidos.personName)
            setListaEnvolvidos(doc.data().envolvidos.personName)
            console.log(nome)
            getUsers(nome);
        });
    }

    async function getUsers(nome) {
        let lista = []
        const q1 = query(collection(db, "users"))
        const data = await getDocs(q1)
        nome.forEach(nomeUsuario => {
            console.log(nomeUsuario)
            data.forEach((doc) => {
                let value = (doc.data().nome);
                console.log(value)
                if (value == nomeUsuario) {
                    lista.push({
                        id: doc.data().uid,
                        nome: doc.data().nome,
                        perfil: doc.data().perfil
                    })
                    console.log('igual')
                }
            })
        });
        console.log(lista)
        setRows(lista)
        console.log(rows)
    };


    async function addUsuario(value) {
        const addEnvolvidos = doc(db, 'projeto', infoProjeto.id);
        console.log(personName)
        personName.forEach((nome) => {
            console.log(nome)
            updateDoc(addEnvolvidos, {
                "envolvidos.personName": arrayUnion(nome)
            });
        })

    }

    async function deletarUsuario(usuario) {
        await updateDoc(doc(db, 'projeto', infoProjeto.id), {
            "envolvidos.personName": arrayRemove(usuario)
        });
    }


    return (
        <>

            <HeaderProjeto />

            <h2>Descrição</h2>
            <div className='descricao'>
                <TextField
                    fullWidth
                    multiline
                    id="outlined-disabled"
                    label="Descrição"
                    rows={7}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <TextField
                    fullWidth
                    multiline
                    id="outlined-disabled"
                    label="Objetivos de Segurança"
                    rows={7}
                    value={objetivos}
                    onChange={(e) => setObjetivos(e.target.value)}
                />
            </div>

            <br></br>

            <div className='div-novo-user' onClick={atualizarProjeto}>
                <button type="submit" className='bt-projetos'>Atualizar</button>
            </div>


            <div className='display-info'>
                <div className='proprietario'>
                    <h4>Proprietário</h4>
                    <TextField
                        disabled
                        type='text'
                        label='Proprietário'
                        value={infoProjeto.proprietario}
                    />
                </div>

                <div className='criacao'>
                    <h4>Criação</h4>
                    <TextField
                        disabled
                        type='text'
                        label='Proprietário'
                        value={infoProjeto.data}
                    />
                </div>
            </div>

            <div className='tabela-usuarios'>
                <div className='envolvidos'>
                    <h4>Envolvidos</h4>

                    <TableContainer component={Paper}>

                        <Table sx={{ minWidth: 450 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className='table'>Usuário</StyledTableCell>
                                    <StyledTableCell align="right" className='table'>Função</StyledTableCell>
                                    <StyledTableCell align="right" className='table'>Excluir</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow
                                        key={row.nome}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" className='table'>
                                            {row.nome}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" className='table'>{row.perfil}</StyledTableCell>
                                        <DeleteIcon style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                                            onClick={() => { deletarUsuario(row.nome) }}
                                        />
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer>
                </div>

                <div className='display-form-usuario'>
                    <div className='add-usuario'>
                        <h4>Adicionar Usuário</h4>

                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">Nome</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                            >
                                {lista.map((name) => (
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
                    <br></br>

                    <div className='div-novo-user' onClick={addUsuario}>
                        <button type="submit" className='bt-projetos'>Adicionar</button>
                    </div>
                </div>
            </div>


            <h3 className='titulo-etapas'>Etapas Disponíveis</h3>
            <div className='etapas-disponiveis'>

                <div className="card-etapas" onClick={etapaum}>
                    <div className="card-top">
                        <h4 className="azul">Etapa 1</h4>
                        <hr></hr>
                        <p>Compreensão do Treinamento</p>
                    </div>

                </div>

                <div className="card-etapas" onClick={etapadois}>
                    <div className="card-top">
                        <h4 className="azul">Etapa 2</h4>
                        <hr></hr>
                        <p>Mapeamento de Elementos</p>
                    </div>
                </div>

                <div className="card-etapas" onClick={etapatres}>
                    <div className="card-top">
                        <h4 className="azul">Etapa 3</h4>
                        <hr></hr>
                        <p>Brainstorming</p>
                    </div>
                </div>

            </div>

        </>
    );
}