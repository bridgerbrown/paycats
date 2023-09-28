import { catUsers } from "@/data/catUsers";
import React, {useState} from "react";
import UserSelectCard from "@/components/user-dropdown/UserSelectCard";

export default function UserSelectDropdown({recipientImagePreview}: any) {
    const [userSelect, setUserSelect] = useState<number | null>(null);

    function selectUser(selected: number) {
        setUserSelect(selected)
    };
    return(
        <div className="border-y-2 border-slate-300 relative top-0 font-Hind bg-white z-10"
            data-testid="user-select-dropdown"
        >
            { catUsers.map((user: any) => 
                <UserSelectCard key={user.id} user={user} selectUser={selectUser} userSelect={userSelect}
                recipientImagePreview={recipientImagePreview}
                /> 
            )}
        </div>
    )
}
