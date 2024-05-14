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

async function HomeHeader() {
  const result = await fetchProject(1, 30); //1 is the page number, and 30 is how many posts to display
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (

    <div className="flex transboxaddpost" style={{borderRadius:'10px', paddingTop:'10px'}}>

      <div className="text-light-2 mb-5" style={{ fontSize: 32 }}>
        Posts
      </div>

      <div style={{marginTop:'4px', marginLeft:'10px'}}>
        <Dialog>
        <DialogTrigger className="text-light-2">
          <Image
            src="/assets/addpro3.svg"
            alt="projectPoster"
            width={40}
            height={40}
          />
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
              <h1 className="head-text">Create Post</h1>
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
