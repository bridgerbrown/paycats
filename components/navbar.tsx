import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
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
                <Link href="/pay-request" className='bg-white text-blue-900 px-5 font-semibold border-2 border-white rounded-full py-2'>
                    Pay/Request
                </Link>
                <Link href="/" className='px-6'>
                    Home
                </Link>
                <Link href="/profile" className='px-6'>
                    Profile
                </Link>
                <Link href="/wallet" className='px-6'>
                    Wallet
                </Link>
                <Link href="/search" className='px-6'>
                    Search
                </Link>
            </div>
        </nav>
    )
}