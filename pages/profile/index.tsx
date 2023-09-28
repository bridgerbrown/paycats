import React from 'react';
import Footer from '@/components/general/Footer';
import Navbar from '@/components/general/Navbar';
import ProfilePageCard from '@/components/profile/ProfilePageCard';
import { useAuth } from '@/data/context/AuthContext';
import Loading from '@/components/general/Loading';
import { GetServerSideProps, InferGetServerSidePropsType, } from 'next';
import { collection, getDocs} from "firebase/firestore";
import { db } from '@/data/firebase/firebase.config';

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
                    <div className='xs:w-11/12 sm:w-144 lg:w-192  mt-8 mb-4'>
                        <h1 className='text-xl font-normal tracking-wide'>Profile</h1>
                    </div>
                </div>
                <div className='pb-60 flex justify-center'>
                    {
                        userFound ?
                        <ProfilePageCard findUser={findUser} />
                        :
                        <div></div>
                    }
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
