import { useEffect, useState } from "react";
import { idProjEtapa } from "../detalheProjeto/detalheProjeto";
import { db } from '../../services/FirebaseConnection';
import { collection, where, getDocs, query } from 'firebase/firestore';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export default function DocumentoPDF() {

    useEffect(() => {
        getIdeias();
        getRespostas();
        getRelacionamento();
        console.log(lista.ideia)
        console.log(idProjEtapa)
    }, []);

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const [lista, setLista] = useState([]);
    const [respostas, setRespostas] = useState([]);
    const [relacionamento, setRelacionamento] = useState([]);

    const reportTitle = [
        {
            text: 'Game Design',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45]
        }
    ];

    const dadosResposta = respostas.map((info) => {
        return [
            { text: info.nivel, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: info.questao, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: info.resposta, fontSize: 9, margin: [0, 2, 0, 2] }
        ]
    })

    const dadosRelacionamento = relacionamento.map((info) => {
        return [
            { text: info.nivel, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: info.elemento, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: info.resposta, fontSize: 9, margin: [0, 2, 0, 2] }
        ]
    })

    const dados = lista.map((info) => {
        return [
            { text: info.ideia, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: info.secaogdd, fontSize: 9, margin: [0, 2, 0, 2] }
        ]
    })

const details = [
    { text: 'Compreender Treinamento', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    {
        style: 'tableExample',
        table: {
            headerRows: 1,
            body: [
                [{ text: 'Nível', style: 'tableHeader' }, { text: 'Questão', style: 'tableHeader' }, { text: 'Resposta', style: 'tableHeader' }],
                ...dadosResposta
            ]
        },
        layout: 'headerLineOnly'
    },
    { text: 'Mapear Treinamento', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    {
        style: 'tableExample',
        table: {
            headerRows: 1,
            body: [
                [{ text: 'Nível', style: 'tableHeader' }, { text: 'Elemento', style: 'tableHeader' }, { text: 'Resposta', style: 'tableHeader' }],
                ...dadosRelacionamento
            ]
        },
        layout: 'headerLineOnly'
    },
    { text: 'Brainstorming', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    {
        style: 'tableExample',
        table: {
            headerRows: 1,
            body: [
                [{ text: 'Ideia', style: 'tableHeader' }, { text: 'Seção GDD', style: 'tableHeader' }],
                ...dados
            ]
        },
        layout: 'headerLineOnly'
    }

    
];
/*table:{
    headerRows:1,
    widths: ['*', '*'],
    body:[
        [
            {text: 'Ideia', style: 'tableHeader', fontSize: 10},
            
        ],
        ...dados
    ]
},
layout: 'headerLineOnly'*/

//const rodape = []
function Rodape(currentPage, pageCount) {
    return ({
        text: currentPage + '/' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 0]
    })
}

const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],
    header: [reportTitle],
    content: [details],
    footer: Rodape
}

const getIdeias = async () => {
    const listaIdeias = []
    const q = query(collection(db, "ideia"), where("idProjeto", "==", idProjEtapa))
    const data = await getDocs(q);
    data.forEach((doc) => {
        listaIdeias.push({
            ideia: doc.data().ideia,
            secaogdd: doc.data().secaogdd
        })
    });
    console.log(listaIdeias)
    setLista(listaIdeias)
    console.log(lista)
};

const getRespostas = async () => {
    const listaRespostas = []
    const q = query(collection(db, "resposta"), where("idProjeto", "==", idProjEtapa))
    const data = await getDocs(q);
    data.forEach((doc) => {
        listaRespostas.push({
            nivel: doc.data().nivel,
            questao: doc.data().questao,
            resposta: doc.data().resposta
        })
    });
    console.log(listaRespostas)
    setRespostas(listaRespostas)
    console.log(respostas)
};

const getRelacionamento = async () => {
    const listaRelacionamento = []
    const q = query(collection(db, "relacionamento"), where("idProjeto", "==", idProjEtapa))
    const data = await getDocs(q);
    data.forEach((doc) => {
        listaRelacionamento.push({
            nivel: doc.data().nivel,
            elemento: doc.data().elemento,
            resposta: doc.data().resposta
        })
    });
    console.log(listaRelacionamento)
    setRelacionamento(listaRelacionamento)
    console.log(relacionamento)
};

pdfMake.createPdf(docDefinitions).download();

}

