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

import { CommentValidation } from "@/lib/validations/thread";
//import { createThread } from "@/lib/actions/thread.actions";
import Community from "@/lib/models/community.model";
import { Separator } from "@/components/ui/separator"
import { addCommentToThread } from "@/lib/actions/thread.actions";




interface Props {
    threadId: string,
    currentUserImg: string,
    currentUserId: string,
    isComment: boolean
}


const Comment = ({threadId, currentUserImg, currentUserId, isComment}: Props) => {
    
    const router = useRouter();
    const pathname = usePathname();
  
    const form = useForm({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
        thread: '',
      },
    });

    //when the form is submitted, react stores the "values" for us and then we can access them by ppass "values: z.infer<typeof ThreadValidation>"
    //Thread validation is just set of conditions like it hould not be empty, it should have min and max size, etc. once these conditions are setisfied, the form gets validated and then we get to use the "values"
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {

      //this is the function which will create the thread in db and put its id in the user model in db
      await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)
      window.scrollTo(0, document.body.scrollHeight);
      form.reset();

    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="comment-form border-none"
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">

                <FormLabel>
                {!isComment && (
                  <Image
                    src={currentUserImg}
                    alt="profile image"
                    width="48"
                    height="48"
                    className="rounded-full object-cover"
                  />
                )}
                </FormLabel>

                <FormControl className="inputComment-1">
                  <Input
                    type="text"
                    placeholder="Comment..."
                    className="no-focus text-light-1 commentTextCollor outline-none"
                    {...field}
                  />
                </FormControl>

              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={`${isComment ? "text-color-jay-btn-1" : "comment-form_btn"}`}
          >
            Reply
          </Button>

        </form>
      </Form>
    );

}


export default Comment
