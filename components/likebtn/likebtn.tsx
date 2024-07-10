"use client"

import { likeThread, unlikeThread } from '@/lib/actions/thread.actions'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Badge } from "@/components/ui/badge"


interface Props {
  threadId: string,
  userId: string,
  likedBy: {
    id: string;
  }
  owner : string
  liked: boolean
  howmanylikes: number
}

const Likebtn = ({threadId, userId, likedBy, owner, liked, howmanylikes}: Props) => {

  let likedthepost = false;
  function likeunlike(){

    //unlike the post
    if(!likedthepost){

      const likedHeart = document.getElementById(`likedheart${threadId}`) as HTMLImageElement | null;
      const likecount = document.getElementById(`likecount${threadId}`) as HTMLImageElement;
      
      if(likedHeart){
        likedHeart.src = '/assets/heart-gray.svg';
        if(howmanylikes > 0){
          howmanylikes = howmanylikes - 1;
          likecount.innerHTML = howmanylikes.toString();
        }
        likedthepost = false;
      }

      liked = false;

    }

    //like the post
    if(likedthepost){

      const likedHeart = document.getElementById(`likedheart${threadId}`) as HTMLImageElement | null;
      const likecount = document.getElementById(`likecount${threadId}`) as HTMLImageElement;
      
      if(likedHeart){
        likedHeart.src = '/assets/heart-filled.svg';
        howmanylikes = howmanylikes + 1;
        likecount.innerHTML = howmanylikes.toString();
        likedthepost = true;
      }

      liked = true;

    }

  }

  const hendlelike = async () => {

    if(liked){

      likedthepost = false;
      await unlikeThread(threadId,userId)

    } else if(!liked) {

      likedthepost = true;
      if (likedBy.valueOf() == owner) {
      } else {
        await likeThread(threadId,userId)
      }

    }
    
    likeunlike();

  }

  return (

    <div>

      {liked && (
        <div onClick={hendlelike} className="flex w-full flex-row">
          <Image
            src="/assets/heart-filled.svg"
            alt="heart"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
            id={`likedheart${threadId}`}
          />
          <Badge id={`likecount${threadId}`} className='text-light-4 postbadge1' variant="outline">{howmanylikes}</Badge>
        </div>
      )}

      {!liked && (
        <div onClick={hendlelike} className="flex w-full flex-row">
          <Image
            src="/assets/heart-gray.svg"
            alt="heart"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
            id={`likedheart${threadId}`}
          />
          <Badge id={`likecount${threadId}`} className='text-light-4 postbadge1' variant="outline">{howmanylikes}</Badge>
        </div>
      )}

    </div>

  );

}

export default Likebtn