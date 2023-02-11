import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import React from 'react'
import ProfilePageCard from '@/components/sections/profile/profile-page-card'
import { useAuth } from '@/components/context/AuthContext'
import Loading from '@/components/features/loading'
import { GetServerSideProps, InferGetServerSidePropsType, } from 'next'
import { collection, getDocs} from "firebase/firestore";
import { db } from '@/components/firebase/firebase.config'

export default function Profile({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { userFound, loading } = useAuth()
    const findUser = users.find((item: any) => item.email === userFound)
    const usersUsername = userFound ? userFound.substring(0, userFound.lastIndexOf("@")) : ""
    console.log(findUser)
    
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
                    <ProfilePageCard findUser={findUser} />
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
