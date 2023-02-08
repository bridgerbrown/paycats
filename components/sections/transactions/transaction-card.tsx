import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { catUsers } from '../../data/catUsers'
import { useAuth } from '@/components/context/AuthContext'
import { getUserData } from '@/components/firebase/firestore'

export default function TransactionCard(props: any) {
    const {userFound, userImage, updateTransactionSocials} = useAuth()
    const transaction = props.transaction
    const [likes, setLikes] = useState<number>(transaction.likes)
    const [liked, setLiked] = useState<boolean>(transaction.likedByUser)
    const [comments, setComments] = useState<any>(transaction.comments.length)

    useEffect(() => {

    }, [likes])

    const updateLikes = () => {
        const addedLike = transaction.likes + 1
        const removedLike = transaction.likes - 1
        console.log(likes)
        if(liked) {
            getUserData(userFound)
            .then((data) => {
                updateTransactionSocials(data, transaction.id, removedLike, false, transaction.comments)
            })
            setLikes(prev => prev - 1)
            setLiked(!liked)
        } else if(!liked) {
            getUserData(userFound)
            .then((data) => {
                updateTransactionSocials(data, transaction.id, addedLike, true, transaction.comments)
            })
            setLikes(prev => prev + 1)
            setLiked(!liked)
        }
    }

    function findUserImg(fromUser: string) {
        for(let i = 0; i < catUsers.length; i++){
            if(catUsers[i].name === fromUser) {
                return (catUsers[i].img)
            }
        }
    }
    const username = userFound.substring(0, userFound.lastIndexOf("@"))
    const fromImg: string | undefined = transaction.from == username ? `cat-profile-${userImage}.jpg` : findUserImg(transaction.from)

    

    return (
        <div className='font-Hind w-192 flex justify-left pt-5 px-10 bg-white border-x border-slate-300 pb-4 pt-4'>
            <div className='w-192 border-b border-slate-300 flex'>
            <div className=''>
                <Image 
                    src={`/${fromImg}`}
                    width={498}
                    height={500}
                    alt="Cat headshot number one"
                    className='object-cover w-20 h-20 rounded-full border border-slate-400'
                />
            </div>
            <div className='ml-4 mt-2 mb-4'>
                <div className='flex-column font-Hind pb-7'>
                    <p className=''>
                        <span className='font-semibold'>
                            {transaction.from}</span> paid <span className='font-semibold'>{transaction.to} </span>
                    </p>
                    <div className='flex items-center'>
                        <p className='text-sm text-slate-600 font-light mr-1'>3h</p>
                        <Image
                            width={100}
                            height={100}
                            alt="heart icon"
                            src="/icons/globe-icon.png"
                            className='w-4 h-4 my-1 mx-1'
                        />
                    </div>
                    <p className='mt-2 max-w-xl'>
                        {transaction.description}
                    </p>
                    <div className='flex mt-4'>
                        <div className='mr-4 flex justify-center items-center'>
                            <Image
                                width={100}
                                height={88}
                                alt="heart icon"
                                src={liked ? "/icons/heart-icon-red.png" : "/icons/heart-icon-gray.png"}
                                className='w-4.5 h-4.5 mr-1 cursor-pointer'
                                onClick={() => updateLikes()}
                            />
                            <p className='ml-1 text-sm'>{likes}</p>
                        </div>
                        <div className='mr-7 flex justify-center items-center'>
                            <Image
                                width={100}
                                height={104}
                                alt="comment icon"
                                src="/icons/comment-icon.png"
                                className='w-4.5 h-4.5 mr-1 cursor-pointer' 
                            />
                            <p className='ml-1 text-sm'>{comments}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
