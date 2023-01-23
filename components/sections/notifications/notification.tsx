import React from 'react'
import Image from 'next/image'

export default function Notification() {
    return (
        <div className=' w-192 flex justify-left px-10 py-4'>
            <div className='w-192 border-b border-slate-300 flex'>
                <div className=''>
                    <Image 
                        src="/cat1.jpg"
                        width={498}
                        height={500}
                        alt="Cat headshot number one"
                        className='object-cover w-20 h-20 rounded-full border border-slate-400'
                    />
                </div>
                <div className='ml-4 mt-2 mb-4'>
                    <div className='flex-column font-Hind pb-7'>
                        <p className='font-semibold'>
                            Meesha requests $80.00
                        </p>
                        <p className=' max-w-xl'>
                            Lorem ipsum dolor sit amet 
                        </p>
                        <div className='flex items-center'>
                            <p className='text-sm text-slate-600 font-light mr-1'>3h</p>
                        </div>
                        <div className='flex mt-4'>
                        <button
                            className='mr-4 bg-white text-slate-500 border border-slate-500 w-28 py-1.5 rounded-md text-sm'>
                                Decline
                        </button>
                        <button
                            className='bg-blue-900 text-white w-28 py-1.5 rounded-md text-sm'>
                                Accept
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}