import React from 'react'
import Image from 'next/image'
import { catUsers } from '../data/catUsers'

export default function TransactionCard({transaction}: any) {
    
    function findUserImg(fromUser: string) {
        for(let i = 0; i < catUsers.length; i++){
            if(catUsers[i][0].name === fromUser) {
                console.log(catUsers[i][0].img)
                return (catUsers[i][0].img)
            }
        }
    }

    const fromImg: string | undefined = findUserImg(transaction.from)

    return (
        <div className=' w-192 flex justify-left pt-5 px-10 bg-white border-x border-slate-300 pb-4 pt-4'>
            <div className='w-192 border-b border-slate-300 flex'>
            <div className=''>
                <Image 
                    src={`/${fromImg}`}
                    width={498}
                    height={500}
                    alt="Cat headshot number one"
                    className='object-cover w-20 h-20 rounded-full border border-slate-400'
                />
            </div>
            <div className='ml-4 mt-2 mb-4'>
                <div className='flex-column font-Hind pb-7'>
                    <p className=''>
                        <span className='font-semibold'>
                            {transaction.from}</span> {} <span className='font-semibold'>{transaction.to} </span>
                    </p>
                    <div className='flex items-center'>
                        <p className='text-sm text-slate-600 font-light mr-1'>3h</p>
                        <Image
                            width={100}
                            height={100}
                            alt="heart icon"
                            src="/icons/globe-icon.png"
                            className='w-4 h-4 my-1 mx-1'
                        />
                    </div>
                    <p className='mt-2 max-w-xl'>
                        {transaction.description}
                    </p>
                    <div className='flex mt-4'>
                        <div className='mr-7'>
                            <Image
                                width={100}
                                height={88}
                                alt="heart icon"
                                src="/icons/heart-icon-gray.png"
                                className='w-4.5 h-4.5 mr-1 cursor-pointer'
                            />
                            <p>{transaction.likes}</p>
                        </div>
                        <div className='mr-7'>
                            <Image
                                width={100}
                                height={104}
                                alt="comment icon"
                                src="/icons/comment-icon.png"
                                className='w-4.5 h-4.5 mr-1 cursor-pointer' 
                            />
                            <p>{transaction.comments.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}