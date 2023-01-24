import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import React from 'react'
import ProfilePageCard from '@/components/sections/profile/profile-page-card'
import NotificationsCard from '@/components/sections/notifications/notifications-card'
import { getAuth } from 'firebase/auth'
import { collection, doc, getDocs} from "firebase/firestore";
import { db } from '@/components/firebase/firebase.config'
import { useAuth } from '@/components/context/AuthContext'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'


export default function Profile({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className='w-screen relative font-Hind bg-stone-100'>
            <Navbar />
                <div className='flex justify-center'>
                    <div className=' w-192 mt-8 mb-4'>
                        <h1 className='text-xl font-normal tracking-wide'>Profile</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <ProfilePageCard />
                </div>
                <div className='pb-72 flex flex-col justify-center items-center'>
                </div>
                <div className='pb-72 flex flex-col justify-center items-center'>
                </div>
            <Footer />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const usersRef = collection(db, 'users')
    const snapshot = await getDocs(usersRef)
    const users: { [field: string]: any }[] = []
    snapshot.forEach((doc) => {
        users.push({ ...doc.data()})
    })
    console.log(users)
    return {
        props: {
            users: users
        }
    }
}