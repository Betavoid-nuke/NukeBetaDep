import HomeHeader from "@/components/Homepageheader/HomeHeader";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPost } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import CheckLogin from "@/components/LoginCheck/CheckLogin";

export default async function Home() {
  const result = await fetchPost(1, 30); //1 is the page number, and 30 is how many posts to display
  const user = await currentUser();
  return (
    <>

    <CheckLogin />

    <div style={{bottom:'auto', position:'fixed', display:'flex'}}>
      <div className="flex-col" style={{justifyContent:'center'}}>
        <HomeHeader />
      </div>
    </div>
    
    <main>
      <div className='flex flex-col gap-10' style={{marginTop:"120px"}}>
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
      </div>
    </main>
    </>
  )
}
