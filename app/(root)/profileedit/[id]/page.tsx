import PhotoUploadButton from '@/components/forms/Photouploader';
import Goingbackbtn from '@/components/GoBack/Goingbackbtn';
import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from "next/navigation";
import React from 'react'
import { Button } from "@/components/ui/button";

async function ProfileEdit({ params }: { params: { id: string } }) {

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(params.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const userData = {
      id: user.id,
      objectId: userInfo?._id,
      username: userInfo ? userInfo?.username : user.username,
      name: userInfo ? userInfo?.name : user.firstName ?? "",
      bio: userInfo ? userInfo?.bio : "",
      image: userInfo ? userInfo?.image : user.imageUrl,
    };

    return (
      <div>
        <div className='flex flex-row gap-2 mb-10' style={{display:'flex', alignItems:'center'}}>
            <Goingbackbtn white={true} />
            <div className='text-light-1' style={{fontSize:'26px'}}>Edit Profile</div>
        </div>
        <PhotoUploadButton user={userData} />
      </div>
    )
}

export default ProfileEdit