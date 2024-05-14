import { useCallback, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { Textarea } from "@/components/ui/textarea";
import { findKeywords } from "@/lib/AIFunctions/KeywordExtractor";
import { addNode, setNodes, setValuesandAdd } from "../index";

//used from the TextUpdaterNode.js in the loop for printing the keywords nodes, used in the Ntype="" inside the funciton setValuesandAdd() 

function KeywordsAndValues({ data, isConnectable }) {

  var prompt='';
  const onChange = useCallback((evt) => {
    prompt = evt.target.value;
  }, []);

  return (
    <div className={`text-updater-node`} style={{overflow:'hidden', height:'auto'}}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <Textarea id="tabel" value={data.label} className="keywords nodrag" name="text" onChange={onChange} style={{width:'95%', color:'black', minHeight:'1px', height:'40px', fontSize:'2px !Important', margin:'5px', backgroundColor:'white', overflow:'hidden', border: 'none', resize:'none'}} />
        <div className='flex row'>
          
          <div className='flex-col'>
            <div className='text-black ml-1' style={{color:'black', fontSize:'10px', fontWeight:'normal'}}>Value</div>
            <Textarea id={"V"+data.id} className="keywords nodrag" name="text" onChange={onChange} style={{width:'100px', color:'black', minHeight:'1px', height:'30px', fontSize:'4px !Important', margin:'5px', backgroundColor:'#f8f8f8', overflow:'hidden'}} />
          </div>

          <div className='flex-col'>
            <div className='text-black ml-1' style={{color:'black', fontSize:'10px', fontWeight:'normal'}}>Unit</div>
            <Textarea id={"U"+data.id} className="keywords nodrag" name="text" onChange={onChange} style={{width:'100px', color:'black', minHeight:'1px', height:'30px', fontSize:'4px !Important', margin:'5px', backgroundColor:'#f8f8f8', overflow:'hidden'}} />
          </div>

        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} id="R" isConnectable={isConnectable} />
    </div>
  );
  
}

export default KeywordsAndValues;
