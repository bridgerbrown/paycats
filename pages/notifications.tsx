import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import React from 'react'
import Notification from '@/components/sections/notifications/notification'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType, } from 'next'
import { collection, getDocs} from "firebase/firestore";
import { db } from '@/components/firebase/firebase.config'
import { useAuth } from '@/components/context/AuthContext'

export default function Notifications({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { userFound } = useAuth()
    const findUser = users.find((item: any) => item.email === userFound)
    const userNotifications = findUser.notifications
    const sortedNotifications = userNotifications.sort(
        (p1: any, p2: any) => (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0
    )

    return (
        <div className='min-h-screen relative font-Hind bg-stone-100'>
            <Navbar />
                <div className='flex justify-center'>
                    <div className='w-192 mt-4 mb-4'>
                        <h1 className='text-xl font-normal tracking-wide'>Notifications</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                <div className='rounded-lg border border-slate-300 flex py-4 font-Hind bg-white mx-20 w-192'>
                    <div className='flex flex-col'>
                            <div className='mt-4 mb-6 flex flex-col'>
                            { userNotifications.length > 0 ?
                                userNotifications.map((userNotification: any) => <Notification key={userNotification.id} userNotification={userNotification} /> )
                                :
                                <div className='w-192 justify-center mt-8 mb-2 flex items-center'>
                                    <h2 className='text-lg text-slate-500'>No notifications...</h2>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const usersRef = collection(db, 'users')
    const users: any = []
    const snapshot = await getDocs(usersRef)
    snapshot.forEach((doc) => {
        users.push({ ...doc.data() })
        })
    return {
        props: {
            users: users
        }
    }
}