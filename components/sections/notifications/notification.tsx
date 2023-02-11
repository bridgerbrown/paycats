import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Notification(props: any) {
    const { userNotification } = props

    const getNotificationLink = (type: string) => {
        if(type == "commented"){
            return "/my-transactions"
        } else if(type == "requestApproved"){
        } else if(type == "requestDenied"){
        } else if(type == "transactionAchievement"){
        }
    }

    return (
        <div className='w-192 flex justify-left items-center px-10'>
                <Link href="my-transactions" className='border border-slate-2s00 rounded my-2 w-full py-4 hover:bg-slate-100 flex'>
                    <div className='text-md flex font-Hind ml-4 flex items-center justify-between w-192'>
                        <div className='flex'>
                            <Image 
                                src="/regdollars-icon.png"
                                width={476}
                                height={303}
                                alt="dollars icon"
                                className='object-fit w-9 h-6 mr-4'
                            />
                            <p className='font-regular marker:text-slate-500'>
                                {userNotification.message}
                            </p>
                        </div>
                        <p className='text-slate-400 text-sm pr-4'>1d ago</p>
                    </div>
                </Link>
        </div>
    )
}