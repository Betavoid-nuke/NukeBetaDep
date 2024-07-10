

import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { Separator } from "@/components/ui/separator";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

//COMMENT PAGEL FOR THREADS
var insideComment = false;

const Page = async ({ params }: {params: { id: string }}) => {

    if(!params.id) return ( insideComment=false );

    const user = await currentUser();
    if(!user) return ( insideComment=false );

    const userInfo = await fetchUser(user.id);
    if(!userInfo.onboarded) redirect('/onboarding');

    const thread = await fetchThreadById(params.id);
    insideComment = true;


    return (
        <section className="relative">

            <div>
            <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id || ""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
                isInsideComment={true}
                likedBy={thread.likedBy}
            />
            </div>

            <div className="mt-5">
                <Comment 
                threadId={thread.id}
                currentUserImg={userInfo.image}
                currentUserId={JSON.stringify(userInfo._id)}
                isComment={false}
                    
                />
            </div>

            <div className="mt-10">
                {thread.children.map((childIteam: any) => (
                    <ThreadCard
                    key={childIteam._id}
                    id={childIteam._id}
                    currentUserId={childIteam?.id || ""}
                    parentId={childIteam.parentId}
                    content={childIteam.text}
                    author={childIteam.author}
                    community={childIteam.community}
                    createdAt={childIteam.createdAt}
                    comments={childIteam.children}
                    isComment
                    isInsideComment={false}
                    likedBy={childIteam.likedBy}
                />
                ))}
            </div>

        </section>
    )
    
}

export default Page;