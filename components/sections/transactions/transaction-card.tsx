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
    const [commentsDropdown, setCommentsDropdown] = useState<boolean>(false)

    useEffect(() => {

    }, [likes])

    const updateLikes = () => {
        const addedLike = likes + 1
        const removedLike = likes <= 0 ? 0 : likes - 1
        console.log(likes)
        if(liked) {
            getUserData(userFound)
                .then((data) => {
                    updateTransactionSocials(data, transaction.id, removedLike, false, transaction.comments)
                })
            setLikes(prev => prev <= 0 ? 0 : prev - 1)
            setLiked(!liked)
            console.log("disliked " + (likes -1))
        } else if(!liked) {
            getUserData(userFound)
                .then((data) => {
                    updateTransactionSocials(data, transaction.id, addedLike, true, transaction.comments)
                })
            setLikes(prev => prev + 1)
            setLiked(!liked)
            console.log("liked " + (likes + 1))
        }
    }

    const toSingleTransaction = () => {
        setCommentsDropdown(!commentsDropdown)
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
            <div className='w-192 border-b border-slate-300 flex-column'>
                <div className='ml-2 flex'>
                    <Image 
                        src={`/${fromImg}`}
                        width={498}
                        height={500}
                        alt="Cat headshot number one"
                        className='mr-4 mt-1 object-cover w-20 h-20 rounded-full border border-slate-400'
                    />
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
                                    onClick={() => toSingleTransaction()}
                                />
                                <p className='ml-1 text-sm'>{comments}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    commentsDropdown
                    ?
                    <div className='w-3/4'>
                        {}
                        <div className=''>
                            <textarea placeholder="Write something..." 
                                className='w-full ml-26 resize-none h-12 mb-4 text-black'
                                id='description'
                            />
                        </div>
                    </div>
                    :
                    <div className='mb-2'></div>
                }
        </div>
    </div>
    )
}
