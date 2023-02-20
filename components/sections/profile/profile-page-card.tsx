import React, {useState, MouseEvent, useEffect } from 'react'
import Image from 'next/image'
import { useAuth } from '@/components/context/AuthContext'
import Link from 'next/link'
import { changeUserImage } from '@/components/firebase/firestore'
import Loading from '@/components/features/loading'
import { useRouter } from 'next/router'
import { transactions } from '@/components/data/defaultTransactions'

// Leaving userFound for username display for now

export default function ProfilePageCard({findUser}: any) {
    const { userFound, loading, logOut, updateUserImage, userImage, setUserImage } = useAuth()
    const username = userFound ? userFound.substring(0, userFound.lastIndexOf("@")) : ""
    const asperandUsername = userFound ? (userFound.substring(0, userFound.lastIndexOf("@"))).replace(" ", "-") : ""
    const inputCss = `xs:h-20 xs:w-20 sm:h-24 sm:w-24 lg:h-36 lg:w-36 cursor-pointer checked:ring-4 active:ring-blue-600 active:ring-offset-4 active:ring-4 checked:ring-offset-4 checked:ring-blue-600 ring- ring-slate-300 rounded-none border-none mx-2 bg-cover z-10 bg-transparent`
    const [imageChange, setImageChange] = useState<boolean>(false)
    const [radioState, setRadioState] = useState<string>(findUser.img)
    const router = useRouter()

    useEffect(() => {

    }, [userFound, findUser, radioState])

    const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioState(e.currentTarget.value)
    }

    const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setImageChange(!imageChange)
    }

    const sendUserImg = () => {
        return new Promise(resolve => {
                resolve(
                    updateUserImage(findUser.email, radioState)
                    )
        })
    }

    async function handleImgSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setImageChange(!imageChange)
        setUserImage(radioState)
        await sendUserImg()
        setTimeout((() => router.reload()), 500)
    }

    const dynamicUserImg = () => {
        if(findUser) {
            setUserImage(findUser.img)
            return `/cat-profile-${radioState}.jpg`
        } else {
            return `/cat-profile-1.jpg`
        }
    }

    const numberOfUsersTransactions = (username: string) => {
        const onlyMyTransactions = findUser ? findUser.transactions.filter(
            function (item: any) {
                return item.from == username || item.to == username
            }
        ) : transactions
        console.log(onlyMyTransactions.length)
        return onlyMyTransactions.length
    }

    if(loading) return (
        <div>
            <Loading/>
        </div>
    )

    return (
        <div className='w-screen flex justify-center'>
            <div className='xs:w-11/12 shadow-md rounded-lg border border-slate-300 flex items-center justify-center pt-20 pb-28 mt-0 mb-6 font-Hind bg-white sm:w-144 lg:w-192'>
                    {
                        imageChange ?
                        <div>
                            <h2 className='text-center xs:text-lg sm:text-xl mb-8'>Choose a new profile picture:</h2>
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
                            className='object-cover w-36 h-36 shadow-md rounded-full border border-slate-400 mt-2 mb-4'
                        />
                        <h1 className='text-3xl flex justify-center mb-2'>{username}</h1>
                        <h2 className='text-md flex justify-center mb-2'>{userFound}</h2>
                        <div className='flex'>
                            <p className='font-thin text-slate-500 tracking-wide'>@{asperandUsername}</p>
                            <ul className='ml-6 text-slate-500'><li className='list-disc'></li></ul>
                            <p className='font-semibold tracking-wider'>4 friends</p>
                        </div>
                        <div className='my-2'>
                            <p className='font-normal text-sm tracking-wider'>{
                                findUser ?
                            numberOfUsersTransactions(username)
                            : ""
                            } transactions</p>
                        </div>
                        <div className='mt-6 flex justify-center items-center'>
                            <button
                                onClick={handleMouseEvent}
                                className='mr-2 font-semibold font-Hind rounded-full border border-sky-700 text-sky-700 py-1.5 px-4'>
                                    Edit
                            </button>
                            <Link href="/profile/login">
                                <h1 onClick={() => logOut()} className='cursor-pointer ml-2 bg-blue-900 text-white px-4 py-1.5 rounded-full hover:bg-blue-700'>
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