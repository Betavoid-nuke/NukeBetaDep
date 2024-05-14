"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
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

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import Community from "@/lib/models/community.model";
import { ToastSimple } from "../popups/notification";
//import { updateUser } from "@/lib/actions/user.action";
 
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
}

function PostThread({ userId }: { userId: string }) {

    const router = useRouter();
    const pathname = usePathname();
  
    const form = useForm({
      resolver: zodResolver(ThreadValidation),
      defaultValues: {
        thread: '',
        accountId: userId,
      },
    });

    //when the form is submitted, react stores the "values" for us and then we can access them by ppass "values: z.infer<typeof ThreadValidation>"
    //Thread validation is just set of conditions like it hould not be empty, it should have min and max size, etc. once these conditions are setisfied, the form gets validated and then we get to use the "values"
    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        
      //this is the function which will create the thread in db and put its id in the user model in db
      await createThread({
          text: values.thread,
          author: userId,
          communityId: null,
          path: pathname,
          postid: ""
      })

      const closepopbtn = document.getElementById('closeCreateNewPopup');
      closepopbtn?.click();

      router.push("/")

    }

    return (
        <Form {...form}>
            <form
            className='flex flex-col justify-start gap-10'
            onSubmit={form.handleSubmit(onSubmit)}
            >
                <h1 className="text-light-1">Create a Post</h1>

                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                    <FormItem className='flex w-full flex-col gap-3'>

                        <FormLabel className='text-base-semibold text-light-2'>
                            Content:
                        </FormLabel>

                        <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                            <Textarea
                            rows={15}
                            className='account-form_input no-focus'
                            {...field}
                            />
                        </FormControl>

                        <FormMessage />

                    </FormItem>
                    )}
                />

                <ToastSimple Message={"Successfully uploaded your post!"}/>

            </form>
            
        </Form>
    )
    

}

export default PostThread