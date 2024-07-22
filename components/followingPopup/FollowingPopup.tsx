

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/constants/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar } from "@mui/material";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link"
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { useEffect, useState } from "react";


type ObjectId = { toString: () => string };

interface props {
    userImage: string,
    following: ObjectId[],
    cuserid: string
}

export async function FollowingPopover({userImage,following,cuserid}:props) {


    const Icon = Icons['arrowRight'];

    //getting the mongo user data
    const userInfo = await fetchUser(cuserid);
    
    //getting all the users
    const response: { users: any[]; isNext: boolean; } = await fetchUsers({userId:userInfo._id});
    var FollowersInfo = []
    for (let i = 0; i < following.length; i++) {
        for (let o = 0; o < response.users.length; o++) {
            if (following[i].toString() === response.users[o]._id.toString()) {
                FollowersInfo.push(response.users[o])
            }
        }
    }


    return (
      <Dialog>

        <DialogTrigger asChild>
              <div className="hoverEffect_scale" style={{marginLeft:'190px', marginTop:'16px', marginBottom:'-36px'}}>
                  <Icon className={` ml-3 size-5`} color="#8f8f8f" />
              </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]" style={{backgroundColor:'#09090b', borderColor:'#1f1f1f', border:'solid', borderWidth:'1px'}}>

            <DialogHeader>
              <DialogTitle className="text-light-1">Following</DialogTitle>
            </DialogHeader>

            {FollowersInfo?.map((follower) => (
                <div className="flex items-center gap-4 mb-4 mt-2">

                    <Link href={`/profile/${follower.id}`}>
                      <img className="round mb-2" style={{display:'inline-flex', height:'40px', width:'40px', borderRadius:'30px'}} src={follower.image} alt="user" />
                    </Link>

                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none text-light-1">
                        {follower.name}
                      </p>
                      <p className="text-sm text-muted-foreground text-light-1">
                        @{follower.username}
                      </p>
                    </div>

                </div>
            ))}

        </DialogContent>

      </Dialog>
    )
}