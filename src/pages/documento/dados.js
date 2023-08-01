import { useEffect, useState } from "react";
import { idProjEtapa } from "../detalheProjeto/detalheProjeto";
import { db } from '../../services/FirebaseConnection';
import { collection, where, getDocs, query } from 'firebase/firestore';

export default function Dados() {

    useEffect(() => {
        getIdeias();
        console.log(lista)
    }, []);

    const [lista, setLista] = useState([])

    const getIdeias = async () => {
        const listaIdeias = []
        const q = query(collection(db, "ideia"), where("idProjeto", "==", "5QtcP73P08fwoDTQU8nh"))
        const data = await getDocs(q);
        data.forEach((doc) => {
            listaIdeias.push({
                id: doc.id,
                ideia: doc.data().ideia,
                secaogdd: doc.data().secaogdd
            })
        });
        console.log(listaIdeias)
        setLista(listaIdeias)
        console.log(lista)
        secao(lista)
    };

    function secao(lista) {
        const listaSecao = []
        const secoes = []
        lista.forEach((secao) => {
            console.log(secao)
            const secaogdd = secao.secaogdd
            secaogdd.forEach((defSecao) => {
                console.log(defSecao)
            })/*
            listaSecao.push({
                secao: secao.secaogdd
            })
            console.log(listaSecao)
            listaSecao.forEach((defSecao) => {
                //console.log(defSecao.secao)
            })*/

        })
        //console.log(listaSecao)
        //console.log(secoes)
    }



    return (
        <>
            <p></p>
        </>
    )
}