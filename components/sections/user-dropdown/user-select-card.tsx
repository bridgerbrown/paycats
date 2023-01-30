import React from "react";
import Image from "next/image";

export default function UserSelectCard({user, userSelect, selectUser, recipientImagePreview}: any){
    const selectedStyle = "cursor-pointer bg-slate-300 flex items-center border-b py-4 px-4 border-slate-300 bg-white"
    const unselectedStyle = "cursor-pointer hover:bg-slate-100 flex items-center border-b py-4 px-4 border-slate-300 bg-white"
    
    return(
        <div className={userSelect === user.id ? selectedStyle : unselectedStyle}
            onClick={() => {
                selectUser(user.id)
                recipientImagePreview(user.img)
            }}
        >
            <Image 
                src={`/${user.img}`}
                width={498}
                height={500}
                alt="Cat headshot number one"
                className='object-cover w-16 h-16 rounded-full border border-slate-400 mr-4'
            />
            <h2>{user.name}</h2>
        </div>
    )
}