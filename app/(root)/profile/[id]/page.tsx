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






async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      
      <div className="posterforprofileCont">
        <Image
          src={userInfo.image}
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
      />

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

















