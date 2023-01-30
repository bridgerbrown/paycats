import { catUsers } from "@/components/data/catUsers";
import React, {useState} from "react";
import UserSelectCard from "./user-select-card";

export default function UserSelectDropdown({recipientImagePreview}: any) {
    const [userSelect, setUserSelect] = useState<number>(0)

    function selectUser(selected: number) {
        setUserSelect(selected)
        console.log(userSelect)
    }
    return(
        <div className="border-y-2 border-slate-300 relative top-0 font-Hind bg-white z-10 bg-white">
            { catUsers.map((user: any) => 
                <UserSelectCard key={user.id} user={user} selectUser={selectUser} userSelect={userSelect}
                recipientImagePreview={recipientImagePreview}
                /> 
            )}
        </div>
    )
}