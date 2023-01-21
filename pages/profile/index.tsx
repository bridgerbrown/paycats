import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'
import Image from 'next/image'
import ProfileCard from '@/components/profile-card'
import TransactionCard from '@/components/transaction-card'

export default function Profile() {
    return (
        <div className='w-screen relative font-Hind bg-stone-100'>
            <Navbar />
                <div className='flex justify-center'>
                    <div className=' w-192 mt-8 mb-4'>
                        <h1 className='text-xl font-normal tracking-wide'>Profile</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <ProfileCard />
                </div>
                <div className='pb-96 flex flex-col justify-center items-center'>
                </div>
                <div className='pb-80 flex flex-col justify-center items-center'>
                </div>
            <Footer />
        </div>
    )
}