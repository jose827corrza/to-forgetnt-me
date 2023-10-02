import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, } from 'firebase/auth';
import {auth} from './firebase';

export const registerNewUser = async(email: string, password: string) => {
    // TODO
    return createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            return res
        })
        .catch((res) => {
            // return new Error(res.message)
            console.log(res.message);
            return undefined
        })
}

export const loginUser = async(email: string, password: string) => {
    // TODO
    return signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            return res
        })
        .catch((res) => {
            // return new Error(res.message)
            console.log(res.message);
            return undefined
        })
}

export const logOut = async() => {
    await signOut(auth)
    return true
}