import Loading from '@/components/features/loading'
import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import React from 'react'

export default function About() {
    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className='flex justify-center items-center'>
                <Loading />
            </div>
            <Footer />
        </div>
    )
}