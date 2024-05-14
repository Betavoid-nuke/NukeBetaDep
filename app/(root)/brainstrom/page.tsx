"use client"

import React from "react";
import ReactFlow, { Controls, Panel } from 'reactflow';
import 'reactflow/dist/style.css';

const page = () => {
  return (
    <div className="text-light-1">

      <div
        style={{
          position: "fixed",
          backgroundColor: "white",
          width: "1000000px",
          height: "10000000px",
          marginTop: "-1000px",
          marginLeft: "-10000px",
        }}
      ></div>

      <ReactFlow>
        <Controls showInteractive={false} />
        <Panel position="top-left">React Flow Mind Map</Panel>
      </ReactFlow>

    </div>
  );
};

export default page;



 
