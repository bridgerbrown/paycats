import React from 'react'
import Image from 'next/image'

export default function TransactionCard() {
    return (
        <div className='flex justify-center mt-5 px-5 w-full'>
            <div className=''>
                <Image 
                    src="/cat1.jpg"
                    width={498}
                    height={500}
                    alt="Cat headshot number one"
                    className='object-cover w-20 h-20 rounded-full border border-slate-500'
                />
            </div>
            <div className='ml-4 mt-2'>
                <div className='flex-column font-Hind border-b border-slate-300 pb-7'>
                    <p className=''>
                        <span className='font-semibold'>
                            Cosmo Cat</span> paid <span className='font-semibold'>Meesha Gray </span>
                    </p>
                    <div className='flex items-center'>
                        <p className='text-sm text-slate-600 font-light mr-1'>3h</p>
                        <div className='w-3 h-3 border border-slate-500 rounded-full'></div>
                    </div>
                    <p className='mt-2'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, veniam?
                    </p>
                    <div className='flex mt-5'>
                        <div className='w-5 h-5 mr-6 border border-slate-500 rounded-full'></div>
                        <div className='w-5 h-5 border border-slate-500 rounded-full'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}