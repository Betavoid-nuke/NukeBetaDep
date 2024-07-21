
import { FeedTabs } from "@/components/FeedBar/Feedbar";
import HomeHeader from "@/components/Homepageheader/HomeHeader";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPost } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.action";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default async function Home() {

  // Checks if the user is logged in or not
  const user: User | null = await currentUser();
  if (!user) {
    redirect('/sign-in'); // Redirect to sign-in page
    return;
  }

  // Checks if the user is onboarded or not
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect('/onboarding'); // Redirect to onboarding page
    return;
  }

  // Fetch posts
  const result = await fetchPost(1, 30);

  // Pass user and fetched posts to the client component
  return (
    <main>
      
      <FeedTabs posts={result} user={user} />
      
      {/* <div className='flex flex-col gap-10 text-light-1' style={{ marginTop: "20px" }}>
        {result.posts.length === 0 ? (
          <p className='no-result'>No posts found</p>
        ) : (
        
          <>
            {result.posts.map((post) => (
              post.parentId ? null : (
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
                  likedBy={post.likedBy}
                />
              )
            ))}
          </>

        )}
      </div> */}
  
    </main>
  );

}
