import React from 'react'
import MessageCards from './MessageCards'

interface Props {
  userMessage: string
  aiMessage: string
}

const Message = ({userMessage, aiMessage}: Props) => {
  return (
    <div>
      <MessageCards userMessage={userMessage} aiMessage={''} isAI={false}/>
      <MessageCards userMessage={''} aiMessage={aiMessage}  isAI={true}/>
    </div>
  )
}

export default Message