import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase.config'
import {transactions} from '../data/defaultTransactions'

export async function checkUser(name: string) {
    const usersRef = doc(db, "users", `${name}`)
    const docSnap = await getDoc(usersRef)
    const defaultData = {
        username: name.substring(0, name.lastIndexOf("@")),
        balance: 10000,
        img: "1",
        email: name,
        transactions
    }
    if (docSnap.exists()){
        console.log("Document data:", docSnap.data())
        return true
    } else {
        await setDoc(doc(db, "users", `"${name}"`), defaultData)
        return defaultData
    }
}

export async function getUserData(user:string | null) {
    const userRef = doc(db, "users", `"${user}"`)
    const docSnap = await getDoc(userRef)
    const userData = docSnap.data()
    console.log(userData)
    return userData
}

export async function changeUserImage(user: string, img: string) {
    const userRef = doc(db, "users", `"${user}"`)
    await updateDoc(userRef, {
        img: img
    })
}

export async function transferMoney(user: string, balance: number){
    const userRef = doc(db, "users", `"${user}"`)
    await updateDoc(userRef, {
        balance: balance + 10000
    })
}