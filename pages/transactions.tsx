import React from 'react'
import TransactionsSection from '@/components/transactions/transactions'
import Navbar from '@/components/sections/navbar'
import Footer from '@/components/sections/footer'

export default function Transactions() {
    return (
        <div className='w-screen relative'>
            <Navbar />
            <TransactionsSection />
            <Footer />
        </div>
    )
}