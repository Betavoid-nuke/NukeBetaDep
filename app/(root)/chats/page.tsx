
import React from 'react'
import Image from 'next/image'

interface PageProps {
    params: {
      chatId: string
    }
}

const chats = async ({ params }: PageProps) => {


  return (
      <div className='text-light-1'>Chat</div>
    )
}

export default chats