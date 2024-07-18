
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { fetchUsers } from '@/lib/actions/user.action';
import { User } from '@/constants/newIndex';
import { currentUser } from '@clerk/nextjs';
import { ChevronRightIcon } from 'lucide-react';

const Users = async () => {

  const cuser = await currentUser();

  // Simulating an async function, e.g., an API call
  const response: { users: any[]; isNext: boolean; } = await fetchUsers({userId:cuser?.id});

  return (
    <div className="grid-container ml-20">
      {response.users.map((user:any) =>
        (
          <div className="card-container tsxt-black mb-10">
            <span className="pro" style={{marginTop:'-42px', marginLeft:'74px'}}>PRO</span>
            <img className="round mb-2" style={{display:'inline-flex', height:'100px', width:'100px'}} src={user.image} alt="user" />
            <h3 className='mb-4' style={{fontWeight:'bolder', fontSize:'20px', color:'white'}}>{user.name}</h3>
            <p className='mr-2 ml-2 mb-4' style={{color:'gray'}}>{user.bio}</p>
            <div className="buttons mb-5">
              <Button variant="outline" style={{color:'black'}}>
                Follow
              </Button>
              <Button className='ml-5 h-6 w-6' variant="outline" size="icon" style={{backgroundColor:'transparent'}}>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );

}

export default Users;
