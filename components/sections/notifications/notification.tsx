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
                <Link href="my-transactions" className='w-full py-4 flex hover:bg-slate-100 border-b border-slate-300 flex items-center'>
                    <div className='flex-column font-Hind ml-4 flex items-center'>
                        <li className='font-regular marker:text-slate-500'>
                            {userNotification.message}
                        </li>
                    </div>
                </Link>
        </div>
        
    )
}