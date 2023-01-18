import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
    const navItemStyle: string = "px-4 transition border-transparent border hover:border hover:transition hover:border-white hover:mx-2 active:border rounded-full px-5 py-2 mx-2"

    return (
        <nav className="flex py-7 bg-blue-900 w-screen">
            <Image
                src="/paycats-logo.png"
                width={200}
                height={44.48}
                alt="PayCats logo"
                className='ml-5'
            />
            <div className='flex items-center text-white px-6 text-base font-Hind font-normal tracking-wide'>
                <Link href="/pay-request" className='mr-4 bg-white text-blue-900 px-5 font-semibold border-2 border-white rounded-full py-2'>
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
                <Link href="/search" className={navItemStyle}>
                    Search
                </Link>
                <Link href="/search" className={navItemStyle}>
                    About
                </Link>
            </div>
        </nav>
    )
}