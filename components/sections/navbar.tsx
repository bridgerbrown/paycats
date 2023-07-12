import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../context/AuthContext'
import { updateUnread } from '../firebase/firestore'
import React, {MouseEvent, useEffect, useState} from 'react'

export default function Navbar() {
    const navItemStyle: string = "sm:text-sm md:text-base font-normal sm:px-2 md:px-3 active:bg-white/10 transition border-transparent border hover:border hover:transition hover:border-white/20 hover:mx-2 rounded-full px-4 py-2.5 mx-2"
    const burgerItemStyle: string = "text-center text-2xl font-light tracking-wide active:bg-white/10 transition border-transparent border hover:border hover:transition hover:border-white/20 px-7 rounded-full py-5"
    const { userFound, userImage, unreadBell, setUnreadBell } = useAuth()
    const [bell, setBell] = useState<boolean>(unreadBell)
    const [backdropMenu, setBackdropMenu] = useState<boolean>(false)

    useEffect(() => {

    }, [unreadBell, bell, backdropMenu])

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
        setUnreadBell(false)
        setBell(false)
        updateUnread(userFound, false)
    }

    const backdropToggle = () => {
        setBackdropMenu(!backdropMenu)
    }

    return (
        <div>
            <nav className="relative flex justify-between sm:py-5 lg:py-7 xs:h-24 sm:h-fit bg-blue-900 w-screen">
                <div className='lg:flex sm:flex-column sm:justify-center md:justify-start'>
                    <div className='w-screen md:flex-column lg:flex items-center text-white font-Hind tracking-wide'>
                        <div className='sm:w-screen sm:flex sm:justify-center lg:w-60'>
                            <Link href="/" className="">
                                <Image
                                    src="/paycats-logo-whiteeyes.png"
                                    width={200}
                                    height={44.48}
                                    alt="PayCats logo"
                                    className='lg:ml-8 xs:ml-4 sm:mb-2 lg:mb-1 xs:mt-5 xs:pt-0.5 sm:mt-1 sm:w-60'
                                />
                            </Link>
                        </div>

                        <div id="navbar-menu" className='xs:hidden sm:flex xs:ml-0 lg:ml-16 w-screen xs:justify-center lg:justify-between'>
                            <div className='flex items-center justify-start'>
                                <Link href={redirectIfNoUser("/pay-request")} className='sm:text-sm md:text-base font-normal mr-2 bg-white text-blue-900 px-5 font-semibold border-2 border-white rounded-full py-2'>
                                    Pay/Request
                                </Link>
                                <Link href="/" className={navItemStyle}>
                                    Home
                                </Link>
                                <Link href={redirectIfNoUser("/my-transactions")} className={`text-center ${navItemStyle}`}>
                                    My Transactions
                                </Link>
                                <Link href={redirectIfNoUser("/balance")} className="px-3 active:bg-white/10 transition border-transparent border hover:border hover:transition hover:border-white/20 hover:mx-2 rounded-full px-4 py-2.5 mx-2">
                                    <div className='flex items-center'>
                                        <h2 className='sm:text-sm md:text-base tracking-wide text-white'>Balance</h2>
                                    </div>
                                </Link>
                                <Link href="/about" className={navItemStyle}>
                                    About
                                </Link>
                            </div>
                            <div className='flex ml-4 items-center xs:mr-0 lg:mr-0'>
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
                                        <span className="absolute lg:top-9 lg:right-20 h-2.5 w-2.5 mr-4">
                                            <span className="animate-ping absolute sm:-top-6 sm:-right-3 md:-top-6 md:-right-3 lg:top-2 lg:right-0 inline-flex h-2.5 w-2.5 rounded-full bg-sky-400 opacity-75"></span>
                                            <span className="absolute sm:-top-6 sm:-right-3 md:-top-6 md:-right-3 lg:top-2 lg:right-0 inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
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
                                        className='font-bold text-white tracking-wider xs:mr-0 lg:mr-12 text-xs'>
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
                        </div>
                        {
                            backdropMenu ?
                            <div className='p-6 xs:absolute sm:hidden top-2 right-4'>
                                <Image
                                    src="/icons/x-icon.png"
                                    width={200}
                                    height={200}
                                    alt="exit out of nav menu"
                                    className='cursor-pointer h-7 w-7'
                                    id='burger-close'
                                    onClick={backdropToggle}
                                />
                            </div>
                            :
                            <div id="burger-menu" className="p-6 xs:absolute sm:hidden top-2 right-4 space-y-2 cursor-pointer"
                                onClick={backdropToggle}
                            >
                                <div className="w-8 h-1 bg-white"></div>
                                <div className="w-8 h-1 bg-white"></div>
                                <div className="w-8 h-1 bg-white"></div>
                            </div>
                        }
                    </div>
                </div>
                
            </nav>
            {
                backdropMenu ?
                <div id="backdrop-menu" className='xs:absolute sm:hidden z-10 opacity-95 bg-blue-900 w-screen h-screen'>
                    <div className='font-Hind pt-4 flex-col flex text-white items-center justify-center'>
                        <Link href={redirectIfNoUser("/pay-request")} onClick={backdropToggle} className='my-4 text-xl font-normal bg-white text-blue-900 px-5 font-semibold border-2 border-white rounded-full py-2'>
                            Pay/Request
                        </Link>
                        <Link href="/" onClick={backdropToggle} className={burgerItemStyle}>
                            Home
                        </Link>
                        <Link href={redirectIfNoUser("/my-transactions")} onClick={backdropToggle} className={`text-center ${burgerItemStyle}`}>
                            My Transactions
                        </Link>
                        <Link href={redirectIfNoUser("/balance")} onClick={backdropToggle} className={burgerItemStyle}>
                                Balance
                        </Link>
                        <Link href="/about" onClick={backdropToggle} className={burgerItemStyle}>
                            About
                        </Link>
                        <div className='flex w-screen justify-center items-center mt-4'>
                                <Link href={redirectIfNoUser("/notifications")}
                                className="p-4"
                                >
                                    <Image
                                        src="/notification-bell.png"
                                        width={139}
                                        height={163}
                                        alt="notifications bell"
                                        className='w-6 h-7 mr-2 cursor-pointer'
                                        onClick={() => bellToRead()}
                                    />
                                    { userFound ?
                                        unreadBell
                                        ?
                                        <span className="absolute h-2.5 w-2.5 mr-2">
                                            <span className="animate-ping absolute bottom-7 left-4 inline-flex h-2.5 w-2.5 rounded-full bg-sky-400 opacity-75"></span>
                                            <span className="absolute bottom-7 left-4 inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
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
                                        className='ml-2 p-4 font-bold text-white tracking-wider text-xs'>
                                        LOG IN
                                    </Link>
                                ) : (
                                    <Link 
                                        href="/profile"
                                        className='p-4'>
                                            <Image
                                            src={dynamicUserImg()}
                                            width={25}
                                            height={25}
                                            alt="user icon"
                                            className='ml-2 w-12 h-12 rounded-full cursor-pointer'
                                            /> 
                                    </Link> 
                                )}
                            </div>
                    </div>
                </div>
                :
                <div></div>
            }
        </div>
    )
}
