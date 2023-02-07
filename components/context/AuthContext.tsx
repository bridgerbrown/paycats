import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState, ReactNode, FC } from "react";
import { auth } from "../firebase/firebase.config"
import { updateTransactions, changeUserImage, getUserData, transferMoney } from "../firebase/firestore";
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
        getUserData(email)
            .then((data) => {
                setUserDoc(data)
            })
        setLoading(false)
      };
    
      const logIn = (email: string, password: string) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password);
        getUserData(email)
            .then((data) => {
                setUserDoc(data)
            })
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

    function updateTransactionSocials(userData: any, id: number, likes: number, likedByUser: boolean, comments: any) {
        const findTransaction = userData.transactions.find((transaction: any) => transaction.id === id)
        const updatedSocials = {...findTransaction, likes: likes, likedByUser: likedByUser, comments: comments}
        const allTransactions = userData.transactions

        const updatedAllUserTransactions = allTransactions.map((transaction: any) => {
          if(transaction.id == findTransaction.id){
            return updatedSocials
          }
          return transaction
        })
        console.log(updatedAllUserTransactions)
        updateTransactions(userData.email, updatedAllUserTransactions)
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
            loading,
            updateTransactionSocials
            }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}