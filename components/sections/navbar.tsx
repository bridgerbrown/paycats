import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const navItemStyle: string = "text-base font-normal px-3 active:bg-white/10 transition border-transparent border hover:border hover:transition hover:border-white/20 hover:mx-2 rounded-full px-4 py-2.5 mx-2"
    const { userFound, userImage } = useAuth()

    const dynamicUserImg = () => {
        if(userFound) {
            return `/cat-profile-${userImage}.jpg`
        } else {
            return `/cat-profile-1.jpg`
        }
    }

    function redirectIfNoUser(route: string) {
        return userFound ? route : "/signup"
    }

    return (
        <nav className="flex justify-between py-7 bg-blue-900 w-screen">
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
                    <Link href="/pay-request" className='text-base font-normal mr-2 bg-white text-blue-900 px-5 font-semibold border-2 border-white rounded-full py-2'>
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
                <Link href="/notifications">
                    <Image
                        src="/notification-bell.png"
                        width={139}
                        height={163}
                        alt="notifications bell"
                        className='w-5 h-6 mr-7 cursor-pointer'
                    />
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