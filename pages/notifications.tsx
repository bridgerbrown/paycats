import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import React from 'react'
import ProfilePageCard from '@/components/sections/profile/profile-page-card'
import NotificationsCard from '@/components/sections/notifications/notifications-card'

export default function Profile() {
    return (
        <div className='w-screen relative font-Hind bg-stone-100'>
            <Navbar />
                <div className='flex justify-center'>
                    <div className=' w-192 mt-4 mb-4'>
                        <h1 className='text-xl font-normal tracking-wide'>Notifications</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <NotificationsCard />
                </div>
                <div className='pb-72 flex flex-col justify-center items-center'>
                </div>
                <div className='pb-80 flex flex-col justify-center items-center'>
                </div>
            <Footer />
        </div>
    )
}