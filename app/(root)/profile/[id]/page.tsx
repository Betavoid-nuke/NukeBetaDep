import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchUser } from "@/lib/actions/user.action";
import Link from "next/link";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import PhotoUploadButton from "@/components/forms/Photouploader";

import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
  ArrowRightCircle
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { fetchallProject, fetchProject } from "@/lib/actions/thread.actions";
import { Icons } from '@/components/../constants/icons';
import { FollowerPopover } from "@/components/followersPopup/FollowersPopup";
import { FollowingPopover } from "@/components/followingPopup/FollowingPopup";



async function Page({ params }: { params: { id: string } }) {

  //user data
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
    poster: userInfo?.posterimage,
    communities: userInfo?.communities,
    following: userInfo?.following,
    followers: userInfo?.followers,
    posts: userInfo?.threads,
  };
  

  //project data
  const usersprojects=[];
  const result = await fetchallProject();
  for (let index = 0; index < result.projects.length; index++) {
    // getting all projects owned by the current user
    if(result.projects[index].author.id == user.id) {
      usersprojects.push(result.projects[index]);
    }
  }

  //incase user didnt uploaded poster, this will pick a random poster
  const getRandomNumber = (): number => {
    return Math.floor(Math.random() * 8);
  };
  const photoPaths = [
    '/assets/posterPlaceholder/1.jpg',
    '/assets/posterPlaceholder/2.jpg',
    '/assets/posterPlaceholder/3.jpg',
    '/assets/posterPlaceholder/4.jpg',
    '/assets/posterPlaceholder/5.jpg',
    '/assets/posterPlaceholder/6.jpg',
    '/assets/posterPlaceholder/7.jpg',
    '/assets/posterPlaceholder/8.jpg',
  ];
  const randomPoster = photoPaths[getRandomNumber()];
  const Icon = Icons['arrowRight'];

  console.log(userData);
  
  
  return (
    <section>

      <div className="posterforprofileCont">
        <Image
          src={userInfo.posterimage && userInfo.posterimage !== "" ? userInfo.posterimage : randomPoster}
          alt="poster"
          width={1080}
          height={100}
          className="posterforprofile"
        />
      </div>

      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        userid={params.id}
        userIdForFollow={userInfo.objectId}
      />

      <div className="flex flex-row gap-10 mt-5 mb-5" style={{width:'100%', display:'flex', justifyContent:'center'}}>

        <Card x-chunk="dashboard-01-chunk-0 text-light-1" style={{background:'transparent', borderColor:'#1b1b1b', borderRadius:'15px', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap', flexDirection:'column'}}>
          
          <Link href={'/followers'} className="hoverEffect_scale" style={{marginLeft:'190px', marginTop:'16px', marginBottom:'-36px'}}>
            <Icon className={` ml-3 size-5`} color="#8f8f8f" />
          </Link>

          <FollowerPopover userImage={userData.image} followers={userData.followers} cuserid={params.id} />
  
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-light-1 text-sm font-medium" style={{borderRadius:'inherit'}}>
              Followers
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-light-1 font-normal" style={{borderRadius:'inherit', fontSize:'24px'}}>{userData.followers.length}</div>
          </CardContent>
          
        </Card>
      
        <Card x-chunk="dashboard-01-chunk-0 text-light-1" style={{background:'transparent', borderColor:'#1b1b1b', borderRadius:'15px', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap', flexDirection:'column'}}>
          
          <FollowingPopover userImage={userData.image} following={userData.following} cuserid={params.id} />

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-light-1 text-sm font-medium" style={{borderRadius:'inherit'}}>
              Following
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-light-1 text-2xl font-normal" style={{borderRadius:'inherit', fontSize:'24px'}}>{userData.following.length}</div>
          </CardContent>
          
        </Card>
      
        <Card x-chunk="dashboard-01-chunk-0 text-light-1" style={{background:'transparent', borderColor:'#1b1b1b', borderRadius:'15px', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap', flexDirection:'column'}}>

          {userInfo.id.toString() === user.id.toString() ? (
            <Link href={'/projects'} className="hoverEffect_scale" style={{marginLeft:'190px', marginTop:'16px', marginBottom:'-36px'}}>
              <Icon className={` ml-3 size-5`} color="#8f8f8f" />
            </Link>
          ):null}

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-light-1 text-sm font-medium" style={{borderRadius:'inherit'}}>
              Projects
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-light-1 text-2xl font-normal" style={{borderRadius:'inherit', fontSize:'24px'}}>{usersprojects.length}</div>
          </CardContent>

        </Card>

        <Card x-chunk="dashboard-01-chunk-0 text-light-1" style={{background:'transparent', borderColor:'#1b1b1b', borderRadius:'15px', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap', flexDirection:'column'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-light-1 text-sm font-medium" style={{borderRadius:'inherit'}}>
              Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-light-1 text-2xl font-normal" style={{borderRadius:'inherit', fontSize:'24px'}}>{userData.posts.length}</div>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-0 text-light-1" style={{background:'transparent', borderColor:'#1b1b1b', borderRadius:'15px', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap', flexDirection:'column'}}>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-light-1 text-sm font-medium" style={{borderRadius:'inherit'}}>
              Organisations
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-light-1 text-2xl font-normal" style={{borderRadius:'inherit', fontSize:'24px'}}>0</div>
          </CardContent>

        </Card>

      </div>

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">

          <Link href={""}>
            <TabsList className="tab">

              {profileTabs.map((tab) => (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="max-sm:hidden">{tab.label}</p>

                  {tab.label === "Posts" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                      {userInfo.threads.length}
                    </p>
                  )}
                </TabsTrigger>
              ))}

            </TabsList>
          </Link>

          {profileTabs.map((tab) => (

            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >


              {tab.label === "Posts" && (
                <div>
                  <ThreadsTab
                    currentUserId={user.id}
                    accountId={userInfo.id}
                    accountType="User"
                  />
                </div>
              )}

              {tab.label === "Teams" && (
                <div>
                  {tab.label}
                </div>
              )}

              {tab.label === "Projects" && (
                <div>
                  {tab.label}
                </div>
              )}


            </TabsContent>

          ))}

        </Tabs>
      </div>

    </section>
  );
}
export default Page;

















