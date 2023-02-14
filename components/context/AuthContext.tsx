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
    const [userFound, setUserFound] = useState<any>(null)
    const [userImage, setUserImage] = useState<number>(1)
    const [loading, setLoading] = useState(true)
    const [unreadBell, setUnreadBell] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserFound(user?.email)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [userFound])

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

    const updateUserImage = (user: string, radioState: any) => {
        changeUserImage(user, radioState)
        setUserImage(radioState)
    }

    const transferMoneyBtn = (user: string, findUser: any) => {
        transferMoney(user, findUser.balance)
    }

    function updateTransactionSocials(data: any, id: number, likes: number, likedByUser: boolean, comments: any) {
        const findTransaction = data.transactions.find((transaction: any) => transaction.id === id)
        const updatedSocials = {...findTransaction, likes: likes, likedByUser: likedByUser, comments: comments}
        const allTransactions = data.transactions

        const updatedAllUserTransactions = allTransactions.map((transaction: any) => {
          if(transaction.id == findTransaction.id){
            return updatedSocials
          }
          return transaction
        })
        updateTransactions(data.email, updatedAllUserTransactions)
      }

    return (
        <AuthContext.Provider value={{ 
            userFound, 
            transferMoneyBtn,   
            updateUserImage, 
            signUp, 
            logIn, 
            logOut,
            loading,
            updateTransactionSocials,
            userImage,
            setUserImage,
            unreadBell,
            setUnreadBell
            }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}