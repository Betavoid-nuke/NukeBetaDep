
import ProjectCards from "@/components/projectCards/ProjectCards";
import { Separator } from "@/components/ui/separator";
import { fetchProject } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
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

interface Props {
  authorid: string;
}

async function newproject({ authorid }: Props) {

  const result = await fetchProject(1, 30);
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  const userData = {
    id: user.id,
    objectId: userInfo?._id.valueOf(),
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  const hasparent = [];
  const usersprojects=[];
  var printempty = true;
  for (let index = 0; index < result.projects.length; index++) {
    // getting all projects owned by the current user
    if(result.projects[index].author.id == user.id) {
      usersprojects.push(result.projects[index]);
      //if the project have parent they also go into this new array
      if(result.projects[index].parent){
        hasparent.push(1);
      }
    }
  }
  if(hasparent.length !== usersprojects.length){
    printempty = false
  }
  
  
  return (
    <div style={{ display: "contents" }}>

      <div className="flex row" style={{ justifyContent: "space-between" }}>
        <div className="text-light-2 mb-5" style={{ fontSize: 32 }}>
          Projects
        </div>

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
                <h1 className="head-text">Create new Project</h1>
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
                <p className="mt-3 text-base-regular text-light-2">
                  Create a new project and get started!
                </p>

                <section
                  className="transboxpopup mt-9 bg-dark-2 p-10 mb-4"
                  style={{ borderRadius: 20 }}
                >
                  <NewProject
                    user={userData}
                    btnTitle={"Continue"}
                    isassemblychild={false}
                    parentid={""}
                  />
                </section>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>

      <Separator className="mt-2 mb-2 bg-light-4" />

      <div className="maincont" style={{ display: "contents" }}>

        {printempty ? (

          <div
            className="flex-col col"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              alignContent: "center",
              alignItems: "center",
              marginTop: "200px",
            }}
          >
            <div
              className="mt-2 ml-5 mb-5"
              style={{ color: "#3d4257", fontSize: "22px" }}
            >
              Nothing here, create a new Project
            </div>
            {/* New Project */}
            <Dialog>
              <DialogTrigger className="text-light-2">
                <Image
                  src="/assets/add.svg"
                  alt="projectPoster"
                  width={80}
                  height={80}
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
                    <h1 className="head-text">Create new Project</h1>
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
                    <p className="mt-3 text-base-regular text-light-2">
                      Create a new project and get started!
                    </p>

                    <section
                      className="transboxpopup mt-9 bg-dark-2 p-10 mb-4"
                      style={{ borderRadius: 20 }}
                    >
                      <NewProject
                        user={userData}
                        btnTitle={"Continue"}
                        isassemblychild={false}
                        parentid={""}
                      />
                    </section>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

        ) : (
          <div className="grid-container">
            {result.projects.map((post) =>
              post.parent ? null : (
                <ProjectCards
                  issubproject={false}
                  isassembly={false}
                  name={post.text}
                  tags={post.tags}
                  bio={post.bio}
                  projectid={post?._id}
                  currentuser={userData.objectId}
                  authorid={post.author?._id.valueOf()}
                />
              )
            )}
          </div>
        )}

      </div>

    </div>
  );
}

export default newproject;
