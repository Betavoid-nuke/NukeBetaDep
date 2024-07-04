
import { Metadata } from "next";
import { Content, Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import Leftsidebar from "@/components/shared/Leftsidebar";
import Rightsidebar from "@/components/shared/Rightsidebar";
import Bottombar from "@/components/shared/Bottombar";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import ChatinputFooter from "@/components/chatinputfooter/ChatinputFooter";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner";




interface Props {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nuke App",
  description: "Nuke AI App by Betavoid",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} style={{overflow:"auto"}}>

          <NextTopLoader
            color="#ffffff"
            initialPosition={0.08}
            crawlSpeed={500}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
            <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />

          <Topbar />

          <main className="flex flex-row" id="mainscreen">
            <Leftsidebar />
            <section className="main-container" id='maincontainer'>
              <div className="w-full max-w-4xl" style={{ maxWidth: 1200, height:'100%' }}>
                {children}
              </div>
            </section>
            <Rightsidebar />
          </main>

          <Toaster expand visibleToasts={9} richColors toastOptions={{}} />
          <Dialog />
          <Bottombar />

        </body>
      </html>
    </ClerkProvider>
  );

}
