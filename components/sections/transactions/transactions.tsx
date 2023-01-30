import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import React from 'react'
import Image from 'next/image'
import TransactionCard from '@/components/sections/transactions/transaction-card'
import { useAuth } from '@/components/context/AuthContext'

export default function TransactionsSection() {
    const { user, userDoc, setUserDoc, transactionHistory} = useAuth()
    const transactionsData = userDoc ? userDoc.transactions : transactionHistory

    return (
        <div className='w-screen relative font-Hind bg-stone-100'>
                <div className='flex justify-center'>
                    <div className=' w-192 mt-8 mb-4'>
                        <h1 className='text-xl font-normal tracking-wide'>Transactions</h1>
                    </div>
                </div>
                <div className=' pb-60 flex flex-col justify-center items-center'>
                    <div className='rounded-t-lg border-slate-300 border-x border-t h-6 bg-white w-192'></div>
                        { transactionsData.map((transaction: any) => <TransactionCard key={transaction.id} transaction={transaction} /> )}
                    <div className='rounded-b-lg border-slate-300 border-x border-b h-16 bg-white w-192'></div>
                </div>
        </div>
    )
}