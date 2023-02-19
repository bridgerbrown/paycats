import React, { useEffect } from 'react'
import TransactionsSection from '@/components/sections/transactions/transactions-section'
import Navbar from '@/components/sections/navbar'
import Footer from '@/components/sections/footer'
import { GetServerSideProps, InferGetServerSidePropsType, } from 'next'
import { collection, getDocs} from "firebase/firestore";
import { db } from '@/components/firebase/firebase.config'
import { useAuth } from '@/components/context/AuthContext'
import TransactionCard from '@/components/sections/transactions/transaction-card'
import Loading from '@/components/features/loading'
import { updateTransactions } from '@/components/firebase/firestore'

export default function MyTransactions({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {userFound, loading} = useAuth()
    const findUser = users.find((item: any) => item.email === userFound)
    const usersUsername = userFound.substring(0, userFound.lastIndexOf("@"))
    const onlyMyTransactions = findUser.transactions.filter(
        function (item: any) {
            return item.from == usersUsername || item.to == usersUsername
        }
    )
    const sortedTransactions = onlyMyTransactions.sort(
        (p1: any, p2: any) => (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0
    )
    
    if(loading) return (
        <div>
            <Loading/>
        </div>
    )
    
    return (
        <div className='w-screen min-h-screen relative font-Hind bg-stone-100'>
            <Navbar />
            <div className='flex justify-center bg-stone-100'>
                <div className='sm:w-144 lg:w-192 mt-8 mb-4'>
                    <h1 className='text-xl font-normal tracking-wide'>
                        My Transactions
                    </h1>
                </div>
            </div>
            {userFound ? 
            
            <div className='w-screen relative'>
                <div className='pb-60 flex flex-col justify-center items-center'>
                    <div className='shadow-md rounded-t-lg border-slate-300 border-x border-t h-6 bg-white sm:w-144 lg:w-192'></div>
                    {
                        onlyMyTransactions.length > 0 ?
                            <div className=''>
                                {sortedTransactions.map((transaction: any) => <TransactionCard key={transaction.id} transaction={transaction} /> )}
                            </div>
                        :
                        <div className='pt-8 bg-white sm:w-144 lg:w-192  border-x border-slate-300 shadow-md flex text-center justify-center'>
                            <h2 className='text-slate-500 font-thin'>No transactions made yet!</h2>
                        </div>
                    }
                    <div className='shadow-md rounded-b-lg border-slate-300 border-x border-b h-16 bg-white sm:w-144 lg:w-192 '></div>
                </div>
            </div>
            
            : <div><Loading/></div>}
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