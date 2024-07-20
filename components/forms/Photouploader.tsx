"use client"

import { uploadFiles, useUploadThing } from '@/lib/uploadthing';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPoster } from "@/lib/validations/user";
import * as z from "zod";
import { updateUser, uploadPoster } from '@/lib/actions/user.action';
import { isBase64Image } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Spinner from '../ui/Spinner';
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "../../app/api/uploadthing/core";



import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Settings,
  Settings2,
  Share,
  Triangle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

 
interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
}

function PhotoUploadButton({ user }: Props) {

  const form = useForm<z.infer<typeof UserPoster>>({
    resolver: zodResolver(UserPoster),
    defaultValues: {
      Profile_Poster: user?.image ? user.image : ""
    },
  });

  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<string>('');

  const updateuser = async () => {
    await uploadPoster({
      userId: user.id,
      posterimage: files
    });
  };

  useEffect(() => {
    if (files) {

      // Call updateuser when files is updated
      const timer = setTimeout(() => {
        updateuser();
      }, 8000);

      // Clean up timer on component unmount
      return () => clearTimeout(timer);

    }
  }, [files]);

  return (
    <>
      <fieldset className="grid gap-6 rounded-lg border p-4" style={{width:'500px', borderColor:'#383838'}}>

        <legend className="-ml-1 px-1 text-sm font-medium text-light-1">
          Upload Poster
        </legend>

        <UploadDropzone<OurFileRouter>
          endpoint="media"
        onClientUploadComplete={(res) => {
          if (res) {
            res.forEach((file) => {
              console.log("File URL:" + file.url);
              setFiles(file.url);
            });
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name);
          }}
        />

      </fieldset>
    </>
  );

};

export default PhotoUploadButton;
