"use client"

import { Button } from "@/components/ui/button"
import { addFollower, fetchUser } from "@/lib/actions/user.action"
import { ChevronRightIcon } from "lucide-react"
import React from 'react'
import { useState, useEffect } from 'react'
import { ReloadIcon } from "@radix-ui/react-icons"
import Link from "next/link"

interface props {
    userId: string,
    currentUserId: string,
    userName: string,
    userBio: string,
    userImage: string,
    isPro: boolean | undefined
    currentUserIdforfetch: string,
    useridfordetch: string
}

const UserCard = ({userId, currentUserId, userName, userBio, isPro, userImage, currentUserIdforfetch, useridfordetch}: props) => {

    const followthisuser = async () => {
        await addFollower({ userIdForFollow: currentUserId, followerId: userId });
        checkIfFollowed();
    }

    //check if the current user folled the user which is being printed in the card.
    const [followedByCurrent, setFollowedByCurrent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    async function checkIfFollowed() {

        //get the mongo data for the current user
        const userInfo = await fetchUser(currentUserIdforfetch);
        
        for (let index = 0; index < userInfo.following.length; index++) {
            if(userInfo.following[index] == userId){
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
    <div className="card-container tsxt-black mb-10">
        
        {isPro ? (
            <span className="pro" style={{marginTop:'-42px', marginLeft:'74px'}}>PRO</span>
        ) : null}

        <Link href={`/profile/${useridfordetch}`}>
            <img className="round mb-2" style={{display:'inline-flex', height:'100px', width:'100px'}} src={userImage} alt="user" />
        </Link>

        <h3 className='mb-4' style={{fontWeight:'bolder', fontSize:'20px', color:'white'}}>{userName}</h3>
        <p className='mr-2 ml-2 mb-4' style={{color:'gray'}}>{userBio}</p>
        <div className="buttons mb-5">
          {isLoading ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </Button>
          ) : (
            <>
              {followedByCurrent ? (
                <Button disabled onClick={followthisuser} variant="outline" style={{ color: 'black' }}>
                  Followed
                </Button>
              ) : (
                <Button onClick={followthisuser} variant="outline" style={{ color: 'black' }}>
                  Follow
                </Button>
              )}

              <Button className='ml-5 h-6 w-6' variant="outline" size="icon" style={{ backgroundColor: 'transparent' }}>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
    </div>
  )
}

export default UserCard