import React, {useState, MouseEvent } from 'react'
import Image from 'next/image'
import { useAuth } from '@/components/context/AuthContext'
import Link from 'next/link'
import { changeUserImage } from '@/components/firebase/firestore'

interface UsernameProps {user: string}

export default function ProfilePageCard({user}:UsernameProps) {
    const { logOut, userDoc, setUserDoc, updateUserImage } = useAuth()
    const username = user ? user.substring(0, user.lastIndexOf("@")) : ""
    const asperandUsername = user ? (user.substring(0, user.lastIndexOf("@"))).replace(" ", "-") : ""
    const inputCss = `cursor-pointer checked:ring-4 active:ring-blue-600 active:ring-offset-4 active:ring-4 checked:ring-offset-4 checked:ring-blue-600 ring- ring-slate-300 rounded-none border-none mx-2 bg-cover h-36 w-36 z-10 bg-transparent`

    const [imageChange, setImageChange] = useState<boolean>(false)
    const [radioState, setRadioState] = useState<string>("1")

    const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioState(e.currentTarget.value)
    }

    const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setImageChange(!imageChange)
    }

    const sendUserImg = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(
                    updateUserImage(user, radioState)
                    )
            }, 2000)
        })
    }

    async function handleImgSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setUserDoc({...userDoc, img: radioState})
        setImageChange(!imageChange)
        await sendUserImg()
    }

    const dynamicUserImg = () => {
        if(userDoc) {
            return `/cat-profile-${userDoc.img.replace('"', '')}.jpg`
        } else {
            return `/cat-profile-1.jpg`
        }
    }

    return (
        <div className=''>
            <div className='rounded-lg border border-slate-300 flex items-center justify-center pt-20 pb-28 mt-0 mb-6 font-Hind bg-white mx-20 w-192'>
                    {
                        imageChange ?
                        <div>
                            <h2 className='text-xl mb-6'>Choose a new profile picture:</h2>
                            <div className='flex my-2'>
                                <form action="">
                                    <input type="radio" name="img" id="img1" value="1"
                                        onChange={(e) => onRadioChange(e)}
                                        className={`bg-profile1 checked:bg-profile1 ${inputCss}`} 
                                    />
                                    <input type="radio" name="img" id="img1" value="2"
                                        onChange={(e) => onRadioChange(e)}
                                        className={`bg-profile2 checked:bg-profile2 ${inputCss}`} 
                                    />
                                    <input type="radio" name="img" id="img1" value="3"
                                        onChange={(e) => onRadioChange(e)}
                                        className={`bg-profile3 checked:bg-profile3 ${inputCss}`} 
                                    />
                                    <input type="radio" name="img" id="img1" value="4"
                                        onChange={(e) => onRadioChange(e)}
                                        className={`bg-profile4 checked:bg-profile4 ${inputCss}`} 
                                    />
                                    <div className='mt-12 flex justify-center'>
                                        <button 
                                            onClick={handleImgSubmit}
                                            className='mr-2 cursor-pointer ml-2 bg-blue-900 text-white px-4 py-1.5 rounded-full hover:bg-blue-700'
                                            >
                                                Confirm
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                        :
                    <div className='flex flex-col justify-center items-center'>
                    <Image 
                        src={dynamicUserImg()}
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
                        <button
                            onClick={handleMouseEvent}
                            className='mr-2 font-semibold font-Hind rounded-full border border-sky-700 text-sky-700 py-1.5 px-4'>
                                Edit
                        </button>
                        <Link href="/profile/login">
                            <h1 onClick={logOut} className='cursor-pointer ml-2 bg-blue-900 text-white px-4 py-1.5 rounded-full hover:bg-blue-700'>
                                Log out
                            </h1>
                        </Link>
                    </div>
                    </div>
                    }
            </div>
        </div>
    )
}