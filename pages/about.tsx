import Loading from '@/components/features/loading'
import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import React from 'react'
import { getUserData } from '@/components/firebase/firestore'
import { useAuth } from '@/components/context/AuthContext'

export default function About() {
    const { userFound, updateTransactionSocials } = useAuth()
    function test(){
        getUserData(userFound)
            .then((data) => {
                console.log(data)
            })
    }
    test()
    
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