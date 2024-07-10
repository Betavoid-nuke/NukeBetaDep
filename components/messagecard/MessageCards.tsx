import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { boolean } from "zod";

interface Props {
  isAI: boolean
  userMessage: string
  aiMessage: string
}

const MessageCards = ({isAI, userMessage, aiMessage}: Props) => {
  return (
    <section
      className={`flex mt-10 ${isAI ? "aimessagebox" : "usermessagebox"}`}
      style={{ flexWrap: "wrap", alignItems: "center" }}
    >


      {/* if User, prints the avatar on left */}
      {isAI && (
      <Avatar className="flex-row mr-5 mt-8">
        <AvatarImage src="https://github.com/Betavoid-AI/Nuke_v.0.2/blob/main/public/logo-white-s.png?raw=true" />
        <AvatarFallback>Nuke</AvatarFallback>
      </Avatar>
      )}

      {!isAI && (
      <div
        className="mt-9 bg-dark-2 p-5 text-light-2 flex-row w-fit mt-0"
        style={{ borderRadius: 30, backgroundColor: "rgb(34, 34, 34)" }}
      >
        {userMessage}
      </div>
      )}

      {isAI && (
      <div
        className="mt-9 bg-dark-2 p-5 text-light-2 flex-row w-fit mt-0"
        style={{ borderRadius: 30, backgroundColor: "rgb(34, 34, 34)" }}
      >
        {aiMessage}
      </div>
      )}

      {/* if User, prints the avatar on right */}
      {!isAI && (
      <Avatar className="flex-row ml-5 mt-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      )}


    </section>
  );
};

export default MessageCards;
