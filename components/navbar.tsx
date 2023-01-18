import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
    const navItemStyle: string = "px-4 active:bg-white/10 transition border-transparent border hover:border hover:transition hover:border-white/20 hover:mx-2 rounded-full px-4 py-2.5 mx-2"

    return (
        <nav className="flex justify-between py-7 bg-blue-900 w-screen">
            <div className='flex'>
                <Image
                    src="/paycats-logo-whiteeyes.png"
                    width={200}
                    height={44.48}
                    alt="PayCats logo"
                    className='ml-5'
                />
                <div className='flex items-center text-white px-6 text-base font-Hind font-normal tracking-wide'>
                    <Link href="/pay-request" className='mr-2 bg-white text-blue-900 px-5 font-semibold border-2 border-white rounded-full py-2'>
                        Pay/Request
                    </Link>
                    <Link href="/" className={navItemStyle}>
                        Home
                    </Link>
                    <Link href="/profile" className={navItemStyle}>
                        Profile
                    </Link>
                    <Link href="/wallet" className={navItemStyle}>
                        Wallet
                    </Link>
                    <Link href="/about" className={navItemStyle}>
                        About
                    </Link>
                </div>
            </div>
            <div className='flex items-center'>
                <Image
                    src="/notification-bell.png"
                    width={139}
                    height={163}
                    alt="notifications bell"
                    className='w-5 h-6 mr-7 cursor-pointer'
                />
                <Link 
                    href="/profile/login"
                    className='font-bold text-white tracking-wider mr-7 text-xs'>
                    LOG IN
                </Link>
            </div>
        </nav>
    )
}