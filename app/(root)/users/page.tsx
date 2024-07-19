
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { fetchUser, fetchUsers } from '@/lib/actions/user.action';
import { User } from "@clerk/nextjs/dist/types/server";
import { currentUser } from '@clerk/nextjs';
import { ChevronRightIcon } from 'lucide-react';
import UserCard from '@/components/UserCard/UserCard';

const Users = async () => {

  //getting the current user
  const cuser: User | null = await currentUser();
  if (!cuser) {return;}
  //getting the mongo user data
  const userInfo = await fetchUser(cuser.id);
  
  //getting all the users
  const response: { users: any[]; isNext: boolean; } = await fetchUsers({userId:userInfo._id});

  return (
    <div className="grid-container ml-20">
      {response.users.map((user:any) =>
        (
          <UserCard userId={user._id} userBio={user.bio} userName={user.name} userImage={user.image} isPro={false} currentUserId={userInfo._id} currentUserIdforfetch={cuser.id} useridfordetch={user.id} />
        )
      )}
    </div>
  );

}

export default Users;