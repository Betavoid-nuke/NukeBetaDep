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

export function showNotification({Message}:Props) {
  const { toast } = useToast();
  toast({
    className: "bg-black text-light-1 border-gray-700",
    description: Message,
  })
}
