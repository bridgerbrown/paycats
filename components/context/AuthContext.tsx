import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState, ReactNode, FC } from "react";
import { auth } from "../firebase/firebase.config"
import { changeUserImage, getUserData, transferMoney } from "../firebase/firestore";
import { transactions } from "../data/defaultTransactions";

type AuthContextType = {
    children: ReactNode
}

const AuthContext = createContext<any>({} as AuthContextType)
export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}: AuthContextType) => {
    const [user, setUser] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [userDoc, setUserDoc] = useState<any | null>(null)
    const [transactionHistory, setTransactionHistory] = useState<any>(transactions)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email)
                console.log("user detected")
            } else {
                setUser(null)
                console.log("no user detected")
            }
        })
        setLoading(false)

        return () => unsubscribe()
    }, [])

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };
    
      const logIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
      };
    
      const logOut = async () => {
        setUser("");
        await signOut(auth);
      };

    const updateUserImage = (user: string, radioState: string) => {
        changeUserImage(user, radioState)
    }

    const transferMoneyBtn = (user: string, userDoc: any) => {
        transferMoney(user, userDoc.balance)
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            transferMoneyBtn,   
            userDoc, 
            transactionHistory, 
            setTransactionHistory, 
            updateUserImage, 
            setUserDoc, 
            signUp, 
            logIn, 
            logOut }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}