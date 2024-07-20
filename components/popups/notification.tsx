"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Props {
  Message:string
}



export function ToastSimple({Message}:Props) {
  const { toast } = useToast();

  return (
    <Button
      type='submit' 
      className='bg-primary-500 text-light-1 border-none mb-5'
      variant="outline"
      onClick={() => {
        toast({
          className: "bg-black text-light-1 border-gray-700",
          description: Message,
        })
      }}
    >
      Post
    </Button>
  )
}

export function ToastMessage({Message}:Props) {
  const { toast } = useToast();

  return (
    <Button
      className='bg-transparent toastmsg x-1 y-1'
      style={{border:'none', position:'absolute'}}
      variant="outline"
      onClick={() => {
        toast({
          className: "bg-black text-light-1 border-gray-700",
          description: Message,
        })
      }}
    >
    </Button>
  )
}

export function showNotification({Message}:Props) {
  const { toast } = useToast();
  toast({
    className: "bg-black text-light-1 border-gray-700",
    description: Message,
  })
}
