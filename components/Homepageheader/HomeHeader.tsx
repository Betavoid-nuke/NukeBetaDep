
import React from "react";
import ProjectCards from "@/components/projectCards/ProjectCards";
import { Separator } from "@/components/ui/separator";
import { fetchProject } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import NewProject from "@/components/forms/NewProject";
import { fetchUser } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";
import PostThread from "../forms/postThread";
import { redirect } from "next/navigation";
import { User } from "@clerk/nextjs/dist/types/server";
import mongoose from "mongoose";


interface UserInfo {
  _id: string,
  id: string,
  username: string,
  name: string,
  image: string,
  bio: string,
  threads: [],
  onboarded: {
    type: Boolean
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId
    },
  ],
}

interface props {
  userInfo: UserInfo
}

function HomeHeader({userInfo}:props) {

  if (!userInfo) {
    return null;
  }
  
  return (

    <div className="flex" style={{borderRadius:'10px', display:'flex', alignContent:'center', justifyContent:'center', flexWrap:'wrap', flexDirection:'row'}}>

      <div style={{marginTop:'4px', marginLeft:'10px'}}>
        <Dialog>

          <DialogTrigger className="text-light-2">

            <div className="flex flex-row" style={{flexWrap:'wrap', justifyContent:'center', alignContent:'center'}}>
              <div className="text-light-2 mr-3" style={{ fontSize: 18, alignItems:'center' }}>
                Create Post
              </div>

              <Image
                src="/assets/addpro3.svg"
                alt="projectPoster"
                width={30}
                height={30}
              />
            </div>

          </DialogTrigger>

          <DialogContent
          className="transboxpopup"
          style={{
            backgroundColor: "black",
            borderColor: "#333333",
            borderRadius: 29,
          }}
        >
          <DialogHeader>
            <div
              className="flex row"
              style={{ justifyContent: "space-between" }}
            >
              <h1 className="head-text">Create a Post</h1>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button
                    id="closeCreateNewPopup"
                    className="text-light-1"
                    type="button"
                    variant="secondary"
                    style={{ backgroundColor: "#00000000" }}
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>

            <DialogDescription className="text-light-2">
              <section
                className="transboxpopup mt-9 bg-dark-2 p-10 mb-4"
                style={{ borderRadius: 20 }}
              >
                <PostThread userId={userInfo._id} />
              </section>

            </DialogDescription>
          </DialogHeader>
          
          </DialogContent>

        </Dialog>
      </div>

    </div>

  );

}

export default HomeHeader;
