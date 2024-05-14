
import { Handle, Position, useStoreApi } from 'reactflow';
import DocEditorcomponent from '@/components/DocEditor/DocEditor';
import CodeBlock from "../../CodeViewer/CodeViewer"
import { getObjectWithHighestYPosition } from './ContinueBtn';
import { setNodesForWire, setValuesandAdd } from '..';
import { readPyFile } from '@/lib/AIAPI/AIcall';
import React, { useState, useEffect } from 'react';



var once = true;
export var GeneratedCode;
async function fectfile() {
  if (once) {
    const trry = await readPyFile();
    once = false
    return trry
  }
}


var y;
export function DoctoCode(){

  setTimeout(() => {

    //printing generated code in a code block
    setValuesandAdd({
    Nid:`Code`,
    Ntype:"Code",
    Ndata:{ id: `Code` },
    Nx:-180,
    Ny:y,
    Ncolor: "White",
    Ndraggable: false,
    Nstyle: { backgroundColor: "Black", color: "white", borderRadius:'10px' },
    Naddingnodes: false
    });
    document.getElementById('addNode').click();

    //connecting ctn btn and doc editor
    setNodesForWire({NidWire:`CBtoDE`, NsourceNode:"Doc", NtargetNode:"Code", Nanimated:false});
    document.getElementById('connectNode').click();

    //adding next steps nodes _________________
    setValuesandAdd({
    Nid:`NextStep`,
    Ntype:"Next",
    Ndata:{ id: `NextStep`, name: "NextStep", forwhat: "codeblock" },
    Nx:-180,
    Ny:(y+1050),
    Ncolor: "White",
    Ndraggable: false,
    Nstyle: { backgroundColor: "White", color: "Black", borderRadius:'10px', innerWidth:"1000px" },
    Naddingnodes: false
    });
    document.getElementById('addNode').click();

  }, 1000);

}


function DocEditor({ data, isConnectable }) {

  //this gets all the nodes currently in the canvas
  const store = useStoreApi();
  const { nodeInternals } = store.getState();
  const nodes = Array.from(nodeInternals).map(([, node]) => node);

  //use for printing the new node below the last one which most near to the bottomm
  const heighest_height_node = getObjectWithHighestYPosition(nodes);//heighest hight of that a node on screen have.
  const yfornow = heighest_height_node.position.y+150;
  y = yfornow;

  //gets the response from the AI Engine, and genrated the CAD Code.
  //will make this live and put this inside the onchange so the response is generated live right as the use chnages the documentation
  async function fetchData() {
    GeneratedCode = await fectfile();
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id='doceditor' className="doceditornode" style={{ overflow: 'hidden', height: 'auto' }}>
      <Handle type="target" position={Position.Right} isConnectable={isConnectable} />
      <div>
        <label htmlFor="text" className='mt-1'>Documentation and Notes:</label>
        <div style={{maxHeight:'1000px', overflow:'auto', overflowY:'scroll'}}>
          <DocEditorcomponent id={data.id} />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
  
}

export default DocEditor;
