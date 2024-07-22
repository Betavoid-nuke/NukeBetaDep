"use client"

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { addFollower, fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { useEffect, useState } from "react";
import { currentUser, UserProfile } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
  userid:string;
  userIdForFollow:string
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  userid,
  userIdForFollow
}: Props) {

  const followthisuser = async () => {
    const userofprofile = await fetchUser(userid);
    await addFollower({ userIdForFollow: userIdForFollow, followerId: userofprofile._id });
    checkIfFollowed();
  }

  //check if the current user folled the user which is being printed in the card.
  const [followedByCurrent, setFollowedByCurrent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function checkIfFollowed() {

    //get the mongo data for the current user
    const userInfo = await fetchUser(authUserId);

    //getting all the users
    const response: { users: any[]; isNext: boolean; } = await fetchUsers({userId:userIdForFollow});

    //getting the mongo user data of the profile we are viewing
    const userofprofile = await fetchUser(userid);

    for (let index = 0; index < userInfo.following.length; index++) {

      if(userInfo.following[index] == userofprofile?._id){
        setFollowedByCurrent(true)
      } else {
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    checkIfFollowed();
  }, []);

  return (

    <div className="profileHeader">
      <div className="transbox">

        <div className="flex w-full flex-col justify-start">

          <div className="flex items-center justify-between">

            <div className="flex mt-3 items-center gap-3">
              <div className="relative h-20 w-20 object-cover">
                <Image
                  src={imgUrl}
                  alt="logo"
                  fill
                  className="rounded-full object-cover shadow-2xl"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-left text-heading3-bold text-light-1">
                  {name}
                </h2>
                <p className="text-base-medium text-gray-1">@{username}</p>
              </div>
            </div>

            {accountId === authUserId && type !== "Community" && (
              <Link href={`/profileedit/${userid}`}>
                <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
                  <Image
                    src="/assets/edit.svg"
                    alt="edit"
                    width={16}
                    height={16}
                  />

                  <p className="text-light-2 max-sm:hidden">Edit</p>
                </div>
              </Link>
            )}

            {accountId !== authUserId && (
              <div className="flex cursor-pointer gap-3 rounded-lg px-4 py-2">
                
                {followedByCurrent ? (
                  <Button disabled onClick={followthisuser} variant="outline" style={{ color: 'black' }}>
                    Followed
                  </Button>
                ) : (
                  <Button onClick={followthisuser} variant="outline" style={{ color: 'black' }}>
                    Follow
                  </Button>
                )}
                
                <Button style={{backgroundColor:'black', fontSize:'18px'}}>Message</Button>
              </div>
            )}



          </div>

          <p className="mt-8 mb-3 max-w-lg text-base-regular text-light-2">{bio}</p>

        </div>

      </div>
    </div>

  );

}

export default ProfileHeader;
