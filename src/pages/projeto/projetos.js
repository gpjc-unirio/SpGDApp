import * as React from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../../services/FirebaseConnection';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/auth";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Header from '../../components/header/header';

import './projetos.css';
import { Menu } from '@mui/material';

export var idProjEtapa = ('');
export var infoProjeto = ([]);

export default function Projetos() {

  const [rows, setRows] = useState([]);
  const [projeto, setProjeto] = useState([]);
  const navigate = useNavigate();
  const { user, signed } = useContext(AuthContext);
  const nomeUser = user.nome;
  const [idUser, setIdUser] = useState(user && user.uid)
  var info = useState([]);
  var [idProj, setIdProj] = useState('');
  //const projetosRef = collection(db, "projeto");
  const [lista, setLista] = useState([]);
  const [descricao, setDescricao] = useState(projeto.descricao);
  const [objetivos, setObjetivos] = useState(projeto.objetivos);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  useEffect(() => {
    getProjects();
    console.log(user)
  }, []);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getId(user){
    console.log(user)
  }

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const getProjects = async () => {
    let idEnvolvidos = []
    let lista = []
    const q = query(collection(db, "projeto"), where("idUser", "==", user.uid))
    const data = await getDocs(q);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  function verProjeto(id, titulo, descricao, objetivos, proprietario, data) {
    infoProjeto = {
      id: id,
      titulo: titulo,
      descricao: descricao,
      objetivos: objetivos,
      proprietario: proprietario,
      data: data
    }
    navigate("/detalheprojeto")
  }

  /*function verProjeto(id, titulo, descricao, objetivos, proprietario, data) {
    info = {
      id: id,
      titulo: titulo,
      descricao: descricao,
      objetivos: objetivos,
      proprietario: proprietario,
      data: data
    }
    setProjeto(info);
    setIdProj = id;
    console.log(titulo);
    handleClickOpenDetalhes(idProj);
  }

  async function carregaUsuarios() {
    const q = query(collection(db, "users"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push(doc.data().nome)
      console.log(doc.data().uid)
    }
    );
    console.log(lista)
  }*/


  function etapaum() {
    navigate('/etapaum')
    idProjEtapa = projeto.id;
    console.log(idProjEtapa);
    return idProjEtapa
  }

  function etapadois() {
    navigate('/etapadois')
    idProjEtapa = projeto.id;
    console.log(idProjEtapa);
    return idProjEtapa
  }

  function etapatres() {
    navigate('/etapatres')
    idProjEtapa = projeto.id;
    console.log(idProjEtapa);
    return idProjEtapa
  }

  async function deletarProjeto(idProjeto) {
    await deleteDoc(doc(db, "projeto", idProjeto));
  }



  async function atualizarProjeto() {
    const washingtonRef = doc(db, "projeto", "5QtcP73P08fwoDTQU8nh");
    await updateDoc(washingtonRef, {
      descricao: descricao
    });
  }

  function SimpleDialog(props) {
    const { onClose, open } = props;

    return (
      <Dialog fullScreen
        open={open}
        onClose={handleCloseDetalhes}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDetalhes}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {projeto.titulo}
            </Typography>
            <Button autoFocus color="inherit" onClick={atualizarProjeto}>
              Salvar
            </Button>
          </Toolbar>
        </AppBar>
        <DialogTitle>{projeto.titulo}</DialogTitle>

        <h2>Descrição</h2>

        <TextField
          fullWidth
          multiline
          type='text'
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <br></br>
        <h2>Objetivos</h2>
        <TextField
          fullWidth
          multiline
          type='text'
          label="Objetivos"
          defaultValue={objetivos}
          onChange={(e) => setObjetivos(e.target.value)}
        />
        <br></br>
        <div className='bloco2'>

          <h4>Proprietário</h4>
          <TextField
            disabled
            type='text'
            label='Proprietário'
            value={projeto.proprietario}
          />


          <h4>Data de Criação</h4>
          <TextField
            disabled
            type='text'
            label='Data de Criação'
            value={projeto.data}
          />
        </div>

        <div>

          <h4>Envolvidos</h4>

          <TableContainer component={Paper}>

            <Table sx={{ minWidth: 200 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className='table'>Usuário</StyledTableCell>
                  <StyledTableCell align="right" className='table'>Função</StyledTableCell>
                  <StyledTableCell align="right" className='table'>Excluir</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow

                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row" className='table'>
                    Fulano de Tal
                  </StyledTableCell>
                  <StyledTableCell align="right" className='table'>Treinador</StyledTableCell>
                  <StyledTableCell align="right" className='table'>Excluir</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>

          </TableContainer>
        </div>

        <div>
          <h4>Adicionar Usuário</h4>
          <FormControl
            fullWidth>
            <InputLabel id="demo-multiple-chip-label">Usuário</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
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

          <br></br><br></br>

          <div>
            <button type="submit" className='bt-projetos'>Adicionar</button>
          </div>
        </div>

        <br></br>

        <h3>Etapas Disponíveis</h3>
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

      </Dialog>

    );
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpenDetalhes = () => {
    //console.log(id);
    setOpen(true);
  };

  const handleCloseDetalhes = (value) => {
    setOpen(false);
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

  return (
    <>
      <Header />


      <div>

        <SimpleDialog
          open={open}
          onClose={handleCloseDetalhes}
        />
      </div>

      <TableContainer component={Paper}>

        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" className='table'>Projeto</StyledTableCell>
              <StyledTableCell align="center" className='table'>Proprietário</StyledTableCell>
              <StyledTableCell align="center" className='table'>Data</StyledTableCell>
              <StyledTableCell align="center" className='table'>Etapa</StyledTableCell>
              <StyledTableCell align="center" className='table'>Excluir</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.projeto}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <StyledTableCell align="center" component="th" scope="row" className='table'>
                  {row.titulo}
                </StyledTableCell>
                <StyledTableCell align="center" className='table'>{row.proprietario}</StyledTableCell>
                <StyledTableCell align="center" className='table'>{row.data}</StyledTableCell>
                <StyledTableCell align="center" className='table'>{row.etapa}</StyledTableCell>
                <StyledTableCell align="center" className='table'>
                  <EditIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
                    className="cursor-pointer" onClick={() => { verProjeto(row.id, row.titulo, row.descricao, row.objetivos, row.proprietario, row.data) }} />
                  <DeleteIcon style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                    onClick={() => { deletarProjeto(row.id) }} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>


      <br></br>


      <div className='div-novo-projeto'>
        <Link to="/novoprojeto">
          <button type="submit" className='bt-projetos'>Novo Projeto</button>
        </Link>
      </div>
    </>
  );

}

