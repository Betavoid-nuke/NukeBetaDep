import React from "react";
import NewAssembly from "@/components/forms/NewAssembly";
import ProjectCards from "@/components/projectCards/ProjectCards";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  fetchAssemblies,
  fetchAssemblyById,
  fetchProject,
} from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import NewProject from "@/components/forms/NewProject";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Goingbackbtn from "@/components/GoBack/Goingbackbtn";
import { boolean } from "zod";

const Page = async ({ params }: { params: { id: string } }) => {

  
  const result = await fetchProject(1, 3000);
  const resultassemblies = await fetchAssemblies(1, 3000);
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
  const assembly = await fetchAssemblyById(params.id);



  //checking if there are any projects in this assembly
  var isempty_projects = true;
  for (let index = 0; index < result.projects.length; index++) {
    const parentid = result.projects[index].parent
    if(parentid){
      if(parentid.valueOf() == params.id){
        isempty_projects = false
      }
    }
  }



  //checking if there are any sub assembl in this assembly
  var isempty_assemblies = true;
  for (let index = 0; index < resultassemblies.Assembly.length; index++) {
    const parentid = resultassemblies.Assembly[index].parent
    if(parentid){
      if(parentid.valueOf() == params.id){
        isempty_assemblies = false
      }
    }
  }
  
  
  
  return (
    <div style={{ display: "contents" }}>
      
      {/* Main Header */}
      <div className="flex row" style={{ justifyContent: "space-between" }}>
        <div className="flex-col">
          <div
            className="mb-2 flex row"
            style={{ fontSize: 32, color: "#cfcfcf" }}
          >
            <Goingbackbtn white={true} />
            {assembly.text}
          </div>
          <div className="mb-5 mt-0" style={{ fontSize: 16, color: "#b4b4b4" }}>
            {assembly.bio}
          </div>
        </div>

        <div className="flex row">
          <div className="flex-col mr-5">
            {/* New Project */}
            <Dialog>
              <DialogTrigger
                className="text-light-2"
                style={{
                  display: "flex",
                  alignContent: "center",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/assets/addpro3.svg"
                  alt="projectPoster"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                New Project
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
                    <h1 className="head-text">Create new project</h1>
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
                        isassemblychild={true}
                        parentid={params.id}
                      />
                    </section>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex-col">
            {/* New Sub-Assembly */}
            <Dialog>
              <DialogTrigger
                className="text-light-2"
                style={{
                  display: "flex",
                  alignContent: "center",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/assets/addpro3.svg"
                  alt="projectPoster"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                New Sub-Assembly
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
                    <h1 className="head-text">Create new Sub Assembly</h1>
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
                      Create a new sub-asssembly and get started!
                    </p>

                    <section
                      className="transboxpopup mt-9 bg-dark-2 p-10 mb-4"
                      style={{ borderRadius: 20 }}
                    >
                      <NewAssembly parent={params.id} user={userData} btnTitle={"Continue"} />
                    </section>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Separator className="mt-2 mb-2 bg-light-4" />
      
      {/* Projects ------------- Section*/}
      <div className="maincont" style={{ display: "contents" }}>
        
          {isempty_projects ? (

            <div className="flex-col col mt-10" style={{width:'100%', display:'flex', justifyContent:'center', flexWrap:'wrap', alignContent:'center', alignItems:'center'}}>
              <div className="mt-2 ml-5 mb-5" style={{color:'#3d4257', fontSize:'22px'}}>Nothing here, create a new Project</div>
              {/* New Project */}
              <Dialog>
              <DialogTrigger
                className="text-light-2"
                style={{
                  display: "flex",
                  alignContent: "center",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/assets/add.svg"
                  alt="projectPoster"
                  width={80}
                  height={80}
                  className="mr-2"
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
                    <h1 className="head-text">Create new project</h1>
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
                        isassemblychild={true}
                        parentid={params.id}
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
                post.parent == params.id ? (
                  <ProjectCards
                    isassembly={null}
                    name={post.text}
                    tags={post.tags}
                    bio={post.bio}
                    projectid={post?._id}
                    currentuser={userData.objectId}
                    authorid={post.author?._id.valueOf()}
                    issubproject={true}
                  />
                ) : null
              )}
            </div>

          )}
      </div>      
      
      {/* Sub-Assemblies header */}
      <div className="flex row mt-10" style={{ justifyContent: "space-between" }}>
        <div className="flex-col">
          <div
            className="mb-2 flex row"
            style={{ fontSize: 26, color: "#cfcfcf" }}
          >
            Sub-Assemblies
          </div>
        </div>
      </div>
      <Separator className="mt-2 mb-2 bg-light-4" />
      
      {/* Sub-assembly ------------- Section */}
      <div className="maincont" style={{display:"contents"}}>
        

          
          {isempty_assemblies ? (

            <div className="flex-col col mt-10" style={{width:'100%', display:'flex', justifyContent:'center', flexWrap:'wrap', alignContent:'center', alignItems:'center'}}>
              <div className="mt-2 ml-5 mb-5" style={{color:'#3d4257', fontSize:'22px'}}>Nothing here, create a new Sub-Assembly</div>
              {/* New Project */}
              <Dialog>
                <DialogTrigger
                className="text-light-2"
  style={{
    display: "flex",
    alignContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
                }}
>               
                <Image
                  src="/assets/add.svg"
                  alt="projectPoster"
                  width={80}
                  height={80}
                  className="mr-2"
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
                      <h1 className="head-text">Create new project</h1>
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
                          isassemblychild={true}
                          parentid={params.id}
                        />
                      </section>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

          ) : (

            <div className="grid-container">
              {resultassemblies.Assembly.map((post) => (                

                post.parent == params.id && (
                  <ProjectCards issubproject={false} isassembly={true} name={post.text} tags={post.tags} bio={post.bio} projectid={post?._id} currentuser={userData.objectId} authorid={post.author?._id.valueOf()}/>
                )

              ))}
            </div>

          )}
      </div>
      
      <div className="text-light-1" style={{ position: 'fixed', bottom: '0', right: '0', padding:"50px" }}>
        <Link href={`/view-assembly-map/${params.id}`}>
          <Button variant="outline" className="AssemblyBtn">Assembly Map</Button>
        </Link>
      </div>
      
    </div>
  );


  
};

export default Page;
