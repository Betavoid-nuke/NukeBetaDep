import ChatinputFooter from "@/components/chatinputfooter/ChatinputFooter";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageCards from "@/components/messagecard/MessageCards";
import Message from "@/components/messagecard/Message";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.action";
import { fetchAIChatHistory } from "@/lib/actions/thread.actions";
import { Separator } from "@/components/ui/separator";
import { scrollToBottm } from "@/lib/actions/commonFunctions";
import Scrolltobottom from "@/components/chatinputfooter/Scrolltobottom";

async function viewProject() {

  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  const author = userInfo?._id;

  const result = await fetchAIChatHistory(1, 30); //1 is the page number, and 30 is how many posts to display

  return (
    <div className="flex flex-col" style={{ height: "100%" }}>

      <main className="flex flex-col px-50 py-50 mb-150" id="chatinput" style={{top:0, marginBottom:'150px'}}>
        
        <h1 className="head-text">Name</h1>

        {/* Chat History Goes here */}
        {result.projects.length === 0 ? (
          <p className='no-result'>No Chat found</p>
        ) : (
          <>
            {result.projects.reverse().map((post) => (
              
              <Message userMessage={post.userinput} aiMessage={post.aireply}/>

            ))}
          </>
        )}

        <div className="flex-col">
          <Separator className="mt-10" style={{backgroundColor:'#272727'}}/>
          <div className="text-light-1 flex mt-5" style={{justifyContent:'center', color:'#636363'}}>New</div>
        </div>

      </main>

      <Scrolltobottom />

      <div className="flex transboxformesageinput" style={{ bottom: 0, position: 'fixed', width: '100%', left:'0px' }}>
        <ChatinputFooter authorID={author}/>
      </div>

    </div>
  );

};

export default viewProject;








