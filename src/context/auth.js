import { useState, createContext, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../services/FirebaseConnection';
import { getAuth } from 'firebase/auth';
import firebase from '../services/FirebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState([]);
    const [signed, setSigned] = useState(false);
    const uid = useState("");
    const auth = getAuth();
    const data = new Date();
    var diaHoje = data.getDate();
    var mesHoje = data.getMonth() + 1;
    var anoHoje = data.getFullYear();
    var stringData = diaHoje + "/" + mesHoje + "/" + anoHoje;

    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem('sistema-user');

            if (storageUser) {
                console.log("entrou");
                setSigned(true);
                setUser(JSON.parse(storageUser));
            }

        }

        loadStorage();
    }, [])



    async function signIn(email, senha) {
        await signInWithEmailAndPassword(auth, email, senha)
            .then(async (userCredential) => {
                const userLogado = auth.currentUser;
                //const user = userCredential.user;
                let uid = userCredential.user.uid;

                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    let data = {
                        uid,
                        nome: docSnap.data().nome,
                        email: userCredential.user.email,
                        perfil: docSnap.data().perfil,
                        usuario: docSnap.data().usuario,
                    }

                    setUser(data);
                    storageUser(data);
                    setSigned(true)
                    console.log(data.nome);
                    console.log(userLogado.uid);

                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }if(userLogado){
                    window.location = '/projetos';
                    console.log(user.uid)
                }

                /*   const docRef = doc(db, "users", uid);
                   const docSnap = await getDoc(docRef);
   
                   //const userProfile = await getDoc(doc(db, "users", uid));
   
                   console.log(docSnap.data());
   
                   if (docSnap.exists()) {
                       
                       console.log("Document data:", docSnap.data());
                   } else {
                       // docSnap.data() will be undefined in this case
                       console.log("No such document!");
                   }*/

            })
            .catch((error) => {
                console.log(error);
                if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
                    alert('email ou senha inválido');
                }
            })
    }

    

    async function signUp(nome, email, perfil, usuario, senha) {

        await createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {

                let uid = userCredential.user.uid;

                const docRef = setDoc(doc(db, "users", uid), {
                    uid: uid,
                    nome: nome,
                    email: email,
                    perfil: perfil,
                    usuario: usuario
                })
                    .then(() => {

                        let data = {
                            uid: uid,
                            nome: nome,
                            email: email,
                            perfil: perfil,
                            usuario: usuario
                        };

                        setUser(data);
                        storageUser(data);
                        console.log(data);
                    })
            })
            
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('email já utilizado');
                }

                console.log(error);
            })            
    }

    
    /*

    async function adicionar(titulo, descricao, objetivos) {
        const docRef = addDoc(collection(db, "projeto"), {
            titulo: titulo,
            descricao: descricao,
            objetivos: objetivos,
            data: stringData,
            proprietario: user.nome,
            etapa: "Etapa 1",
            idUser: user.uid
        }).then(function (docRef) {
            setIdProj(docRef.id);
            console.log("Document written with ID: ", idProj);
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    const verProjeto = (id, titulo, descricao, objetivos, proprietario, data) => {
        let info = {
          id: id,
          titulo: titulo,
          descricao: descricao,
          objetivos: objetivos,
          proprietario: proprietario,
          data: data
        }
        console.log(info)
      }*/


    async function signOut() {

        setSigned(false);
        setUser(null);
        localStorage.removeItem('sistema-user');
        localStorage.removeItem('nome');
    }


    function storageUser(data) {
        localStorage.setItem('sistema-user', JSON.stringify(data));
        localStorage.setItem('nome', data.nome);
        setSigned(true);
    }

    return (
        <AuthContext.Provider
            value={{
                signed,
                user,
                signUp,
                signIn,
                setUser,
                storageUser,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;