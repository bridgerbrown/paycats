import React from 'react'
import TransactionCard from '@/components/sections/transactions/transaction-card'
import { useAuth } from '@/components/context/AuthContext'
import { transactions } from '@/components/data/defaultTransactions'


export default function TransactionsSection(props: any) {
    const { userFound } = useAuth()
    const transactionsData = props.transactions ? props.transactions : transactions
    const sortedTransactions = transactionsData.sort(
        (p1: any, p2: any) => (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0
    )

    console.log("sorted: " + sortedTransactions)
    return (
        <div className='w-screen relative font-Hind bg-stone-100'>
                <div className='pb-60 flex flex-col justify-center items-center'>
                    <div className='shadow-md rounded-t-lg border-slate-300 border-x border-t h-6 bg-white xs:w-11/12 sm:w-144 lg:w-192'></div>
                        { sortedTransactions.map((transaction: any) => <TransactionCard key={transaction.id} transaction={transaction} /> )}
                    <div className='shadow-md rounded-b-lg border-slate-300 border-x border-b h-16 bg-white xs:w-11/12 sm:w-144 lg:w-192'></div>
                </div>
        </div>
    )
}

