"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

import { updateUser } from "@/lib/actions/user.action";
import { createAssemblies, createProject } from "@/lib/actions/projectactions";
import { ProjectValidation } from "@/lib/validations/project";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
  parent: string
}

const NewAssembly= ({ user, btnTitle, parent }: Props) => {

  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof ProjectValidation>>({
    resolver: zodResolver(ProjectValidation),
    defaultValues: {
      name: "New Project",
      tags: "New Empty",
      bio: "This is a new project with no title and description, please edit the project and rename it!",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProjectValidation>) => {

    await createAssemblies({
      text: values.name,
      tags: values.tags,
      bio: values.bio,
      path: pathname,
      author: user.objectId,
      parent: parent
    })

    const closepopbtn = document.getElementById('closeCreateNewPopup');
    closepopbtn?.click();

    if(!parent){
      router.push("/assemblies");
    }
  
  };

  return (
    <Form {...form}>

      <form
        className="flex flex-col justify-start gap-10 bg-none"
        onSubmit={form.handleSubmit(onSubmit)}
      >

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl>
                <Input type="text" className="account-form_input no-focus" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Tags
              </FormLabel>
              <FormControl>
                <Input type="text" className="account-form_input no-focus" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea rows={5} className="account-form_input no-focus" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex col" style={{justifyContent:"center"}}>
          <Button type="submit" variant="secondary" style={{width:200, justifyContent:"center"}} className="flex bg-primary-500 mb-8 text-light-1">
            {btnTitle}
          </Button>
        </div>  

      </form>

    </Form>
  );

};

export default NewAssembly;
