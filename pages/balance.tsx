import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'
import ProfileCard from '@/components/profile-card'

export default function Balance() {
    return (
        <div className='w-screen relative font-Hind bg-stone-100'>
        <Navbar />
            <div className='relative left-72 mt-8 mb-4'>
                <h1 className='text-xl font-normal tracking-wide'>Balance</h1>
            </div>
            <ProfileCard />
            <div className='pb-96 flex justify-center mx-20'>
                <div className='bg-white py-5 px-5 mx-3 w-96 h-56 border border-slate-300 rounded-lg'>
                    <h2 className='text-slate-900 text-xl font-semibold'>PayCats balance</h2>
                    <h1 className='text-5xl tracking-wide'>$1,000,000.00</h1>
                    <p className='text-slate-900 text-sm'>Available</p>
                </div>
                <div className='bg-white py-5 px-5 mx-3 w-96 h-96 border border-slate-300 rounded-lg'>
                    <h2 className='text-slate-900 text-xl font-semibold'>Bank and cards</h2>
                    <div className='flex-col justify-center items-center'>
                        <div className='cursor-pointer my-3 transition hover:transition hover:bg-slate-200 w-full h-32 rounded-lg'>

                        </div>
                    </div>
                </div>
            </div>
        <Footer />
        </div>
    )
}