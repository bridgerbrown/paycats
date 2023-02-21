import React, { useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/components/context/AuthContext";
import { catUsers } from "@/components/data/catUsers";

export default function Comment(props: any){
    const { userFound, userImage } = useAuth()
    const comment = props.transactionComment

    const getCommentImage = (fromUser: string) => {
        if(fromUser === userFound) {
            return `cat-profile-${userImage}.jpg`
        } else {
            const findFromUser = catUsers.find((item) => item.name === fromUser)
            return findFromUser?.img
        }
    }

    const username = userFound ? userFound.substring(0, userFound.lastIndexOf("@")) : ""

    return (
        <div className='flex items-center w-full xs:ml-20 sm:ml-26 mb-6 text-black border-t pt-4'>
            <Image 
                src={`/${getCommentImage(comment.from)}`}
                width={498}
                height={500}
                alt={`comment sender, ${comment.from}`}
                className='mr-2 object-cover w-12 h-12 rounded-full border border-slate-400'
            />
            <div className="">
                <p className="font-semibold">{comment.from === userFound ? username : comment.from}</p>
                <p className="">{comment.message}</p>
            </div>
        </div>
    )
} 