import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { fetchPost } from "@/lib/actions/thread.actions";
import ThreadCard from "../cards/ThreadCard";
import { Separator } from "@/components/ui/separator"
import { currentUser } from "@clerk/nextjs";

interface Props {
    PostId: string
}

export async function AccordionDemo({PostId}: Props) {

  const result = await fetchPost(1, 30);
  const user = await currentUser();

  //to check if there are any comments, if there are not then we dont print the accord
  var hasAnyComments = false;

  {result.posts.map((post) => {   

    if (post.parentId === PostId.toString()) {
        hasAnyComments = true;
    }

  })}

  if(!hasAnyComments){
    return (
        <p className="text-color-jay-dark2">0 Comments</p>
    )
  }
  
  //if there are comments, then we print the accord
  // if (post.parentId === PostId.toString()) {      - this only prints the cards that has parent id same as the parent id of the acoord which we call "PostID" set form the threadCard itself when we print the accord, so all accord have that id using which we can filter and print the coments properly
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="text-light-1 border-none">
        <AccordionTrigger>
          <div className="text-small-regular text-color-jay-dark1">Replies</div>
        </AccordionTrigger>

        <AccordionContent className="text-light-1">
            
            <>
              
              {result.posts.map((post) => {     
                           
                if (post.parentId === PostId.toString()) {
                    
                  return (

                      <ThreadCard
                        key={post._id}
                        id={post._id}
                        currentUserId={user?.id || ""}
                        parentId={post.parentId}
                        content={post.text}
                        author={post.author}
                        community={post.community}
                        createdAt={post.createdAt}
                        comments={post.children}
                        isComment={true}
                        isInsideAccord={true}
                        likedBy={post.likedBy}
                      />
                  );
                } else {
                  return null; // or any other alternative if you don't want to render anything
                }
              })}

            </>

        </AccordionContent>

      </AccordionItem>
    </Accordion>
  );
}
