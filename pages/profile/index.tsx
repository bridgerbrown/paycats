import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'
import Image from 'next/image'
import ProfileCard from '@/components/profile-card'
import TransactionCard from '@/components/transaction-card'

export default function Profile() {
    return (
        <div className='w-screen relative'>
            <Navbar />
                <ProfileCard />
                <div className='mb-10 flex justify-center items-center'>
                    <button className='font-semibold font-Hind rounded-full border border-sky-700 text-sky-700 py-1 px-4'>Edit</button>
                </div>
                <div className='pb-60'>
                    <TransactionCard />
                    <TransactionCard />
                    <TransactionCard />
                    <TransactionCard />
                    <TransactionCard />
                </div>
            <Footer />
        </div>
    )
}