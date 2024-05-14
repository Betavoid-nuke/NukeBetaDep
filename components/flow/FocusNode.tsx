"use client"

import React, { useEffect, useState } from 'react';
import { useStoreApi, useReactFlow, Panel } from 'reactflow';

//WHAT IS THIS?
//puts a invisible button in DOM that we click when we wanna focus on a node, which node to focus on is defined by calling
//setFocusNode and putting the index of the node and the value of the zoom and then using .click() to zoom on that node

var nodeIndex: any;
var zoomValue: any;
export function setFocusNode(nodeIndexIn: number, zoomValueIn: number) {
  nodeIndex = nodeIndexIn;
  zoomValue = zoomValueIn;
}

function FocusNode() {


  const panelStyle = {
    color: '#777',
    fontSize: 12,
  };

  const buttonStyle = {
    fontSize: 12,
    marginRight: 5,
    marginTop: 5
  };

  const store = useStoreApi();
  const { setCenter } = useReactFlow();

  const focusNode = () => {
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);
    const node = nodes[nodeIndex];
    if (node && node.width != null && node.height != null) {

      const x = node.position.x + node.width / 2;
      const y = node.position.y + node.height / 2;
      const zoom = zoomValue;
      setCenter(x, y, { zoom, duration: 1000 });

    } else {
      console.error("Node or its width property is null or undefined.");
    }

  };

  return (
    <Panel position="top-left" style={{display:'none'}}>
        <button id='focus1' onClick={focusNode} style={buttonStyle}>
        </button>
    </Panel>
  );

};

export default FocusNode
