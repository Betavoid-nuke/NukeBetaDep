
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image";


interface Props {
    pageurl: string
}


export function DialogCloseButton({pageurl}: Props) {
  
  return (
    <Dialog>

      <DialogTrigger id="db" asChild>
        <Image
            src="/assets/share.svg"
            alt="heart"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
        />
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-dark-2 text-light-1 border-gray-700">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription className="text-light-2">
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-3">
            <Input
              id="link"
              defaultValue={pageurl}
              readOnly
              className="bg-black border-gray-1 text-light-1"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="text-light-1 bg-dark">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}
