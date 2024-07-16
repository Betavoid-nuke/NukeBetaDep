"use client"

import { SignOutButton, SignedIn, currentUser } from "@clerk/nextjs"
import { sidebarLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { redirect, usePathname, useRouter } from 'next/navigation'
import { fetchUser } from "@/lib/actions/user.action"
import { useState } from "react"
import { useSidebar } from "@/hooks/useSidebar"
import { ChevronLeft } from "lucide-react"
import { DashboardNav } from "../newNavigationBar/dashboard-nav"
import { navItems } from "@/constants/newIndex"
import { cn } from "@/lib/utils"

type SidebarProps = {
    className?: string;
};

function Leftsidebar({ className }: SidebarProps) {

    const router = useRouter();
    const pathname = usePathname();

    //new collapsible sidebar
    const { isMinimized, toggle } = useSidebar();
    const [status, setStatus] = useState(false);
  
    const handleToggle = () => {
      setStatus(true);
      toggle();
      setTimeout(() => setStatus(false), 500);
    };

    return (

        //old nav bar
        // <section className="custom-scrollbar leftsidebar">

        //     <div className="flex w-full flex-1 flex-col gap-6 px-10">

        //         {sidebarLinks.map((link) => 
        //             { 
        //                 const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                        
        //                 return (

        //                     <Link 
        //                     href={link.route}
        //                     key={link.label}
        //                     className={`leftsidebar_link ${isActive && ''}`} style={{ backgroundColor: isActive ? '#27272a' : 'transparent',}}>

        //                         <Image 
        //                         src={link.imgURL}
        //                         alt={link.label}
        //                         width={20}
        //                         height={20}/>

        //                         <p className="text-light-1 max-lg:hidden">{link.label}</p>

        //                     </Link>

        //                 )

        //             }
        //         )}

        //     </div>

        //     <div className="mt-10 px-6">
        //         <SignedIn>
        //             <SignOutButton signOutCallback={() => router.push('/sign-in')}>
        //                 <div className="flex cursor-pointer gp-4 p-4">
        //                     <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
        //                     <p className="text-light-2 p-2 max-lg:hidden">Logout</p>
        //                 </div>
        //             </SignOutButton>
        //         </SignedIn>
        //     </div>

        // </section>

        //new nav bar
        <nav
          className={cn(
            `relative hidden h-screen flex-none border-r z-10 pt-20 md:block sticky left-0 top-0 z-20`,
            status && 'duration-500',
            !isMinimized ? 'w-72' : 'w-[72px]',
            className
          )}
          style={{backgroundColor:'#09090b', color:'#b7b7b7'}}
        >
          <ChevronLeft
            className={cn(
              'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
              isMinimized && 'rotate-180'
            )}
            onClick={handleToggle}
            
          />
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <div className="mt-3 space-y-1">
                <DashboardNav items={navItems} />
              </div>
            </div>
          </div>
        </nav>


    )
}

export default Leftsidebar