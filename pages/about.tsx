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
                <div className='xs:w-11/12 sm:w-144 lg:w-192 mt-8 mb-4'>
                    <h1 className='text-xl font-normal tracking-wide'>
                        About
                    </h1>
                </div>
            </div>
            <div className='w-screen relative pb-48 flex justify-center'>
                <div className='xs:w-11/12 flex-column shadow-md rounded-lg border border-slate-300 items-center justify-center pt-20 pb-28 mt-0 mb-6 font-Hind bg-white sm:w-144 lg:w-192'>
                    <div className='flex justify-center'>
                        <Image 
                            src="/paycats-logo-whiteeyes.png"
                            width={1056}
                            height={263}
                            alt="PayCats logo"
                            className='object-cover bg-blue-900 rounded w-1/2'
                        />
                    </div>
                    <div className='text-center'>
                        <h1 className='text-2xl mt-8 mb-4'>
                            Welcome to PayCats!
                        </h1>
                        <h2 className='xs:px-8 sm:px-16 lg:px-32 text-base mb-6'>
                            PayCats is a Venmo/Paypal clone with a database of cat users you can pay
                            and request fake money from. Like Venmo, you can securely login, make requests
                            to users, track your balance, and interact with the history of transactions.
                        </h2>
                        <h2 className='xs:px-8 sm:px-16 lg:px-32 text-base mb-8'>
                            Try heading to the Pay/Request page and making a transaction with one of the
                            available users. When a transaction goes through, you will be able to see a 
                            comment made by that cat user afterwards!
                        </h2>
                        <div className='flex justify-center mb-6'>
                            <Image 
                                src="/cat1.jpg"
                                width={498}
                                height={500}
                                alt="Cat headshot number one"
                                className='mx-3 object-cover w-16 h-16 rounded-full border border-slate-400'
                            />
                            <Image 
                                src="/cat3.jpg"
                                width={498}
                                height={500}
                                alt="Cat headshot number three"
                                className='mx-3 object-cover w-16 h-16 rounded-full border border-slate-400'
                            />
                            <Image 
                                src="/cat4.jpg"
                                width={498}
                                height={500}
                                alt="Cat headshot number four"
                                className='mx-3 object-cover w-16 h-16 rounded-full border border-slate-400'
                            />
                        </div>
                        <h2 className='xs:px-8 sm:px-16 lg:px-32 text-base mb-12'>
                            Each cat has a different selection of responses to find. If you run out of money, you can always head to your balance and transfer more.
                            Your notifications page will be updated after any of your actions!
                        </h2>
                        
                        <h1 className='text-2xl mt-8 mb-4'>
                            Development
                        </h1>
                        <h2 className='xs:px-8 sm:px-16 lg:px-32 text-base mb-4'>
                            This Frontend development project was made using <br/> <span className='font-semibold'>React</span>, <span className='font-semibold'>Typescript</span>, <span className='font-semibold'>NextJS</span>, <span className='font-semibold'>Tailwind CSS</span>, 
                            <span className='font-semibold'> Firebase Auth</span>, and <span className='font-semibold'> Firestore</span>.
                        </h2>
                        <div className='flex-column text-center justify-center items-center'>
                            <p>Check out my other projects:</p>
                            <a href="https://www.bridgerbrown.dev" target="_blank" rel="noopener noreferrer"
                                className='hover:text-blue-700 text-blue-500'
                            >www.bridgerbrown.dev</a>
                        </div>
                    </div>                 
                </div>
            </div>
            <Footer />
        </div>
    )
}