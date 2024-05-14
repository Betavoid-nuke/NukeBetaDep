"use client"

import Goingbackbtn from '@/components/GoBack/Goingbackbtn'
import Flow from '@/components/flow'
import { setFocusNode } from '@/components/flow/FocusNode'
import { fetchProjectById } from '@/lib/actions/projectactions';
import { usePathname } from 'next/navigation';

//returning id and pathname ----------------------------
var id='';
var Ipathname='';
export function getProjectId(){
  const pathname = Ipathname;
  const projectid = id;
  return {projectid, pathname}
}

const page = ({ params }: {params: { id: string }}) => {

  id = params.id;
  Ipathname = usePathname();

  //Focuses the prompt node on the screen so user knows what to do
  try {
    setTimeout(() => {
      setFocusNode(0, 1.4);
      document.getElementById('focus1')?.click()
    }, 1000);
  } catch (error) {
    throw "Focus issue - Ignore"
  }

  return (
    <div style={{height:'inherit'}}>
      <div style={{position:'absolute', zIndex:'9999'}}>
        <Goingbackbtn white={false}/>
      </div>
      <Flow />
    </div>
  )
}

export default page