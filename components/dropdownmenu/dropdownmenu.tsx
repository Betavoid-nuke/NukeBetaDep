"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { DialogCloseButton } from "../Dialog/dialog";
import { deleteThread, deleteProject } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  pageurl: string,
  postid: string,
  heading: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  currentuserid: string,
  authorid: string,
  isComment: boolean,
  isprojectbox: boolean,
  projectid: string
}


export function DropdownMenuDemo({projectid, pageurl, heading, option1, option2, option3, option4, postid, currentuserid, authorid, isComment, isprojectbox}: Props) {


  const pathname = usePathname();
  const router = useRouter();

  const openDialog = () => {

    const dialogTriggerButton = document.getElementById('db');
    if(dialogTriggerButton) {
      dialogTriggerButton.click();
    }

  };

  const deletePost = async () => {

    await deleteThread({
      text: "",
      author: "",
      communityId: "",
      path: pathname,
      postid: postid
    })

    if(!isComment){
      router.push("/")
    }

  }

  const deleteproject = async () => {

    await deleteProject({
      path: pathname,
      postid: projectid,
      text: "",
      author: "",
      communityId: ""
    })

  }

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Image
            src="/assets/options.svg"
            alt="options"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-dark-2 text-light-1 border-gray-800">

        <DropdownMenuLabel>{heading}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="bg-dark-2 text-light-1 border-gray-700">

          {currentuserid == authorid && (
            <DropdownMenuItem>
              {option1}
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={openDialog}>
            {option2}
          </DropdownMenuItem>

          {isprojectbox && (
            <DropdownMenuItem>
              {option3}
            </DropdownMenuItem>
          )}

          {isprojectbox && (
            <DropdownMenuItem>
              {option4}
            </DropdownMenuItem>
          )}

        </DropdownMenuGroup>

        {currentuserid == authorid && (
        <div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="bg-dark-2 text-light-1 border-gray-700">


          {isprojectbox && (
          <DropdownMenuSub>

            <DropdownMenuSubTrigger>Delete</DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-dark-2 text-light-1 border-gray-700">
                <DropdownMenuItem onClick={deletePost}>Delete</DropdownMenuItem>
                <DropdownMenuItem>Delete all comments</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>

          </DropdownMenuSub>
          )}

          {!isprojectbox && (
            <DropdownMenuItem onClick={deleteproject}>
              Delete
            </DropdownMenuItem>
          )}


          {isprojectbox && (
          <DropdownMenuItem disabled>
            Analytics
          </DropdownMenuItem>
          )}


        </DropdownMenuGroup>
        </div>
        )}
        


      </DropdownMenuContent>
    </DropdownMenu>
  )

}
