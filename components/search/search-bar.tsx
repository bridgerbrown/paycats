import React from 'react'
import Image from 'next/image'

export default function SearchBar() {
    return (
        <div className='flex justify-center px-5 mt-8 mb-12'>
            <span className="sr-only">Search</span>
            <span className="relative left-8 flex items-center pl-2">
                <Image 
                    src="/magnifying-glass.png"
                    width={20}
                    height={20}
                    className="h-4 w-4 opacity-50" 
                    alt='magnifying glass for search bar'
                />
            </span>
            <input className="form-input pl-12 w-1/2 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search..." type="search" name="search"/>
        </div>
    )
}