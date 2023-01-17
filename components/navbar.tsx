import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="h-32">
            <div className='flex bg-blue-600 w-screen'>
                <Link href="/">Home</Link>
                <Link href="/">Profile</Link>
                <Link href="/">Wallet</Link>
                <Link href="/">Search</Link>
            </div>
        </nav>
    )
}