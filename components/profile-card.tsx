import React from 'react'
import Image from 'next/image'

export default function ProfileCard() {
    return (
        <div className='w-screen'>
            <div className='flex justify-center my-20 font-Hind'>
                <div className='flex flex-col justify-center items-center'>
                    <Image 
                        src="/cat1.jpg"
                        width={498}
                        height={500}
                        alt="Cat headshot number one"
                        className='object-cover w-32 h-32 rounded-full border border-slate-500 mb-4'
                    />
                    <h1 className='text-2xl flex justify-center mb-2'>Cosmo Cat</h1>
                    <div className='flex'>
                        <p className='font-thin text-slate-500 tracking-wide'>@Cosmo-Cat</p>
                        <ul className='ml-6 text-slate-500'><li className='list-disc'></li></ul>
                        <p className='font-semibold tracking-wider'>10 friends</p>
                    </div>
                </div>
            </div>
        </div>
    )
}