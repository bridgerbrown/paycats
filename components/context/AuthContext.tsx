import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState, ReactNode, FC } from "react";
import { auth } from "../firebase/firebase.config"
import { changeTransactions, changeUserImage, getUserData, transferMoney } from "../firebase/firestore";
import { transactions } from "../data/defaultTransactions";

type AuthContextType = {
    children: ReactNode
}

const AuthContext = createContext<any>({} as AuthContextType)
export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}: AuthContextType) => {
    const [userFound, setUserFound] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [userDoc, setUserDoc] = useState<any | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserFound(user.email)
                getUserData(user.email)
                    .then((data) => {
                        setUserDoc(data)
                    })
                console.log("user detected")
            } else {
                setUserFound(null)
                console.log("no user detected")
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const signUp = (email: string, password: string) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password);
        setLoading(false)
      };
    
      const logIn = (email: string, password: string) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password);
        setLoading(false)
      };
    
      const logOut = async () => {
        setUserFound("");
        setLoading(true)
        await signOut(auth);
        setLoading(false)
      };

    const updateUserImage = (user: string, radioState: string) => {
        changeUserImage(user, radioState)
    }

    const transferMoneyBtn = (user: string, userDoc: any) => {
        transferMoney(user, userDoc.balance)
    }

    return (
        <AuthContext.Provider value={{ 
            userFound, 
            transferMoneyBtn,   
            userDoc, 
            updateUserImage, 
            setUserDoc, 
            signUp, 
            logIn, 
            logOut,
            loading
            }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}