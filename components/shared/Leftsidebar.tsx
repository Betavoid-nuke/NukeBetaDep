"use client"

import { SignOutButton, SignedIn, currentUser } from "@clerk/nextjs"
import { sidebarLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { redirect, usePathname, useRouter } from 'next/navigation'
import { fetchUser } from "@/lib/actions/user.action"

function Leftsidebar() {

    const router = useRouter();
    const pathname = usePathname();

    return (
        <section className="custom-scrollbar leftsidebar">
            
            <div className="flex w-full flex-1 flex-col gap-6 px-10">

                {sidebarLinks.map((link) => 
                    { 
                        const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                        
                        return (

                            <Link 
                            href={link.route}
                            key={link.label}
                            className={`leftsidebar_link ${isActive && ''}`} style={{ backgroundColor: isActive ? '#27272a' : 'transparent',}}>

                                <Image 
                                src={link.imgURL}
                                alt={link.label}
                                width={20}
                                height={20}/>

                                <p className="text-light-1 max-lg:hidden">{link.label}</p>

                            </Link>

                        )

                    }
                )}

            </div>

            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton signOutCallback={() => router.push('/sign-in')}>
                        <div className="flex cursor-pointer gp-4 p-4">
                            <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
                            <p className="text-light-2 p-2 max-lg:hidden">Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>

        </section>
    )
}

export default Leftsidebar