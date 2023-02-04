import React from 'react'
import TransactionsSection from '@/components/sections/transactions/transactions-section'
import Navbar from '@/components/sections/navbar'
import Footer from '@/components/sections/footer'
import { GetServerSideProps, InferGetServerSidePropsType, } from 'next'
import { collection, getDocs} from "firebase/firestore";
import { db } from '@/components/firebase/firebase.config'
import { useAuth } from '@/components/context/AuthContext'

export default function MyTransactions({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {user, userDoc} = useAuth()
    const findUser = users.find((item: any) => item.email === user)
    const usersUsername = user.substring(0, user.lastIndexOf("@"))

    const onlyMyTransactions = findUser.transactions.filter(
        function (item: any) {
            return item.from == usersUsername || item.to == usersUsername
        }
    )
    console.log(onlyMyTransactions)

    return (
        <div className='w-screen min-h-screen relative font-Hind'>
            <Navbar />
            <div className='flex justify-center bg-stone-100'>
                <div className='w-192 mt-8 mb-4'>
                    <h1 className='text-xl font-normal tracking-wide'>
                        My Transactions
                    </h1>
                </div>
            </div>
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