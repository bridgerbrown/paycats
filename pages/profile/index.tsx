import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import React from 'react'
import ProfilePageCard from '@/components/sections/profile/profile-page-card'
import { useAuth } from '@/components/context/AuthContext'
import Loading from '@/components/features/loading'

export default function Profile() {
    const { userFound, userDoc, loading } = useAuth()
    
    if(loading) return (
        <div>
            <Loading/>
        </div>
    )

    return (
        <div className='w-screen min-h-screen relative font-Hind bg-stone-100'>
            <Navbar />
                <div className='flex justify-center'>
                    <div className=' w-192 mt-8 mb-4'>
                        <h1 className='text-xl font-normal tracking-wide'>Profile</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <ProfilePageCard userFound={userFound} />
                </div>
            <Footer />
        </div>
    )
}
