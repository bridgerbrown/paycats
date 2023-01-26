import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState, ReactNode, FC } from "react";
import { auth } from "../firebase/firebase.config"
import { changeUserImage, getUserData } from "../firebase/firestore";

type AuthContextType = {
    children: ReactNode
}

const AuthContext = createContext<any>({} as AuthContextType)
export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}: AuthContextType) => {
    const [user, setUser] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [userDoc, setUserDoc] = useState<any | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email)
            } else {
                setUser(null)
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
        setUser(null);
        await signOut(auth);
      };

    const updateUserImage = (user: string, radioState: string) => {
        changeUserImage(user, radioState)
        console.log("Context: " + userDoc.img)
    }

    return (
        <AuthContext.Provider value={{ user, userDoc, updateUserImage, setUserDoc, signUp, logIn, logOut }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}