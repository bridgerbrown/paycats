import React from 'react'
import TransactionsSection from '@/components/sections/transactions/transactions-section'
import Navbar from '@/components/sections/navbar'
import Footer from '@/components/sections/footer'
import { GetServerSideProps, InferGetServerSidePropsType, } from 'next'
import { collection, getDocs} from "firebase/firestore";
import { db } from '@/components/firebase/firebase.config'
import { useAuth } from '@/components/context/AuthContext'

export default function Transactions({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {user, userDoc} = useAuth()
    const findUser = users.find((item: any) => item.email === user)
    console.log(userDoc)
    return (
        <div className='w-screen relative'>
            <Navbar />
            {userDoc ? <TransactionsSection {...findUser}/> : <div></div>}
            <Footer />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const usersRef = collection(db, 'users')
    const users: any = []
    const snapshot = await getDocs(usersRef)
    snapshot.forEach((doc) => {
        users.push({ ...doc.data() })
        })
    return {
        props: {
            users: users
        }
    }
}