import { useCallback, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { Textarea } from "@/components/ui/textarea";
import { findKeywords } from "@/lib/AIFunctions/KeywordExtractor";
import { addNode, setIndexToRemoveNode, setNodes, setNodesForWire, setValuesandAdd } from "../index";
import Image from "next/image";
import { useStoreApi, useReactFlow } from 'reactflow';
import { NForNext, IndexForNext, calculatePosition } from './TextUpdaterNode';

function placeholderAdd({ data, isConnectable }) {

    //this gets all the nodes currently in the canvas
    const store = useStoreApi();
    const { nodeInternals } = store.getState();

    //sets the index of the node we need to remove, and then clicks a invisible btn in the index that deletes the node at that index
    const addNode = useCallback((evt) => {

      //remove placeholder
      const nodes = Array.from(nodeInternals).map(([, node]) => node);
      const ind = nodes.length - 1;

      const X = nodes[(nodes.length - 1)].position.x;
      const Y = nodes[(nodes.length - 1)].position.y;
      setIndexToRemoveNode({Nindexofnode:ind});
      document.getElementById('removeNode').click();

      //add a new node
      setValuesandAdd({
        Nid:`New${ind}`,
        Ntype:"Keywords",
        Ndata:{ label: 'New Node' },
        Nx:X,
        Ny:Y,
        Ncolor: "White",
        Ndraggable: true,
        Nstyle: { backgroundColor: "Black", color: "white", borderRadius:'10px' },
        Naddingnodes: false
      });
      document.getElementById('addNode').click();

      //adding wires __________________
      setNodesForWire({NidWire:`Wire${ind}`, NsourceNode:"prompt", NtargetNode:`New${ind}`});
      document.getElementById('connectNode').click();

      //add new placeholder
      setTimeout(() => {
        const { Xf, Ny } = calculatePosition(NForNext, 25, 25, 230, 420, IndexForNext);
        setValuesandAdd({
        Nid:`New${ind+1}`,
        Ntype:"Placeholder",
        Ndata:{ label: '' },
        Nx:Xf,
        Ny:Ny,
        Ncolor: "White",
        Ndraggable: false,
        Nstyle: { backgroundColor: "Black", color: "white", borderRadius:'10px' },
        Naddingnodes: false
        });
        document.getElementById('addNode').click();
      }, 500);

    }, []);
  
    return (
      <button onClick={addNode}>
      <div className="text-updater-node" style={{overflow:'hidden', height:'auto', border:'#919191', borderStyle:'dotted', borderWidth:'6px'}}>
        <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
        <div className='flex-col' style={{width:'220px', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <label htmlFor="text" style={{fontSize:'18px', fontWeight:'normal'}} className='mt-1 ml-1'>Add Key and Value</label>
          <div style={{color:"black", fontSize:"42px"}}>
            +
          </div>
        </div>
        <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      </div>
      </button>
    );
    
  }
  
  export default placeholderAdd;