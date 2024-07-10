import { Bold, Italic } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { light } from "@mui/material/styles/createPalette";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { DropdownMenuDemo } from "../dropdownmenu/dropdownmenu";

interface Props {
  name: string;
  tags: string;
  bio: string;
  projectid: string;
  authorid: string;
  currentuser: string;
  isassembly: boolean | null;
  issubproject: boolean | null;
}

async function ProjectCards({
  name,
  tags,
  bio,
  projectid,
  authorid,
  currentuser,
  isassembly,
  issubproject,
}: Props) {

  return (
    <>
      {currentuser == authorid && (
        <div>

          <div
            className="flex flex-col"
            style={{ display:'flex', position:'absolute', marginTop:'40px', marginLeft:'250px' }}
          >
            <DropdownMenuDemo
              pageurl={`http://localhost:3000/`}
              postid={``}
              heading={"Project Controll"}
              option1={"Edit"}
              option2={"Share"}
              option3={"Repost"}
              option4={"Comment"}
              currentuserid={''}
              authorid={''}
              isComment={false}
              isprojectbox={false}
              projectid={projectid}
            />
          </div>

          <Link
            href={
              isassembly !== null
                ? isassembly
                  ? `/view-assembly/${projectid}`
                  : `/view-project-flow/${projectid}`
                : issubproject
                  ? `/view-project-flow/${projectid}`
                  : ""
            }
          >
            <div className="card flex-col">
              <div
                className="projectposter"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {!isassembly && !issubproject && (
                  <Image
                    src="/assets/projectPoster2.jpg"
                    alt="projectPoster"
                    width={1080}
                    height={100}
                    className="projectImg"
                  />
                )}

                {!isassembly && issubproject && (
                  <Image
                    src="/assets/subpro.jpg"
                    alt="projectPoster"
                    width={1080}
                    height={100}
                    className="projectImg"
                  />
                )}

                {isassembly && (
                  <Image
                    src="/assets/assemposter3.jpg"
                    alt="projectPoster"
                    width={1080}
                    height={100}
                    className="projectImg"
                  />
                )}
              </div>

              <div className="flex-col mb-5 ml-5 mr-5">
                <div className="mt-5 projectInfo">
                  <div
                    className="text-light-1"
                    style={{ fontWeight: "Bold", fontSize: 22 }}
                  >
                    {name}
                  </div>

                  <div className="text-light-3" style={{ fontStyle: "Italic" }}>
                    {tags}
                  </div>

                  <Separator className="mt-2 mb-2 bg-light-4" />

                  <ScrollArea
                    className="text-light-1 h-20 w-full"
                    style={{ overflowWrap: "anywhere", overflowY: "auto" }}
                  >
                    <div className="mr-4">{bio}</div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </Link>

        </div>
      )}
    </>
  );
}

export default ProjectCards;
