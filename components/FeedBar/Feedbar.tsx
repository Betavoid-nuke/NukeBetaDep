import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ThreadCard from "../cards/ThreadCard"
import { User } from "@clerk/nextjs/dist/types/server";

interface props {
    posts: {
        posts: Omit<Omit<any, never>, never>[];
        isNext: boolean;
    },
    user: User | null;
}

export function FeedTabs({posts, user}:props) {
  return (
    <Tabs defaultValue="account" className="w-[400px] bg-black text-white" style={{marginBottom:'50px', width:'100%', display:'flex', justifyContent:'center', backgroundColor:'transparent', flexDirection:'column'}}>
      
      <TabsList className="grid w-full grid-cols-2 bg-gray-800" style={{width:'100%', display:'flex'}}>
        <TabsTrigger value="account" className="bg-gray-900 text-white" style={{fontSize:'16px', borderRadius:'6px', width:'fit-content'}}>Global</TabsTrigger>
        <TabsTrigger value="password" className="bg-gray-900 text-white" style={{fontSize:'16px', borderRadius:'6px', width:'fit-content'}}>Following</TabsTrigger>
      </TabsList>

      <TabsContent value="account" style={{width:'100%', marginTop:'30px'}}>
        <Card style={{backgroundColor:'transparent', border:'none'}}>
            <div className='flex flex-col gap-10 text-light-1' style={{ marginTop: "20px" }}>
              {posts.posts.length === 0 ? (
                <p className='no-result'>No posts found</p>
              ) : (

                <>
                  {posts.posts.map((post) => (
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
        </Card>
      </TabsContent>

      <TabsContent value="password">
      </TabsContent>

    </Tabs>

  )
}
