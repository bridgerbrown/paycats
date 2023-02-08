import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import TransactionCard from '@/components/sections/transactions/transaction-card'
import React from 'react'

export default function SingleTransaction({transaction}: any) {
    return (
        <div className='w-screen min-h-screen relative bg-stone-100'>
            <Navbar />
            <TransactionCard key={transaction.id} transaction={transaction} />
            <Footer />
        </div>
    )
}