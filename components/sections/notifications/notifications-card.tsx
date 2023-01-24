import React from 'react'
import Image from 'next/image'
import Notification from './notification'

export default function NotificationsCard() {
    return (
        <div className=''>
            <div className='rounded-lg border border-slate-300 flex py-4 mt-0 mb-6 font-Hind bg-white mx-20 w-192'>
                <div className='flex flex-col'>
                    <div className='mt-4 mb-8 flex flex-col'>
                        <Notification />
                        <Notification />
                    </div>
                </div>
            </div>
        </div>
    )
}