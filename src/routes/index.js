import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from '../pages/login/index';
import Cadastro from '../pages/cadastro/cadastro';
import Projetos from "../pages/projeto/projetos";
import NovoProjeto from "../pages/novoprojeto/novoprojeto";
import DetalheProjeto from "../pages/detalheProjeto/detalheProjeto";
import EtapaUm from "../pages/etapaum/etapaum";
import EtapaDois from "../pages/etapadois/etapadois";
import EtapaTres from "../pages/etapatres/etapatres";
import Relacionamento from "../pages/relacionamento/relacionamento";
import NovaPergunta from "../pages/pergunta/novapergunta";
import Respostas from "../pages/respostas/respostas";
import SecaoGDD from "../pages/secaogdd/secaogdd";
import DocumentoPDF from "../pages/documento/documento";
import Dados from "../pages/documento/dados";

function Rotas(){
    return(
        <Router>            
            <Routes>
                <Route path="/" element= {<Login/>} />
                <Route path='/cadastro' element = {<Cadastro/>} />
                <Route path='/projetos' element={<Projetos/>} />
                <Route path='/novoprojeto' element={<NovoProjeto/>} />
                <Route path='/detalheprojeto' element={<DetalheProjeto/>} />
                <Route path="/etapaum" element = {<EtapaUm/>}/>
                <Route path="/etapadois" element = {<EtapaDois/>}/>
                <Route path="/etapatres" element = {<EtapaTres/>}/>
                <Route path="/relacionamento" element = {<Relacionamento/>}/>
                <Route path="/novapergunta" element = {<NovaPergunta/>}/>
                <Route path="/respostas" element = {<Respostas/>}/>
                <Route path="/secaogdd" element = {<SecaoGDD/>}/>
                <Route path="/documento" element = {<DocumentoPDF/>}/>
                <Route path="/dados" element = {<Dados/>}/>
            </Routes>
        </Router>        
    )
}

export default Rotas;