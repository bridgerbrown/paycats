import React, { useEffect, useState, MouseEvent } from 'react'
import Image from 'next/image'
import { catUsers } from '../../data/catUsers'
import { useAuth } from '@/components/context/AuthContext'
import { getUserData } from '@/components/firebase/firestore'
import Comment from './comment'

export default function TransactionCard(props: any) {
    const {userFound, userImage, updateTransactionSocials} = useAuth()
    const transaction = props.transaction
    const [likes, setLikes] = useState<number>(transaction.likes)
    const [liked, setLiked] = useState<boolean>(transaction.likedByUser)
    const [commentsLength, setCommentsLength] = useState<number>(transaction.comments.length)
    const [commentsDropdown, setCommentsDropdown] = useState<boolean>(false)
    const [comments, setComments] = useState<any>(transaction.comments)

    useEffect(() => {

    }, [likes, commentsLength, comments])

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

    function eraseText() {
        (document.getElementById("comment") as HTMLInputElement).value = ""
    }

    function addComment() {
        const commentValue = (document.getElementById("comment") as HTMLInputElement).value
        const addedComment = [...transaction.comments, {
            from: userFound,
            message: commentValue}]
        setComments([...comments, {
                from: userFound,
                message: commentValue}])
        getUserData(userFound)
            .then((data) => {
                updateTransactionSocials(data, transaction.id, transaction.likes, transaction.likedByUser, addedComment )
            })
        setCommentsLength(prev => prev + 1)
        eraseText()
    }

    const commentSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        addComment()
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
                        
                                {
                                    transaction.payRequest == "pay" ?
                                    <p className=''>
                                        <span className='font-semibold'>{transaction.from}</span> paid <span className='font-semibold'>{transaction.to} </span>
                                    </p>
                                    :
                                    <p className=''>
                                        <span className='font-semibold'>{transaction.from}</span> charged <span className='font-semibold'>{transaction.to} </span>
                                    </p>
                                }
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
                                <p className='ml-1 text-sm'>{commentsLength}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    commentsDropdown
                    ?
                    <div className='w-3/4 my-2'>
                        { comments ?
                            comments.map((transactionComment: any) => <Comment key={transactionComment} transactionComment={transactionComment} />)
                            :
                            <div></div>
                        }
                        <div className='mb-6'>
                            <textarea placeholder="Write something..." 
                                className='border-slate-400 w-full ml-26 rounded resize-none mb-2 text-black'
                                id='comment'
                            />
                            <div className='ml-28 w-full flex justify-end'>
                                <button
                                    className='cursor-pointer bg-blue-900 text-white px-4 py-1.5 rounded-full hover:bg-blue-700'
                                    onClick={commentSubmit}
                                >Submit</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='mb-2'></div>
                }
        </div>
    </div>
    )
}
