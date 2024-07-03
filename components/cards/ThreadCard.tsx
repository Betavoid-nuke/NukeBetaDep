
import Image from "next/image";
import { deflate } from "zlib";
import Link from "next/link";
import { DropdownMenuDemo } from "../dropdownmenu/dropdownmenu";
import { DialogCloseButton } from "../Dialog/dialog";
import { AccordionDemo } from "../accord/accord";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import React from 'react';
import Comment from "../forms/Comment";

import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

import Likebtn from "../likebtn/likebtn";
import AverageColorDiv from "../ProfilePhotoColor/ProfilePhotoColorBar";
 

//MAIN THREAD CARD

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
      name: string;
      image: string;
      id: string;
      realid: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    comments: {
      author: {
        image: string;
      }
    }[]
    likedBy: {
      id: string;
    }[]
    isComment?: boolean;
    isInsideComment?: boolean;
    isInsideAccord?: boolean;
} //these interfaces are just to define what the props are that needs to be passed into the const below. then when we call it from the page.tsx in the root, we will pass these valuses.

async function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  isInsideComment,
  isInsideAccord,
  likedBy
}: Props) { 

  //gets current user
  const user = await currentUser();
  if(!user) return (null);

  //gets data of the current user
  const userInfo = await fetchUser(user.id);
  if(!userInfo.onboarded) return(null);

  //getting data of the person who made the post
  const owner = await fetchUser(author.id);
  if(!owner.onboarded) return(null);


  var TheUrl;
  if(parentId) {
    TheUrl = `/thread/${parentId}`
  } else {
    TheUrl = "/"
  }

  let likeBtnRendered = false;
  let printedlike = false;
  let postNotLikedBtThecurrentUser = true;

  //this makes the profile photo big for the main post block and normal for the post block of the comment
  let ProfilePhotoDivStyle = {
    marginLeft:'-50px', 
    marginTop:'-50px', 
    width:'4rem', 
    height:'4rem'
  };
  if(isComment){
    ProfilePhotoDivStyle = {
      marginLeft:'0px', 
      marginTop:'0px', 
      width:'2rem', 
      height:'2rem'
    };
  }

  return (
    <div>

      {!isComment && (
        <AverageColorDiv src={author.image} isCommentSection={isComment} />
      )}

      <article
        className={`flex w-full flex-col rounded-xl ${isComment ? "px-0 xs:px-7 mb-2" : "bg-dark-2 p-7 pb-2"} ${isInsideAccord ? "ml-5" : "ml-0"}`}
      >

        <div className="flex iteams-start justify-between">
        <div className="flex w-full flex-1 flex-row gap4">
          
          {isComment && (
            <div className="flex flex-col items-center mr-5">
              <Separator orientation="vertical" className="bg-dark-4" />
            </div>
          )}

          <div className="flex flex-col items-center">
            
            {isInsideComment && (
              <Link href={TheUrl} className="mb-5" style={{marginLeft:'60px', marginTop:'5px'}}>
                <Image
                  src="/assets/back.svg"
                  alt="back button"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </Link>
            )}

            <Link href={`/profile/${author.id}`} className="relative" style={ProfilePhotoDivStyle}>
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

          </div>

          <div id="PostCotrolBar" className="flex w-full flex-col ml-4">

            
            <div className="text-base-seminold text-light-1" style={{fontSize:'20px', display:'-webkit-inline-box', width:'100%'}}>
              <div style={{display:'flex', width:'100%'}}>
                
                <Link href={`/profile/${author.id}`}>
                  {author.name}
                </Link>

                {isComment && (
                  <AverageColorDiv src={author.image} isCommentSection={isComment} />
                )}

              </div>
            </div>
            

            <Link href={`/thread/${id}`}>
              <p className="mt-2 text-small-regular text-light-2">{content}</p>
            </Link>

            <div id="LikeBtn" className="flex gap-3.5 mt-4">

              {likedBy.map((user1) =>
                {
                  if (user1.valueOf() == userInfo?._id.valueOf()) {
                    postNotLikedBtThecurrentUser = false;
                    return (
                      <Likebtn
                        threadId={id}
                        userId={userInfo._id}
                        likedBy={user1}
                        owner={owner?._id.valueOf()}
                        liked={true}
                        howmanylikes={likedBy.length}
                      />
                    );
                  }
                })
              }
              {postNotLikedBtThecurrentUser && (
                <Likebtn howmanylikes={likedBy.length} liked={false} threadId={id} userId={userInfo._id} likedBy={{id:""}} owner={owner?._id.valueOf()}/>
              )}

              <Image
                src="/assets/repost.svg"
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />

              <DialogCloseButton
                pageurl={`http://localhost:3000/thread/${id}`}
              />

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`} className="text-color-jay-dark1">
                  Open
                </Link>
              )}

            </div>

            <div style={{marginBottom:'0px', marginTop:'2px'}} className="flex iteams-start justify-between">
              <AccordionDemo PostId={id} />
            </div>

          </div>

          {!isComment && (
            <div
              className="flex flex-col"
              style={{ justifyContent: "flex-start", alignItems: "flex-end" }}
            >
              <DropdownMenuDemo
                pageurl={`http://localhost:3000/thread/${id}`}
                postid={`${id}`}
                heading={"Post Controls"}
                option1={"Edit"}
                option2={"Share"}
                option3={"Repost"}
                option4={"Comment"}
                currentuserid={currentUserId}
                authorid={author.id}
                isComment={false}
                isprojectbox={true}
                projectid={""}
              />
            </div>
          )}

          {isComment && (
            <div
              className="flex flex-col"
              style={{ justifyContent: "flex-start", alignItems: "flex-end" }}
            >
              <DropdownMenuDemo
                pageurl={`http://localhost:3000/thread/${id}`}
                postid={`${id}`}
                heading={"Comment Controls"}
                option1={"Edit"}
                option2={"Share"}
                option3={"Repost as post"}
                option4={"Reply"}
                currentuserid={user.id}
                authorid={author.id}
                isComment={true}
                isprojectbox={true}
                projectid={""}
              />
            </div>
          )}

        </div>
        </div>

        {isComment && (
        <Comment
          threadId={id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
          isComment={true}
        />
        )}

      </article>

    </div>
  );

};

export default ThreadCard;