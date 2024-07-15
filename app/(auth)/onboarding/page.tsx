import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.action";
import AccountProfile from "@/components/forms/AccountProfile";
import Image from "next/image";
import MatrixRain from "@/components/MatrixFallingNumbers/FallingNumbers";
import { dark } from "@clerk/themes";

async function Page() {

  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    // <main className='gradient-background' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
    //   <h1 className='head-text'>Onboarding</h1>
    //   <p className='mt-3 text-base-regular text-light-2'>
    //     Complete your profile now, to use Nuke.
    //   </p>

    //   <section className='mt-9 p-10 transparentBG' style={{borderRadius:20}}>
    //     <AccountProfile user={userData} btnTitle='Continue' />
    //   </section>
    // </main>


    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">

        <div className="absolute inset-0 bg-zinc-900">
          <MatrixRain />
        </div>

        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
              src='https://github.com/Betavoid-nuke/NukeBetaDep/blob/main/public/logo-white-l.png?raw=true'
              alt='user_logo'
              width={40}
              height={40}
              className='rounded-full object-cover mr-2'
            />
          Betavoid
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Crazy how easy nuke makes engineering design, feels almost supernatural.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>

      </div>

      <div className="flex h-full items-center p-4 lg:p-8" style={{backgroundColor:'#101010'}}>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6" style={{width:'100%'}}>

          <div className="flex flex-col text-light-1 space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Onboarding
            </h1>
            <p className="text-sm text-muted-foreground">
              Complete your profile now, to use Nuke.
            </p>
          </div>

          <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
            <AccountProfile user={userData} btnTitle='Continue' />
          </div>

        </div>
      </div>

    </div>


  );
  
}

export default Page;
