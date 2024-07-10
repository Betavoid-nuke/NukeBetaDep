
import { Handle, Position } from 'reactflow';
import CodeBlock from "../../CodeViewer/CodeViewer"
import React, { useState, useEffect } from 'react';
import {GeneratedCode} from "./DocEditor"

function CodeBlockType({ data, isConnectable }) {
  
  return (
    <div id='doceditor' className="doceditornode" style={{ overflow: 'hidden', height: 'auto' }}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div id='codeblock' style={{maxHeight:'1000px', overflow:'auto', overflowY:'scroll'}}>
        <label htmlFor="text" className='mt-1'>Generated Code for Anysis SpaceClaim:</label>
        <div>
        <CodeBlock language="python" code={GeneratedCode} />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default CodeBlockType;
