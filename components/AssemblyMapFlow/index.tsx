
"use client"

import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  ConnectionLineType,
  NodeOrigin,
  Node,
  OnConnectEnd,
  OnConnectStart,
  useReactFlow,
  useStoreApi,
  Controls,
  Panel,
  ReactFlowProvider,
} from 'reactflow';
import shallow from 'zustand/shallow';
import MindMapNode from './MindMapNode';
import MindMapEdge from './MindMapEdge';
import 'reactflow/dist/style.css';
import { create } from 'zustand'
import {
  Edge,
  EdgeChange,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  XYPosition,
} from 'reactflow';
import { nanoid } from 'nanoid/non-secure';
import { NodeData } from './MindMapNode';
import { Button } from '@/components/ui/button';
import { setJSONData, tryzip } from './ZipMaker/zipmaker';
import axios from 'axios';
import { callPythonAPI } from '@/lib/AIAPI/AIcall';
import DocEditor from '../DocEditor/DocEditor';
// import axios from '../../app/api/AIAPI/AIcall';

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNode: state.addChildNode,
});

const nodeTypes = {
  mindmap: MindMapNode,
};

const edgeTypes = {
  mindmap: MindMapEdge,
};

const nodeOrigin: NodeOrigin = [0.5, 0.5];

const connectionLineStyle = { stroke: '#F6AD55', strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };

export type RFState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  updateNodeLabel: (nodeId: string, label: string) => void;
  addChildNode: (parentNode: Node, position: XYPosition) => void;
};

export const useStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: 'root',
      type: 'mindmap',
      data: { label: 'React Flow Mind Map' },
      position: { x: 0, y: 0 },
      dragHandle: '.dragHandle',
    },
  ],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  updateNodeLabel: (nodeId: string, label: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, label };
        }

        return node;
      }),
    });
  },
  addChildNode: (parentNode: Node, position: XYPosition) => {
    const newNode = {
      id: nanoid(),
      type: 'mindmap',
      data: { label: 'New Node' },
      position,
      dragHandle: '.dragHandle',
      parentNode: parentNode.id,
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
    };

    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge],
    });
  },
}));







//Button functions ______________________________________
function onClickGen(){
  setJSONData(NodesInJSON);
  tryzip();
}

//calling API of AI Engine
function TEST(){
  callPythonAPI();
}







//just the style
const componentStyles = `
        /* assembly map styling */
        .react-flow__node-mindmap {
            background: white;
            border-radius: 2px;
            border: none;
            padding: 6px 10px;
            font-weight: 700;
        }

        .react-flow__handle.target {
            top: 50%;
            pointer-events: none;
            opacity: 0;
        }

        .react-flow__handle.source {
            top: 0;
            left: 0;
            transform: none;
            background: #c4c4c4;
            height: 100%;
            width: 100%;
            border-radius: 2px;
            border: none;
        }

        .react-flow .react-flow__connectionline {
            z-index: 0;
        }

        .inputWrapper {
            display: flex;
            height: 20px;
            z-index: 1;
            position: relative;
            pointer-events: none;
        }

        .dragHandle {
            background: transparent;
            width: 14px;
            height: 100%;
            margin-right: 4px;
            display: flex;
            align-items: center;
            pointer-events: all;
        }

        .input {
            border: none;
            padding: 0 2px;
            border-radius: 1px;
            font-weight: 700;
            background: transparent;
            height: 100%;
            color: #222;
            pointer-events: none;
        }

        .input:focus {
            border: none;
            outline: none;
            background: rgba(255, 255, 255, 0.25);
            pointer-events: all;
        }
    `;

var NodesInJSON:any = []; //storing all nodes in json formate, with id and parent id
function Flow() {

  const store = useStoreApi();
  const { project } = useReactFlow();

  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode } = useStore(
    selector,
    shallow
  );
  const connectingNodeId = useRef<string | null>(null);

  const getChildNodePosition = (event: MouseEvent | TouchEvent, parentNode?: Node) => {
    const { domNode } = store.getState();

    if (
      !domNode ||
      !parentNode?.positionAbsolute ||
      !parentNode?.width ||
      !parentNode?.height
    ) {
      return;
    }

    const { top, left } = domNode.getBoundingClientRect();

    let clientX;
    let clientY;

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (event instanceof TouchEvent) {
      // For TouchEvent, use the first touch
      const touch = event.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      // Event is neither MouseEvent nor TouchEvent, handle accordingly
      return;
    }


    const panePosition = project({
      x: clientX - left,
      y: clientY - top,
    });

    return {
      x: panePosition.x - parentNode.positionAbsolute.x + parentNode.width / 2,
      y: panePosition.y - parentNode.positionAbsolute.y + parentNode.height / 2,
    };

  };

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    // we need to remember where the connection started so we can add the new node to the correct parent on connect end
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd: OnConnectEnd = useCallback(
    (event) => {
      const { nodeInternals } = store.getState();
      const targetIsPane = (event.target as Element).classList.contains(
        'react-flow__pane'
      );
      const node = (event.target as Element).closest('.react-flow__node');

      if (node) {
        node.querySelector('input')?.focus({ preventScroll: true });
      } else if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodeInternals.get(connectingNodeId.current);
        const childNodePosition = getChildNodePosition(event, parentNode);

        if (parentNode && childNodePosition) {
          addChildNode(parentNode, childNodePosition);
        }
      }
    },
    [getChildNodePosition]
  );

  const [nodesJson, setNodesJson] = useState<string>('');
  // Function to get JSON structure of nodes
  const getNodesJson = () => {
    const nodesJsonString = JSON.stringify(nodes, null, 2);
    NodesInJSON = nodesJsonString;
    setNodesJson(nodesJsonString);
  };
  // Update JSON when nodes change
  useEffect(() => {
    getNodesJson();
  }, [nodes]);
  

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodeOrigin={nodeOrigin}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineStyle={connectionLineStyle}
      connectionLineType={ConnectionLineType.Straight}
      fitView
    >
    </ReactFlow>
  );

}

// wrapping with ReactFlowProvider is done outside of the component
function FlowWithProvider() {

  return (
    <ReactFlowProvider>

      <style>{componentStyles}</style>

      <Flow />
      
      {/* Generate the assembly */}
      <div className="text-light-1" style={{ position: 'fixed', bottom: '0', right: '0', padding:"50px" }}>
        <Button variant="outline" className="AssemblyBtn">Generate Assembly</Button>
      </div>

      {/* Download folder structure */}
      <div className="text-light-1" style={{ position: 'fixed', bottom: '0', right: '300px', padding:"50px" }}>
        <Button onClick={onClickGen} variant="outline" className="AssemblyBtn">Download Files</Button>
      </div>

      {/* TEST */}
      <div className="text-light-1" style={{ position: 'fixed', bottom: '0', right: '550px', padding:"50px" }}>
        <Button onClick={TEST} variant="outline" className="AssemblyBtn">TEST</Button>
      </div>

    </ReactFlowProvider>
  );
}
 
export default FlowWithProvider;
