import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import React, {MouseEvent, useEffect, useState} from 'react'
import Image from 'next/image'
import { useAuth } from '@/components/context/AuthContext'
import Loading from '@/components/features/loading'
import { GetServerSideProps, InferGetServerSidePropsType, } from 'next'
import { collection, getDocs} from "firebase/firestore";
import { db } from '@/components/firebase/firebase.config'
import { updateNotifications } from '@/components/firebase/firestore'
import { updateUnread } from '@/components/firebase/firestore'

export default function Balance({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { userFound, transferMoneyBtn, loading, setUnreadBell } = useAuth()
    const findUser = users.find((item: any) => item.email === userFound)
    const [balance, setBalance] = useState<number>(findUser.balance)
    const formattedBalance = (balance).toLocaleString("en-US")

    const handleTransferSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setBalance(prev => balance + 10000)
        transferMoneyBtn(userFound, findUser)
        alert("Transfered $10,000 to your account!")
        const transferNotification: any = {
            message: `Successfully transferred $10,000 to your balance.` ,
            type: "transfer",
            id: findUser.notifications.length,
        }
        const allNotifications = [
                ...findUser.notifications, transferNotification,
        ]
        updateNotifications(userFound, allNotifications)
        updateUnread(findUser.email, true)
        setUnreadBell(true)
    }

    useEffect(() => {

    }, [balance])

    if(loading) return (
        <div>
            <Loading/>
        </div>
    )

    return (
        <div className='w-screen min-h-screen relative font-Hind bg-stone-100'>
        <Navbar />
            <div className='flex justify-center'>
                <div className=' w-192 mt-8 mb-4'>
                    <h1 className='text-xl font-normal tracking-wide'>Balance</h1>
                </div>
            </div>
            <div className='pb-96 flex justify-center mx-20'>
                <div className='shadow-md bg-white py-5 px-5 mx-3 w-96 h-56 border border-slate-300 rounded-lg'>
                    <h2 className='text-slate-900 text-xl font-semibold'>PayCats balance</h2>
                    <h1 className='text-5xl tracking-wide'>${formattedBalance}.00</h1>
                    <p className='text-slate-900 text-sm mb-6'>Available</p>
                    <button 
                        onClick={handleTransferSubmit}
                        className='bg-blue-900 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700'>
                            Transfer Money
                    </button>
                </div>
                <div className='shadow-md bg-white py-5 px-5 mx-3 w-96 h-76 border border-slate-300 rounded-lg'>
                    <h2 className='text-slate-900 text-xl font-semibold mb-2'>Bank and cards</h2>
                    <div className='flex-col justify-center items-center'>
                        <div className='px-3 pt-3 pb-4 flex items-start cursor-pointer my-1 transition hover:transition hover:bg-slate-200 w-full rounded-sm'>
                            <Image 
                                src="/bank-icon.png"
                                alt='bank icon'
                                width={48}
                                height={32}
                                className="object-contain mt-2 mr-4"
                            />
                            <div>
                                <h2 className='text-2xl'>WHISKERS WEALTH BANK</h2>
                                <h3 className='text-sm'>Checking ••••1234</h3>
                            </div>
                        </div>
                    </div>
                    <div className='flex-col justify-center items-center'>
                        <div className='px-3 pt-3 pb-4 flex items-start cursor-pointer my-1 transition hover:transition hover:bg-slate-200 w-full rounded-sm'>
                            <Image 
                                src="/bank-icon.png"
                                alt='bank icon'
                                width={48}
                                height={32}
                                className="object-contain mt-2 mr-4"
                            />
                            <div>
                                <h2 className='text-2xl'>FELINE FIRST FINANCIAL</h2>
                                <h3 className='text-sm'>Checking ••••1234</h3>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h2 
                        className='w-fit text-xl text-blue-600 font-semibold hover:border-b-2 hover:border-blue-800 border-b-2 border-transparent hover:text-blue-800 cursor-pointer'>
                            Link a Card or Bank
                        </h2>
                    </div>
                </div>
            </div>
        <Footer />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const usersRef = collection(db, 'users')
    const users: any = []
    const snapshot = await getDocs(usersRef)
    snapshot.forEach((doc) => {
        users.push({ ...doc.data() })
        })
    return {
        props: {
            users: users
        }
    }
}