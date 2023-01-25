import React from 'react'
import Image from 'next/image'

export default function ImageChanger() {
    const inputCss = `active:ring-blue-600 active:ring-offset-4 active:ring-2 checked:ring-offset-4 checked:ring-blue-600 ring-2 ring-slate-300 rounded-none border-none mx-2 bg-cover h-36 w-36 z-10 bg-transparent`
    return (
        <div className='flex my-2'>
            <input type="radio" name="img1" id="img1" 
                className={`bg-profile1 checked:bg-profile1 ${inputCss}`} 
            />
            <input type="radio" name="img1" id="img1" 
                className={`bg-profile2 checked:bg-profile2 ${inputCss}`} 
            />
            <input type="radio" name="img1" id="img1" 
                className={`bg-profile3 checked:bg-profile3 ${inputCss}`} 
            />
            <input type="radio" name="img1" id="img1" 
                className={`bg-profile4 checked:bg-profile4 ${inputCss}`} 
            />
        </div>
    )
}