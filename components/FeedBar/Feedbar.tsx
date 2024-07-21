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
    <Tabs defaultValue="account" className="w-[400px] bg-black text-white" style={{marginBottom:'50px', width:'100%', display:'flex', justifyContent:'center', backgroundColor:'transparent'}}>
      
      <TabsList className="grid w-full grid-cols-2 bg-gray-800" style={{width:'fit-content'}}>
        <TabsTrigger value="account" className="bg-gray-900 text-white" style={{fontSize:'16px', borderRadius:'6px'}}>Global</TabsTrigger>
        <TabsTrigger value="password" className="bg-gray-900 text-white" style={{fontSize:'16px', borderRadius:'6px'}}>Following</TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="bg-gray-800 text-white">
      </TabsContent>

      <TabsContent value="password" className="bg-gray-800 text-white">
      </TabsContent>
      
    </Tabs>

  )
}
