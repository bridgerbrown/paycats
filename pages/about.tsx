import Loading from '@/components/features/loading'
import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import React from 'react'
import { getUserData } from '@/components/firebase/firestore'
import { useAuth } from '@/components/context/AuthContext'
import Image from 'next/image'

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
        <div className='w-screen min-h-screen relative font-Hind bg-stone-100'>
            <Navbar />
            <div className='flex justify-center bg-stone-100'>
                <div className='w-192 mt-8 mb-4'>
                    <h1 className='text-xl font-normal tracking-wide'>
                        About
                    </h1>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='flex-column shadow-md rounded-lg border border-slate-300 items-center justify-center pt-20 pb-28 mt-0 mb-6 font-Hind bg-white mx-20 w-192'>
                    <div className='flex justify-center'>
                        <Image 
                            src="/paycats-logo-whiteeyes.png"
                            width={1056}
                            height={263}
                            alt="PayCats logo"
                            className='object-cover bg-blue-900 rounded w-2/3'
                        />
                    </div>
                    <div className='text-center'>
                        <h1 className='text-3xl mt-8 mb-4'>
                            Welcome to PayCats!
                        </h1>
                        <h2 className='px-24 text-base mb-4'>
                            PayCats is a Venmo/Paypal clone with a database of cat users you can pay
                            and request fake money from. Like Venmo, you can securely login, make requests
                            to users, track your balance, and interact with the history of transactions.
                        </h2>
                        <h1 className='text-2xl mt-8 mb-4'>
                            What should I do?
                        </h1>
                        <h2 className='px-24 text-base mb-4'>
                            After signing up, you can set a custom profile picture in your profile page.
                            <br/>
                            <br/>
                            Then, try heading to the Pay/Request page and making a transaction with one of the
                            available users. When a transaction goes through, you will be able to see a 
                            comment made by that cat user afterwards! Each cat will have a different selection
                            of responses! If you run out of money, you can always head to your balance and transfer more.
                            <br/>
                            <br/>
                            Your notifications page will be updated after any of your actions!
                        </h2>
                        <h2 className='px-24 text-base mb-4'>
                            This Frontend development project was made using React, Typescript, NextJS, Tailwind CSS, 
                            Firebase Auth, and Firestore.
                        </h2>
                        <h1 className='text-2xl mt-8 mb-4'>
                            About Me
                        </h1>
                        <div className='flex-column text-center justify-center items-center'>
                            <p>Check out my other projects:</p>
                            <a href="www.bridgerbrown.dev" className='text-blue-500'>www.bridgerbrown.dev</a>
                        </div>
                    </div>                 
                </div>
            </div>
            <Footer />
        </div>
    )
}