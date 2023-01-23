import React from 'react'
import Image from 'next/image'

export default function TransactionCard() {
    return (
        <div className='bg-white w-192 flex justify-center pt-5 px-5 border-slate-300 border-x '>
            <div className=''>
                <Image 
                    src="/cat1.jpg"
                    width={498}
                    height={500}
                    alt="Cat headshot number one"
                    className='object-cover w-20 h-20 rounded-full border border-slate-400'
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
                        <Image
                            width={100}
                            height={100}
                            alt="heart icon"
                            src="/icons/globe-icon.png"
                            className='w-4 h-4 my-1 mx-1 cursor-pointer'
                        />
                    </div>
                    <p className='mt-2 max-w-xl'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, veniam?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, veniam?
                    </p>
                    <div className='flex mt-4'>
                        <Image
                            width={100}
                            height={88}
                            alt="heart icon"
                            src="/icons/heart-icon-gray.png"
                            className='w-4.5 h-4.5 mr-7 cursor-pointer'
                        />
                        <Image
                            width={100}
                            height={104}
                            alt="comment icon"
                            src="/icons/comment-icon.png"
                            className='w-4.5 h-4.5 mr-7 cursor-pointer' 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}