import React from 'react'
import Image from 'next/image'

export default function Notification(props: any) {

    const getNotificationMessage = (type: string) => {
        if(type == "commented"){
            let commented = `${props.notificationFrom} commented on your payment.`
            return commented
        } else if(type == "requestApproved"){
            let requestApproved = `${props.notificationFrom} approved your payment request.`
            return requestApproved
        } else if(type == "requestDenied"){
            let requestDenied = `${props.notificationFrom} denied your payment request.`
            return requestDenied
        } else if(type == "transactionAchievement"){
            let transactionAchievement = `Congratulations! You have made 5 transactions!`
            return transactionAchievement
        }
    }

    return (
        <div className='w-192 flex justify-left items-center px-10'>
            <div className='w-192 py-4 border-b border-slate-300 flex items-center'>
                <div className=''>
                    <Image 
                        src="/cat1.jpg"
                        width={498}
                        height={500}
                        alt="Cat headshot number one"
                        className='object-cover w-12 h-12 rounded-full border border-slate-400'
                    />
                </div>
                <div className='ml-4 flex items-center'>
                    <div className='flex-column font-Hind'>
                        <p className='font-semibold'>
                            Meesha requests $80.00
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}