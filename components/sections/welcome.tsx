import React from 'react'
import Image from 'next/image'
import { useAuth } from '../context/AuthContext'

export default function Welcome(props: any) {

    return (
        <div className='font-Hind bg-black/25 top-0 absolute w-screen h-full flex justify-center items-center'>
            <div className='absolute top-1/6 flex-column justify-center items-center py-14 bg-white sm:w-11/12 md:w-144 h-144 shadow-lg rounded-lg border border-slate-400'>
                <div className='flex-column justify-center items-center text-center mb-8'>
                    {/* <Image 
                        src="/paycats-logo-git.jpg"
                        width={352}
                        height={87}
                        alt="Cat headshot number one"
                        className='inline mb-4 w-1/3 rounded-lg'
                    /> */}
                    <Image 
                        src="/icons/smile-icon.png"
                        width={500}
                        height={500}
                        alt="Cat headshot number one"
                        className='inline object-cover w-20 h-20 mb-2 rounded-full'
                    />
                    <h1 className='text-2xl mb-2'>
                        Welcome to PayCats!
                    </h1>
                    <h2 className='px-24 text-base'>
                    PayCats is a Venmo/Paypal clone with a database of cat users you can pay
                     and request fake money from. Like Venmo, you can securely login, make requests
                      to users, track your balance, and interact with the history of transactions.
                    </h2>
                </div>
                <div className='flex-column justify-center items-center text-center mb-8'>
                    <div className='flex justify-center mb-4'>
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
                            alt="Cat headshot number one"
                            className='mx-3 object-cover w-16 h-16 rounded-full border border-slate-400'
                        />
                        <Image 
                            src="/cat4.jpg"
                            width={498}
                            height={500}
                            alt="Cat headshot number one"
                            className='mx-3 object-cover w-16 h-16 rounded-full border border-slate-400'
                        />
                    </div>
                    <h1 className='text-xl mb-2'>
                        Make transactions with our cat users!
                    </h1>
                    <h2 className='px-24 mb-8 text-base'>
                        Each cat user has a different personality with unique possibilities
                         of responses and comments to your transaction requests! Sign up to get started!
                    </h2>
                    <button 
                        className='text-base cursor-pointer ml-2 bg-blue-900 text-white px-6 py-1.5 rounded-full hover:bg-blue-700'
                        onClick={props.enter}
                    >
                        Enter
                    </button>
                </div>
                
            </div>
        </div>
    )
}