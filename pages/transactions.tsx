import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'
import Image from 'next/image'
import ProfileCard from '@/components/profile-card'
import TransactionCard from '@/components/transaction-card'

export default function Transactions() {
    return (
        <div className='w-screen relative font-Hind bg-stone-100'>
            <Navbar />
                <div className='flex justify-center'>
                    <div className=' w-192 mt-8 mb-4'>
                        <h1 className='text-xl font-normal tracking-wide'>Transactions</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <ProfileCard />
                </div>
                <div className=' pb-60 flex flex-col justify-center items-center'>
                    <div className='rounded-t-lg border-slate-300 border-x border-t h-6 bg-white w-192'></div>
                    <TransactionCard />
                    <TransactionCard />
                    <TransactionCard />
                    <TransactionCard />
                    <TransactionCard />
                    <div className='rounded-b-lg border-slate-300 border-x border-b h-16 bg-white w-192'></div>
                </div>
            <Footer />
        </div>
    )
}