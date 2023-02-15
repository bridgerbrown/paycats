import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../context/AuthContext'
import { updateUnread } from '../firebase/firestore'
import React, {MouseEvent, useEffect} from 'react'

export default function Navbar() {
    const navItemStyle: string = "text-base font-normal px-3 active:bg-white/10 transition border-transparent border hover:border hover:transition hover:border-white/20 hover:mx-2 rounded-full px-4 py-2.5 mx-2"
    const { userFound, userImage, unreadBell, setUnreadBell } = useAuth()

    useEffect(() => {

    }, [unreadBell])

    const dynamicUserImg = () => {
        if(userFound) {
            return `/cat-profile-${userImage}.jpg`
        } else {
            return `/cat-profile-1.jpg`
        }
    }

    function redirectIfNoUser(route: string) {
        return userFound ? route : "/profile/signup"
    }

    const bellToRead = () => {
        updateUnread(userFound, false)
        setUnreadBell(false)
        console.log(unreadBell)
    }


    return (
        <nav className="relative flex justify-between py-7 bg-blue-900 w-screen">
            <div className='flex'>
                <Link href="/" className="">
                    <Image
                        src="/paycats-logo-whiteeyes.png"
                        width={200}
                        height={44.48}
                        alt="PayCats logo"
                        className='ml-14'
                    />
                </Link>
                <div className='flex items-center text-white px-6 font-Hind tracking-wide'>
                    <Link href={redirectIfNoUser("/pay-request")} className='text-base font-normal mr-2 bg-white text-blue-900 px-5 font-semibold border-2 border-white rounded-full py-2'>
                        Pay/Request
                    </Link>
                    <Link href="/" className={navItemStyle}>
                        Home
                    </Link>
                    <Link href={redirectIfNoUser("/my-transactions")} className={navItemStyle}>
                        My Transactions
                    </Link>
                    <Link href={redirectIfNoUser("/balance")} className="px-3 active:bg-white/10 transition border-transparent border hover:border hover:transition hover:border-white/20 hover:mx-2 rounded-full px-4 py-2.5 mx-2">
                        <div className='flex items-center'>
                            <h2 className='tracking-wide text-white'>Balance</h2>
                        </div>
                    </Link>
                    <Link href="/about" className={navItemStyle}>
                        About
                    </Link>
                </div>
            </div>
            <div className='flex items-center'>
                <Link href={redirectIfNoUser("/notifications")}>
                    <Image
                        src="/notification-bell.png"
                        width={139}
                        height={163}
                        alt="notifications bell"
                        className='w-5 h-6 mr-7 cursor-pointer'
                        onClick={() => bellToRead()}
                    />
                    { userFound ?
                        unreadBell
                        ?
                        <span className="absolute top-8 right-20 h-2.5 w-2.5 mr-4">
                            <span className="animate-ping absolute top-2 right-0 inline-flex h-2.5 w-2.5 rounded-full bg-sky-400 opacity-75"></span>
                            <span className="absolute top-2 right-0 inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                        </span>
                        :
                        <div></div>
                        :
                        <div></div>
                    }
                </Link>
                { !userFound ? (
                    <Link 
                        href="/profile/login"
                        className='font-bold text-white tracking-wider mr-14 text-xs'>
                        LOG IN
                    </Link>
                ) : (
                    <Link 
                        href="/profile"
                        className=''>
                            <Image
                            src={dynamicUserImg()}
                            width={25}
                            height={25}
                            alt="user icon"
                            className='w-10 h-10 rounded-full mr-8 cursor-pointer'
                            /> 
                    </Link> 
                )}
            </div>
        </nav>
    )
}