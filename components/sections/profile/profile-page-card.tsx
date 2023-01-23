import React from 'react'
import Image from 'next/image'

export default function ProfilePageCard() {
    return (
        <div className=''>
            <div className='rounded-lg border border-slate-300 flex items-center justify-center py-10 mt-0 mb-6 font-Hind bg-white mx-20 w-192'>
                <div className='flex flex-col justify-center items-center'>
                    <Image 
                        src="/cat1.jpg"
                        width={498}
                        height={500}
                        alt="Cat headshot number one"
                        className='object-cover w-32 h-32 rounded-full border border-slate-400 mb-4'
                    />
                    <h1 className='text-2xl flex justify-center mb-2'>Cosmo Cat</h1>
                    <div className='flex'>
                        <p className='font-thin text-slate-500 tracking-wide'>@Cosmo-Cat</p>
                        <ul className='ml-6 text-slate-500'><li className='list-disc'></li></ul>
                        <p className='font-semibold tracking-wider'>10 friends</p>
                    </div>
                    <div className='mt-6 mb-4 flex justify-center items-center'>
                        <button className='font-semibold font-Hind rounded-full border border-sky-700 text-sky-700 py-1 px-4'>Edit</button>
                    </div>
                    <div>
                        <h1 className='font-semibold font-Hind text-sky-700 mt-8 mb-4'>
                            Log out
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}