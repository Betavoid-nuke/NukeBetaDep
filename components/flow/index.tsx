"use client";

import React, { useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Panel
} from "reactflow";
import "reactflow/dist/style.css";
import { SelectionMode } from "reactflow";
import "reactflow/dist/style.css";

import { useState } from 'react';
import { applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import TextUpdaterNode from './nodeType/TextUpdaterNode';
import KeywordsAndValues from  './nodeType/KeywordsAndValues'
import { useStoreApi, useReactFlow } from 'reactflow';
import { ReactFlowProvider } from 'reactflow';

import FocusNode from './FocusNode';
import { Props } from "next/script.js";
import placeholderAdd from './nodeType/placeholderAdd'
import ContinueBtn from './nodeType/ContinueBtn'
import DocEditor from './nodeType/DocEditor'
import { initialNodes, initialEdges } from "./nodeUtils";
import { getProjectId } from "@/app/(root)/view-project-flow/[id]/page";
import { SavedDetails, SavedEdgesdetails, SavedPromptdetails, SavedValuesdetails } from "./getsaveddata";
import { parseSentence } from "./AI_Utils/jsonMaker";
import CodeBlockType from "./nodeType/Codeblock"
import NextStep from "./nodeType/NextStep"


//mini map node color definition -----------------------------
const nodeColor = (node: any) => {
  switch (node.type) {
    case "input":
      return "#6ede87";
    case "output":
      return "#6865A5";
    default:
      return "#ff0072";
  }
};
const nodeTypes = { textUpdater: TextUpdaterNode, Keywords: KeywordsAndValues, Placeholder: placeholderAdd, Code: CodeBlockType, Continue: ContinueBtn, Doc: DocEditor, Next: NextStep };
const panOnDrag = [1, 2];




//for making new node -----------------------------------------
var id = 'initial'
var type:any = null
var data:any = { label: "new", name: "", forwhat: "" }
var color:any = "Black"
var x:any = 300
var y:any = 300
var draggable = true
var style: object
var addingnodes : boolean = true
interface Propsnew {
  Nid: string
  Ntype: string
  Ndata: object
  Nx: number
  Ny: number
  Ncolor: string
  Ndraggable: boolean;
  Nstyle: object;
  Naddingnodes: boolean
}
//using this from the TextUpdaterNode.js to set values and then click the addnode invisible btn to add a new node for extracted keywords or for whatever
export function setValuesandAdd({Nid, Ntype, Ndata, Nx, Ny, Ncolor, Ndraggable, Nstyle, Naddingnodes}: Propsnew) {
  id=Nid
  type=Ntype
  data=Ndata
  x=Nx
  y=Ny
  color=Ncolor
  draggable=Ndraggable
  style=Nstyle
  addingnodes=Naddingnodes
}




//for connecting nodes -----------------------------------------
var idWire = ''
var sourceNode = ''
var targetNode = ''
var animated = true
interface newWoreProps {
  NidWire: string
  NsourceNode: string
  NtargetNode: string
  Nanimated: boolean
}
export function setNodesForWire({NidWire, NsourceNode, NtargetNode, Nanimated}:newWoreProps) {
  idWire = NidWire
  sourceNode = NsourceNode
  targetNode = NtargetNode
  animated = Nanimated
}




//for removing nodes -------------------------------------------
var indexofnode:any
interface removeProps {
  Nindexofnode: number
}
export function setIndexToRemoveNode({Nindexofnode}:removeProps){
  indexofnode=Nindexofnode
}





//height and left of the last node -----------------------------
export var lastNodeHeight:any;
export var lastNodeLeft:any;
interface PropsNodes{
  H: Number
  L: Number
}
export function SaveLastNodeCords({H, L}: PropsNodes) {
  lastNodeHeight = H;
  lastNodeLeft = L;
}





//function to reset the page when user goes back and comes back in
export function resetCanvas(){
  //called from the Goingbackbtn.tsx
  addingnodes = true;
}




const App: React.FC = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  //clearing all nodes and edges before adding new for keywords
  const makeEmpty = useCallback(() => {
    setNodes((el:any) => {
      return [el[0]];
    });
    setEdges((el:any) => {
      return [];
    }); 
  }, []);


  //Loads the saved nodes from the mongodb
  function LoadSavedNodes() {

    var savedNodesfinal:any = []
    var savedEdgesfinal:any = []
    var savedPromptfinal:any = []
    var savedValuesfinal:any = []

    //gets the saved data from mongo
    async function name() {

      const {savedNodes} = await SavedDetails();
      savedNodesfinal.push(savedNodes);
      
      const {savedEdges} = await SavedEdgesdetails();
      savedEdgesfinal.push(savedEdges);
      
      const {savedPrompt} = await SavedPromptdetails();
      savedPromptfinal.push(savedPrompt);
      
      const {savedValues} = await SavedValuesdetails();
      savedValuesfinal.push(savedValues);

    }

    //printing them saved data    
    if(addingnodes){
      name();

      //prints the nodes that were saved in the DB
      setTimeout(() => {
        try {                 
          if(savedNodesfinal[0][0]){
            if(savedNodesfinal[0][0].length > 1){

              const looplength = savedNodesfinal[0][0].length;
              for (let index = 0; index < looplength; index++) {     
                
                setNodes((el:any) => {
                  return [
                    ...el,
                    savedNodesfinal[0][0][index],
                  ];
                });

                try {
                  const idofthekw = "V"+savedNodesfinal[0][0][index].data.id;
                  setTimeout(() => {
                  const textarea = document.getElementById(idofthekw) as HTMLTextAreaElement | null;
                  if (textarea) {
                    textarea.value = savedValuesfinal[0][0][savedNodesfinal[0][0][index].data.label];
                  }
                  }, 500);
                } catch (error) {}
                
              }

            }
          }
        } catch (error) {
          throw "loading saved issue, ignore";
        }
      }, 1000);

      //prints the edges that were saved in the DB
      setTimeout(() => {
        try {
          if(savedEdgesfinal[0][0]){
            if(savedEdgesfinal[0][0].length > 1){     

              for (let index = 0; index < savedEdgesfinal[0][0].length; index++) {
                try {

                  setEdges((el:any) => {
                    return [
                      ...el,
                      savedEdgesfinal[0][0][index],
                    ];
                  });

                } catch (error) {}            
              }

            }
          }
        } catch (error) {
          throw "loading saved issue, ignore";
        }
      }, 1000);
      addingnodes = false

      //set the saved prompt
      setTimeout(() => {
        try {
          const textarea = document.getElementById("text") as HTMLTextAreaElement | null;
          if (textarea) {
            textarea.value = savedPromptfinal[0][0][0];
          }
        } catch {
          throw "loading saved issue, ignore";
        }
      }, 1000);
      
    }

  }
  LoadSavedNodes();


  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );


  //adds node, called from a invisible btn below, btn clicked from loop using .click()
  const addNode = useCallback(() => {
    setNodes((el:any) => {
      return [
        ...el,
        {
          id: id,
          type: type,
          position: { x: x, y: y },
          data: data,
          style: style,
          draggable: draggable
        }
      ];
    });
  }, []);


  //adds wire, called from a invisible btn below, btn clicked from loop using .click()
  const connectNode = useCallback(() => {
    setEdges((el:any) => {
      return [
        ...el,
        { id: idWire, source: sourceNode, target: targetNode, animated: animated },
      ];
    });
  }, []);


  //removes a node at an index
  const removeNodeAtIndex = useCallback(() => {
    setNodes((el:any) => {
      const updatedNodes = [...el];
      updatedNodes.splice(indexofnode, 1); // Remove one element at the specified index
      return updatedNodes;
    });
  }, []);


  return (
    <div className="flowbox" style={{ height: "inherit" }}>

      <div
        style={{
          position: "fixed",
          backgroundColor: "white",
          width: "1000000px",
          height: "10000000px",
          marginTop: "-1000px",
          marginLeft: "-10000px",
        }}
      >
      </div>
      
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          panOnScroll
          selectionOnDrag
          panOnDrag={panOnDrag}
          selectionMode={SelectionMode.Partial}
          nodeTypes={nodeTypes}
        >

          <Controls style={{ position:'absolute', zIndex:9999 }} />
          <MiniMap nodeColor={nodeColor} nodeStrokeWidth={5} zoomable pannable />
          <Background variant={BackgroundVariant.Dots} color="#000000" gap={22} style={{ bottom: "auto" }} />

          {/* puts the invisible focus button that we can click after defining the index of the node to focus on using setFocusNode(index, zoomvalue), click using .click() */}
          <FocusNode />

        </ReactFlow>
        <button id="addNode" onClick={addNode} style={{position:'fixed'}}></button>
        <button id="makeEmpty" onClick={makeEmpty} style={{position:'fixed'}}></button>
        <button id="connectNode" onClick={connectNode} style={{position:'fixed'}}></button>
        <button id="removeNode" onClick={removeNodeAtIndex} style={{position:'fixed'}}></button>
      </ReactFlowProvider>

    </div>
  );
}





export default App;

//setNodes((el:any) => {}) 
//setNodes((prevNodes) => {}) 
// el - gets all the nodes that are currently in the canvas
// prevNodes - gets all the nodes that was in the canvas before adding recent nodes