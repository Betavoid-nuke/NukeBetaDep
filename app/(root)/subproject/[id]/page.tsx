import React from "react";
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


const page = () => {

  return (
    <div style={{ display: "contents" }}>

      <div className="flex row" style={{ justifyContent: "space-between" }}>

        <div className="flex-col">

          <div
            className="mb-2 flex row"
            style={{ fontSize: 32, color: "#cfcfcf" }}
          >
            <Goingbackbtn 
              white={true} 
            />
            Sub Project
          </div>

          <div className="mb-5 mt-0" style={{ fontSize: 16, color: "#b4b4b4" }}>
            Sub Project Bio
          </div>

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
                <h1 className="head-text">Create new Assembly</h1>
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
                  Create a new asssembly and get started!
                </p>

                <section
                  className="transboxpopup mt-9 bg-dark-2 p-10 mb-4"
                  style={{ borderRadius: 20 }}
                >




                {/* form */}




                </section>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>

      <Separator className="mt-2 mb-2 bg-light-4" />

    </div>
  );
};

export default page;
