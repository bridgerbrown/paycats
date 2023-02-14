import React from 'react'
import Image from 'next/image'

export default function Welcome() {
    return (
        <div className='font-Hind bg-black/25 absolute w-screen h-screen flex justify-center items-center'>
            <div className='flex-column justify-center items-center py-12 bg-white mb-12 w-192 h-192 shadow-lg rounded-lg border border-slate-400'>
                <div className='flex-column justify-center items-center text-center mt-12 mb-16'>
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
                    <h1 className='text-3xl mb-2'>
                        Welcome to PayCats!
                    </h1>
                    <h2 className='px-24 text-md'>
                        PayCats is a PayCats is a PayCats is a PayCats is a PayCats is a PayCats is a 
                        PayCats is a PayCats is a PayCats is a PayCats is a PayCats is a PayCats is a 
                        PayCats is a PayCats is a PayCats is a PayCats is a PayCats is a PayCats is a 
                    </h2>
                </div>
                <div className='flex-column justify-center items-center text-center mb-8'>
                    <div className='flex w-192 justify-center mb-4'>
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
                    <h2 className='px-24 mb-8 text-md'>
                        PayCats is a PayCats is a PayCats is a PayCats is a PayCats is a PayCats is a 
                        PayCats is a PayCats is a PayCats is a PayCats is a PayCats is a PayCats is a 
                        PayCats is a PayCats is a PayCats is a PayCats is a PayCats is a PayCats is a 
                    </h2>
                    <button className='cursor-pointer ml-2 bg-blue-900 text-white px-6 py-1.5 rounded-full hover:bg-blue-700'>Enter</button>
                </div>
                
            </div>
        </div>
    )
}