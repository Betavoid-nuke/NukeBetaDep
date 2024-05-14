import { useCallback, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { Textarea } from "@/components/ui/textarea";
import { findKeywords } from "@/lib/AIFunctions/KeywordExtractor";
import { addNode, setNodes, setNodesForWire, setValuesandAdd } from "../index";
import { FocusToNode, midNode } from '../nodeUtils.ts'
import { saveProject } from '@/lib/actions/projectactions';
import { getProjectId } from '@/app/(root)/view-project-flow/[id]/page';
import { useStoreApi, useReactFlow } from 'reactflow';
import { parseSentence } from '../AI_Utils/jsonMaker';



function removeDuplicates(arr) {
  let uniqueValues = {}; // Object to store unique values
  let result = []; // Array to store unique values in order

  // Iterate through the array
  for (let i = 0; i < arr.length; i++) {
      // Check if the value is not in uniqueValues object
      if (!uniqueValues[arr[i]]) {
          // Add the value to the result array
          result.push(arr[i]);
          // Mark the value as seen in uniqueValues object
          uniqueValues[arr[i]] = true;
      }
  }

  return result;
}



//storing the node information, for adding new from placeholders
export var X = 0;
export var Y = 0;
export var NForNext = 0;
export var IndexForNext = 0;



//calculates the position of the first node so the nodes are aligned perfectly to the center
var flipflop = false;
var flipflopone = true;
var rowNum = 0;
var Ny;
const arrayOfMidNodes = [];
export function calculatePosition(N, Mr, Ml, Nw, Xa, index ) {

  if(flipflopone){
    const Xf = (Xa/2) - (Nw/2);
    flipflopone = false;
    flipflop = true;
    if(index !== N){
      arrayOfMidNodes.push(index);
    }
    rowNum = rowNum + 1;
    if (rowNum == 1) {
      Ny = 250;
      return { Xf, Ny }
    }
    if(rowNum > 1) {
      Ny = 150 + (120*rowNum);
      return { Xf, Ny }
    }
  }

  if(flipflop){
    const Xf = ((Xa/2) - (Nw/2)) - (Nw+Mr);
    flipflop = false;
    return { Xf, Ny }
  }

  if(!flipflop){
    const Xf = ((Xa/2) - (Nw/2)) + (Nw+Mr);
    flipflopone = true;
    return { Xf, Ny }
  }
}



export function FocusOnNode(){

  //Focus to the mid node after displaying the nodes
  const midNodeForFocus = midNode(arrayOfMidNodes);
  FocusToNode(midNodeForFocus);

}



//keywords and values extracted from prompt, in JSON formate
export let jsonExtract;


//to store id of all the keyword nodes when adding them
var idOfKeywordNodes = [];



function TextUpdaterNode({ data, isConnectable }) {

  //this gets all the nodes currently in the canvas
  const store = useStoreApi();

  var prompt=''; //to catch the prompt live, right as the user types it
  const onChange = useCallback((evt) => {
    //if you wanna show anything live as the user types, this is where that logic will go
    prompt = evt.target.value;
  }, []);

  //extracts the keywords, loops throw them and prints nodes, focuses to the mid node
  const onSubmit = useCallback((evt) => {

    const Initialresult = findKeywords(prompt);
    const result = removeDuplicates(Initialresult.foundKeywords);91
    const theLoopLength = result.length + 1;

    //extracts the keywords and the values and then creats a jason for the AI engine
    jsonExtract = parseSentence(prompt, result);


    for (let index = 0; index < theLoopLength; index++) {

      const { Xf, Ny } = calculatePosition(theLoopLength, 25, 25, 230, 420, (index+1));

      //clear all nodes and edges
      document.getElementById('makeEmpty').click();

      //adding nodes and wires
      if(index !==  (theLoopLength-1)) {
        setTimeout(() => {

          //adding nodes _________________
          setValuesandAdd({
          Nid:`New${index}`,
          Ntype:"Keywords",
          Ndata:{ label: result[index], id: `New${index}` },
          Nx:Xf,
          Ny:Ny,
          Ncolor: "White",
          Ndraggable: true,
          Nstyle: { backgroundColor: "Black", color: "white", borderRadius:'10px' },
          Naddingnodes: false
          });

          //adding id of the keywords node to the array
          idOfKeywordNodes.push(`New${index}`);

          //setting the value of the keywords
          setTimeout(() => {
            const idoftxt = `VNew${index}`;
            const textarea = document.getElementById(idoftxt);
            if (textarea) {
              textarea.value = jsonExtract[result[index]];
            }
          }, 500);

          document.getElementById('addNode').click();

          //adding wires __________________
          setNodesForWire({NidWire:`wire${index}`, NsourceNode:"prompt", NtargetNode:`New${index}`, Nanimated:true});
          document.getElementById('connectNode').click();

        }, 500);
      }

      //adding placeholder node, for adding new nodes
      if(index ==  (theLoopLength-1)) {

        setTimeout(() => {
          //adding nodes _________________
          setValuesandAdd({
            Nid:`New${index}`,
            Ntype:"Placeholder",
            Ndata:{ label: result[index] },
            Nx:Xf,
            Ny:Ny,
            Ncolor: "White",
            Ndraggable: false,
            Nstyle: { backgroundColor: "Black", color: "white", borderRadius:'10px' },
            Naddingnodes: false

          });
          document.getElementById('addNode').click();
        }, 1000);

      }

      X = Xf;
      Y = Ny;

      //for printing new placeholer
      NForNext = theLoopLength;
      IndexForNext = (index+1);
      
    }


    //add continue btn
    setTimeout(() => {

      const midNodeForFocus = midNode(arrayOfMidNodes);
      const { nodeInternals } = store.getState();
      const nodes = Array.from(nodeInternals).map(([, node]) => node);
      

      const yoflast = nodes[midNodeForFocus].position.y+200; //height
      const xoflast = 650; //from left

      //adding coninue nodes _________________
      setValuesandAdd({
        Nid:`ContinueBtn`,
        Ntype:"Continue",
        Ndata:{ id: `ContinueBtn`, name: "Continue" },
        Nx:xoflast,
        Ny:yoflast,
        Ncolor: "White",
        Ndraggable: true,
        Nstyle: { backgroundColor: "Black", color: "white", borderRadius:'10px' },
        Naddingnodes: false
      });
      document.getElementById('addNode').click();

      //adding wires from keywords to continue btn
      for (let index = 0; index < idOfKeywordNodes.length; index++) {
        setTimeout(() => {
          setNodesForWire({NidWire:`NtoCB${index}`, NsourceNode:idOfKeywordNodes[index], NtargetNode:"ContinueBtn", Nanimated:false});
          document.getElementById('connectNode').click();
        }, 500);
      }

    }, 1500);

    
    //save the project
    setTimeout(() => {

      const prompts = [];
      prompts.push(prompt);
      const { nodeInternals } = store.getState();
      const { edges } = store.getState();
      const nodes = Array.from(nodeInternals).map(([, node]) => node);

      saveProject({
        projectId: getProjectId().projectid,
        path: getProjectId().pathname,
        prompt: prompts,
        nodes: nodes,
        keywords: result.foundKeywords,
        edges: edges,
        jsonextract: jsonExtract
      })

    }, 2500);


    FocusOnNode();
    

  }, []);

  return (
    <div className="text-updater-node" style={{overflow:'hidden', height:'auto'}}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label htmlFor="text" className='mt-1'>Prompt:</label>
          <Textarea id="text" name="text" onSubmit={onSubmit} onChange={onChange} className="nodrag" style={{width:'400px', color:'black', fontSize:'12px', margin:'10px', backgroundColor:'#f8f8f8', overflow:'hidden'}} />
          <button className="p-2 text-light-1" onClick={onSubmit} style={{borderRadius:'10px', fontSize:'12px', marginLeft:'10px', marginBottom:'2px', backgroundColor:'#7c7c7c'}} >Submit</button>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );

}
export default TextUpdaterNode;
//Example Prompts
// design a gear that can transmit 400N force and withstand 20N stress and has 2mm thickness keyword module budget pitch torque
