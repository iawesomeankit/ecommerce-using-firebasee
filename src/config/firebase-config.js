import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth"
import {auth,db} from "../firebase"
import {collection,getDocs,getDoc,addDoc,updateDoc,doc,deleteDoc} from "firebase/firestore"
const userAuthContext = createContext();
export function UserAuthContextProvider ({children}){
    const [user,setUser] = useState("");
    function addToCart(item){
        const userRef = collection(db, "items of "+user.uid);
        return addDoc(userRef,item);
    }
    function getAllCart(){
        const userRef = collection(db, "items of "+user.uid);
        return getDocs(userRef);
    }
    function updateCart(id,updatedBook){
        const bookDoc = doc(db,"items of "+user.uid, id);
        return updateDoc(bookDoc, updatedBook);
    }
    function deleteCart(id){
        const bookDoc = doc(db,"items of "+user.uid, id);
        return deleteDoc(bookDoc);
    }
    function getCart(id){
        const bookDoc = doc(db,"items of "+user.uid, id);
        return getDoc(bookDoc);
    }
    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password);
    }
    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }
    function logOut() {
        return signOut(auth);
      }
    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth,(current)=>{
            setUser(current);
        });
        return () =>{
            unsubscribe();
        }
    },[])
    return(
        <userAuthContext.Provider value={{ user, logIn, signUp, logOut,addToCart,getAllCart,updateCart,deleteCart,getCart}}>
            {children}
        </userAuthContext.Provider>
    )
}
export function useUserAuth(){
    return useContext(userAuthContext);
}