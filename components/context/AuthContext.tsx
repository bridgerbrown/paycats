import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState, ReactNode, FC } from "react";
import { auth } from "../firebase/firebase.config"

interface AuthUser {
    email: string;
    uid: string;
}

type AuthContextType = {
    user: AuthUser[];
    signUp: (email: string, password: string) => {},
    logIn: (email: string, password: string) => {},
    logOut: () => {},
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider: FC<ReactNode> = ({children}) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    uid: user.uid,
                })
            } else {
                setUser({ email: null, uid: null })
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
        setUser({ email: null, uid: null });
        await signOut(auth);
      };

    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}