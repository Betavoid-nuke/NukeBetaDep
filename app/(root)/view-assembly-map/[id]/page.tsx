
// "use client"

import Goingbackbtn from '@/components/GoBack/Goingbackbtn'
import { Separator } from '@/components/ui/separator'
import { fetchAssemblyById } from '@/lib/actions/thread.actions';
import React from 'react'
import { ReactFlowProvider } from 'reactflow';
import { useCallback, useRef } from 'react';
import AssemblyMapFlow from '../../../../components/AssemblyMapFlow'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { tryzip } from '../../../../components/AssemblyMapFlow/ZipMaker/zipmaker'




const Page = async ({ params }: { params: { id: string } }) => {

  const assembly = await fetchAssemblyById(params.id);

  return (

    <div style={{ display: "contents" }}>

      {/* Main Header */}
      <div className="flex row" style={{ justifyContent: "space-between" }}>
        <div className="flex-col">
          
          <div
              className="mb-2 flex row"
              style={{ fontSize: 32, color: "#cfcfcf" }}
            >
              <Goingbackbtn white={true} />
              {assembly.text}

          </div>

          <div className="mb-5 mt-0" style={{ fontSize: 16, color: "#b4b4b4" }}>

              {assembly.bio}

          </div>

        </div>
      </div>
      <Separator className="mt-2 mb-2 bg-light-4" />

      {/* Map Canvas */}
      <AssemblyMapFlow />

      {/* Generate the assembly */}
      {/* <div className="text-light-1" style={{ position: 'fixed', bottom: '0', right: '0', padding:"50px" }}>
        <Button variant="outline" className="AssemblyBtn">Generate Assembly</Button>
      </div> */}

    </div>

  )
}

export default Page;