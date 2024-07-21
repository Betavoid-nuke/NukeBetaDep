import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function FeedTabs() {
  return (
    <Tabs defaultValue="account" className="w-[400px] bg-black text-white">

      <TabsList className="grid w-full grid-cols-2 bg-gray-800">
        <TabsTrigger value="account" className="bg-gray-900 text-white">Account</TabsTrigger>
        <TabsTrigger value="password" className="bg-gray-900 text-white">Password</TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="bg-gray-800 text-white">
        <Card className="bg-gray-900 text-white">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" className="bg-gray-800 text-white border-gray-700" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username" className="text-white">Username</Label>
              <Input id="username" defaultValue="@peduarte" className="bg-gray-800 text-white border-gray-700" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-gray-700 text-white">Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="password" className="bg-gray-800 text-white">
        <Card className="bg-gray-900 text-white">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current" className="text-white">Current password</Label>
              <Input id="current" type="password" className="bg-gray-800 text-white border-gray-700" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new" className="text-white">New password</Label>
              <Input id="new" type="password" className="bg-gray-800 text-white border-gray-700" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-gray-700 text-white">Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>

  )
}
