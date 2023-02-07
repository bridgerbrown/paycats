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
    const [userImage, setUserImage] = useState<number>(1)
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
        setUserImage(radioState)
    }

    const transferMoneyBtn = (user: string, findUser: any) => {
        transferMoney(user, findUser.balance)
    }

    function updateTransactionSocials(userDoc: any, id: number, likes: number, likedByUser: boolean, comments: any) {
        const findTransaction = userDoc.transactions.find((transaction: any) => transaction.id === id)
        const updatedSocials = {...findTransaction, likes: likes, likedByUser: likedByUser, comments: comments}
        const allTransactions = userDoc.transactions

        const updatedAllUserTransactions = allTransactions.map((transaction: any) => {
          if(transaction.id == findTransaction.id){
            return updatedSocials
          }
          return transaction
        })
        console.log(updatedAllUserTransactions)
        updateTransactions(userDoc.email, updatedAllUserTransactions)
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
            updateTransactionSocials,
            userImage,
            setUserImage
            }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}