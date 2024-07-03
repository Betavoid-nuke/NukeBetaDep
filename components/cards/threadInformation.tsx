import React from 'react'
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

interface props {
    authorID: {
        name: string;
        image: string;
        id: string;
        realid: string;
    };
}

async function threadInformation({authorID}:props) {
    
    const infor = '';
    
    //gets current user
    const user = await currentUser();
    if(!user) return (null);

    //gets data of the current user
    const userInfo = await fetchUser(user.id);
    if(!userInfo.onboarded) return(null);

    //getting data of the person who made the post
    const owner = await fetchUser(authorID.id);
    if(!owner.onboarded) return(null);

    return infor
}

export default threadInformation