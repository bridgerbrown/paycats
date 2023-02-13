import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Notification(props: any) {
    const { userNotification, updateReadNotifications } = props

    const getNotificationLink = (type: string) => {
        if(type == "commented"){
            return "/my-transactions"
        } else if(type == "requestApproved"){
        } else if(type == "requestDenied"){
        } else if(type == "transactionAchievement"){
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
        <div className='w-192 flex justify-left items-center px-10'>
            {
               userNotification.read ?
               <Link href="my-transactions" onMouseOver={updateReadNotifications(userNotification.id)} className='border border-slate-2s00 rounded my-2 w-full py-4 hover:bg-slate-100 flex'>
                    <div className='text-md flex font-Hind ml-4 flex items-center justify-between w-192'>
                        <div className='flex items-center'>
                            <Image 
                                src={getNotificationImage(userNotification.type)}
                                width={700}
                                height={700}
                                alt="dollars icon"
                                className='object-fit w-9 h-9 mr-4'
                            />
                            <p className='font-regular text-slate-300'>
                                {userNotification.message}
                            </p>
                        </div>
                        <p className='text-slate-400 text-sm pr-4'>1d ago</p>
                    </div>
                </Link>
               :
               <Link href="my-transactions" onMouseOver={updateReadNotifications(userNotification.id)} className='border border-slate-2s00 rounded my-2 w-full py-4 hover:bg-slate-100 flex'>
                    <div className='text-md flex font-Hind ml-4 flex items-center justify-between w-192'>
                        <div className='flex items-center'>
                            <Image 
                                src={getNotificationImage(userNotification.type)}
                                width={700}
                                height={700}
                                alt="dollars icon"
                                className='object-fit w-9 h-9 mr-4'
                            />
                            <p className='font-regular marker:text-slate-500'>
                                {userNotification.message}
                            </p>
                        </div>
                        <p className='text-slate-400 text-sm pr-4'>1d ago</p>
                    </div>
                </Link>
            }
        </div>
    )
}

    // Notifications for
    // 1) Paying -- DONE
    // 2) Requesting -- DONE
    // 3) Denied Request by Mr. Bitters -- DONE
    // 4) Bank Transfers -- DONE
    // 5) Achievements
    // 6) Signing up -- DONE

    // Read notification state
    // - On bell click or hover to mark as read
    // - New not's on bell animation