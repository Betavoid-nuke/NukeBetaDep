import { SignIn } from "@clerk/nextjs";
import { Metadata } from 'next';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from "next/image";
import { dark } from "@clerk/themes";
import MatrixRain from "@/components/MatrixFallingNumbers/FallingNumbers";

export default function Page() {
    // background: `url('../../../../public/assets/projectPoster2.jpg') center/cover no-repeat`
    return (
        
        // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}} className="gradient-background">
        //     <div style={{fontSize:'32px', marginBottom:'20px', color:'white', fontWeight:'bold'}}>B E T A V O I D</div>
        //     <SignIn />
        // </div>

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
                    Create an account
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your email below to create your account
                  </p>
                </div>

                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <SignIn appearance={{ baseTheme: dark }} />
                </div>

              </div>
            </div>

        </div>
    );
}