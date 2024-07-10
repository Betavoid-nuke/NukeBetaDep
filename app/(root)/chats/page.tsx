"use client"

import React, { useEffect } from 'react';
import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
import { CometChatUIKit, CometChatUsersWithMessages } from "@cometchat/chat-uikit-react";
 
async function ChatStart() {

  const COMETCHAT_CONSTANTS = {
    APP_ID: process.env.NEXT_PUBLIC_COMET_APP_ID, 
    REGION: process.env.NEXT_PUBLIC_COMET_REGION, 
    AUTH_KEY: process.env.NEXT_PUBLIC_COMET_KEY, 
  };

  // Create the builder
  const UIKitSettings = new UIKitSettingsBuilder()
    .setAppId(COMETCHAT_CONSTANTS.APP_ID || '')
    .setRegion(COMETCHAT_CONSTANTS.REGION || '')
    .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY || '')
    .subscribePresenceForAllUsers()
    .build();

  const UID = "User1"; // Replace with your UID

  const initializeCometChat = async () => {

    try {

      try {
        await CometChatUIKit.init(UIKitSettings);
      } catch (error) {
        console.log(error);
      }
      console.log("Initialization completed successfully");

      const user = await CometChatUIKit.getLoggedinUser();
      console.log(user);

      if (!user) {
        CometChatUIKit.login(UID)
        .then((user: CometChat.User) => {
          console.log("Login Successful:", { user });
          //mount your app
        })
        .catch(console.log);
      } else {
      }
    } catch (error) {
      console.error("Initialization failed:", error);
    }

  };

  useEffect(() => {
    initializeCometChat();
  }, []);

}

interface PageProps {
  params: {
    chatId: string;
  };
}

const Chats = ({ params }: PageProps) => {

  //start chat
  ChatStart();
  
  return (
    <div style={{height:'100%', width:'100%'}}>
      <CometChatUsersWithMessages />
    </div>
  );
};

export default Chats;
