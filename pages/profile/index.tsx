import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import React from 'react'
import ProfilePageCard from '@/components/sections/profile/profile-page-card'
import { collection, doc, getDocs} from "firebase/firestore";
import { db } from '@/components/firebase/firebase.config'
import { useAuth } from '@/components/context/AuthContext'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useLocalStorage } from '@/components/data/localStorage';

export default function Profile() {
    const { user, userDoc } = useAuth()
    useLocalStorage("user", user)
    
    return (
        <div className='w-screen min-h-screen relative font-Hind bg-stone-100'>
            <Navbar />
                <div className='flex justify-center'>
                    <div className=' w-192 mt-8 mb-4'>
                        <h1 className='text-xl font-normal tracking-wide'>Profile</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <ProfilePageCard user={user} />
                </div>
            <Footer />
        </div>
    )
}
