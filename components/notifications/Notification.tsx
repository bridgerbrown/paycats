import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { updateNotifications, updateUnread } from '../../data/firebase/firestore';

export default function Notification(props: any) {
    const { userNotification, findUser } = props
    const [read, setRead] = useState<any>(userNotification.read)

    useEffect(() => {
    }, [read])

    function updateReadNotifications(id: number){
        const allNotifications = findUser.notifications.map((item: any) => item.id === id ? {...item, read: true}: item)
        updateNotifications(findUser.email, allNotifications)
        setRead(true)
        updateUnread(findUser.email, false)
    }
    
    const getNotificationLink = (type: string) => {
        if(type == "commented"){
            return "/my-transactions"
        } else if(type == "payment"){
            return "/my-transactions"
        } else if(type == "requestApproved"){
            return "/my-transactions"
        } else if(type == "requestDenied"){
            return "/my-transactions"
        } else if(type == "transactionAchievement"){
            return "/profile"
        } else if(type == "signUp"){
            return "/profile"
        } else if(type == "transfer"){
            return "/wallet"
        }
    }

    const getNotificationImage = (type: string) => {
        if(type == "commented"){
            return "/icons/comment-notif-icon.png"
        } else if(type == "payment"){
            return "/icons/wavydollars-icon.png"
        } else if(type == "requestApproved"){
            return "/icons/handmoney-icon.png"
        } else if(type == "requestDenied"){
            return "/icons/frown-icon.png"
        } else if(type == "transactionAchievement"){
            return "/icons/achievement-icon.png"
        } else if(type == "signUp"){
            return "/icons/smile-icon.png"
        } else if(type == "transfer"){
            return "/icons/wallet-icon.png"
        }
    }

    return (
        <div className='sm:w-144 lg:w-192 flex justify-left items-center px-10'>
            {
               read ?
               <Link href={`${getNotificationLink(userNotification.type)}`} className='w-full'>
                    <div id="element" className='border border-slate-2s00 rounded my-2 w-full py-4 hover:bg-slate-100 flex text-md flex font-Hind ml-4 flex items-center justify-between w-192'>
                        <div className='flex items-center'>
                            <Image 
                                src={`${getNotificationImage(userNotification.type)}`}
                                width={700}
                                height={700}
                                alt={"notification " + userNotification.type + " read"}
                                className='object-fit w-9 h-9 mx-4'
                            />
                            <p className='font-regular text-slate-300'>
                                {userNotification.message}
                            </p>
                        </div>
                    </div>
                </Link>
               :
               <Link href="my-transactions" className='w-full'>
                    <div onMouseOver={() => updateReadNotifications(userNotification.id)} className='border border-slate-2s00 rounded my-2 w-full py-4 hover:bg-slate-100 flex cursor-pointer text-md flex font-Hind ml-4 flex items-center justify-between w-192'>
                        <div className='flex items-center'>
                            <Image 
                                src={`${getNotificationImage(userNotification.type)}`}
                                width={700}
                                height={700}
                                alt={"notification " + userNotification.type + " unread"}
                                className='object-fit w-9 h-9 mx-4'
                            />
                            <p className='font-regular marker:text-slate-500'>
                                {userNotification.message}
                            </p>
                        </div>
                        <span className="flex h-3 w-3 mr-4">
                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                    </div>
                </Link> 
            }
        </div>
    )
}
