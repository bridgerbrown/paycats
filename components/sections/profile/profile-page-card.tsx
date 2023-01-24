import React from 'react'
import Image from 'next/image'
import { useAuth } from '@/components/context/AuthContext'
import Link from 'next/link'

interface UsernameProps {user: string}

export default function ProfilePageCard({user}:UsernameProps) {
    const { logOut } = useAuth()
    const username = user.substring(0, user.lastIndexOf("@"))
    const asperandUsername = (user.substring(0, user.lastIndexOf("@"))).replace(" ", "-")

    return (
        <div className=''>
            <div className='rounded-lg border border-slate-300 flex items-center justify-center pt-20 pb-28 mt-0 mb-6 font-Hind bg-white mx-20 w-192'>
                <div className='flex flex-col justify-center items-center'>
                    <Image 
                        src="/cat1.jpg"
                        width={498}
                        height={500}
                        alt="Cat headshot number one"
                        className='object-cover w-32 h-32 rounded-full border border-slate-400 mb-4'
                    />
                    <h1 className='text-2xl flex justify-center mb-2'>{username}</h1>
                    <h2 className='text-md flex justify-center mb-2'>{user}</h2>
                    <div className='flex'>
                        <p className='font-thin text-slate-500 tracking-wide'>@{asperandUsername}</p>
                        <ul className='ml-6 text-slate-500'><li className='list-disc'></li></ul>
                        <p className='font-semibold tracking-wider'>10 friends</p>
                    </div>
                    <div className='mt-6 mb-4 flex justify-center items-center'>
                        <button className='mr-2 font-semibold font-Hind rounded-full border border-sky-700 text-sky-700 py-1.5 px-4'>Edit</button>
                        <Link href="/profile/login">
                            <h1 onClick={logOut} className='cursor-pointer ml-2 bg-blue-900 text-white px-4 py-1.5 rounded-full hover:bg-blue-700'>
                                Log out
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}