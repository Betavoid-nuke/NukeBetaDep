"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Message from "../messagecard/Message";
import ReactDOM from 'react-dom';
import SubmitaichatH from "../forms/AiChatHistory";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.action";
import { scrollToBottm } from "@/lib/actions/commonFunctions";

interface Props {
  authorID: string
}

const ChatinputFooter = ({authorID}: Props) => {

  const [inputValue, setInputValue] = useState('');

  async function sendEvent() {

    SubmitaichatH({

      // marked important and tag function pending, when you make, the values need to go in SubmitaichatH
      authorID: authorID,
      userinput: inputValue,
      aireply: 'ok buddy',
      markedimportent: false,
      tag: ''

    })

    //typed stuff in the input box is stroed live in - inputValue
    //________________________________________________________________________________
    const MessageElement = <Message userMessage={inputValue} aiMessage={"ok buddy"}/>;
    //________________________________________________________________________________


    // Find the "chatinput" div
    const chatInputDiv = document.getElementById("chatinput");

    if (chatInputDiv) {

      // Create a container div for the new Message component
      const container = document.createElement('div');
      
      // Render the new Message component into the container
      ReactDOM.render(MessageElement, container);
  
      // Append the container's content to the chatInputDiv
      chatInputDiv.appendChild(container);

      // Scroll the window down to show the new Message
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });

    }

    // Clear the input after sending the message
    setInputValue("");

  }

  return (
    <section
      className="mt-9 p-2 messgaebox"
      style={{ borderRadius: 20, width:'100%', borderColor:"rgb(36, 36, 36)", border:'0px solid' }}
    >

      <div className="flex row" style={{ justifyContent: "space-between" }}>
        
        <input
          className="w-full flex-row h-10 text-light-1"
          style={{
            borderColor: "#66666600",
            backgroundColor: "#2b2b33",
            fontSize: "18px",
            padding: "20px",
            borderRadius: 20,
          }}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Button
          onClick={sendEvent}
          className="flex-row text-light-1 ml-5"
          style={{
            backgroundColor: "none",
            border: "0.1rem solid #666666",
            borderRadius: 20,
          }}
        >
          Send
        </Button>
        
      </div>

    </section>
  );

};

export default ChatinputFooter;
