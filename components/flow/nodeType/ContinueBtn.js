import { useCallback, useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Textarea } from "@/components/ui/textarea";
import { findKeywords } from "@/lib/AIFunctions/KeywordExtractor";
import { addNode, setIndexToRemoveNode, setNodes, setNodesForWire, setValuesandAdd } from "../index";
import Image from "next/image";
import { useStoreApi, useReactFlow } from 'reactflow';
import { NForNext, IndexForNext, calculatePosition } from './TextUpdaterNode';
import { Button } from '@mui/material';
import { any } from 'zod';



//figures the hieghest hight from all the nodes
export function getObjectWithHighestYPosition(objectsArray) {
  if (objectsArray.length === 0) {
      return null; // If the array is empty, return null
  }

  let maxObject = objectsArray[0]; // Assume the first object has the highest y position
  let maxYPosition = objectsArray[0].position.y; // Set the initial max y position

  for (let i = 1; i < objectsArray.length; i++) {
      if (objectsArray[i].position.y > maxYPosition) {
          maxObject = objectsArray[i]; // Update the max object
          maxYPosition = objectsArray[i].position.y; // Update the max y position
      }
  }

  return maxObject;
}


function ContinueBtn({ data, isConnectable }) {

  //this gets all the nodes currently in the canvas
  const store = useStoreApi();
  const { nodeInternals } = store.getState();
  const nodes = Array.from(nodeInternals).map(([, node]) => node);

  //use for printing the new node below the last one which most near to the bottomm
  const heighest_height_node = getObjectWithHighestYPosition(nodes);//heighest hight of that a node on screen have.
  const yfornow = heighest_height_node.position.y+150;

  // getting the editor to see if it already exists in the dom
  const theed = document.getElementById('theeditor');

  function onConct() {
      
      setTimeout(() => {

        //adding the doc editor________________________________
        if(theed){console.log('Document already in the flow');}
        else{
        //adding documentation nodes _________________
        setValuesandAdd({
        Nid:`Doc`,
        Ntype:"Doc",
        Ndata:{ id: `Doc` },
        Nx:-180,
        Ny:yfornow,
        Ncolor: "White",
        Ndraggable: false,
        Nstyle: { backgroundColor: "Black", color: "white", borderRadius:'10px' },
        Naddingnodes: false
        });
        document.getElementById('addNode').click();

        //adding next steps nodes _________________
        setValuesandAdd({
          Nid:`NextStepafterdoc`,
          Ntype:"Next",
          Ndata:{ id: `NextStepafterdoc`, name: "NextStep", forwhat: "doc" },
          Nx:-180,
          Ny:(yfornow+1100),
          Ncolor: "White",
          Ndraggable: false,
          Nstyle: { backgroundColor: "White", color: "Black", borderRadius:'10px', innerWidth:"1000px" },
          Naddingnodes: false
        });
        document.getElementById('addNode').click();

        }

        //connecting ctn btn and doc editor
        setNodesForWire({NidWire:`CBtoDE`, NsourceNode:"ContinueBtn", NtargetNode:"Doc", Nanimated:true});
        document.getElementById('connectNode').click();
      
      }, 1000);

  }
  
  return (
      <div className="contbtn" style={{overflow:'hidden', height:'auto'}}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div>
        <Button onClick={onConct} type='primary' style={{zIndex:'9999', color:'black', fontWeight:'bold', fontSize:'20px', padding:'10px'}}>{data.name}</Button>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );

}
  
export default ContinueBtn;