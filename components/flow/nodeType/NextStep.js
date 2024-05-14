


import { useCallback, useRef } from 'react';
import { Background, Handle, Position } from 'reactflow';
import { Textarea } from "@/components/ui/textarea";
import { findKeywords } from "@/lib/AIFunctions/KeywordExtractor";
import { addNode, setIndexToRemoveNode, setNodes, setNodesForWire, setValuesandAdd } from "../index";
import Image from "next/image";
import { useStoreApi, useReactFlow } from 'reactflow';
import { NForNext, IndexForNext, calculatePosition } from './TextUpdaterNode';
import { Button } from '@mui/material';
import { any } from 'zod';
import { DoctoCode } from './DocEditor';
import {GeneratedCode} from "./DocEditor"
import { showNotification } from '@/components/popups/notification';
import { ToastAction } from '@/components/ui/toast';
import { GetProjectName } from '../getsaveddata';
import { toast } from "sonner"
import { createFolder } from "../../flow/Packing_utils/packingNode"



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

//this converts the html of the document editor and converts to docx and download it
function Export2Word(element) {
  var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  var postHtml = "</body></html>";
  var html = preHtml + element.innerHTML + postHtml;

  var blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
  });

  // Specify link url
  var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

  var filename='';
  //getting the name of the project and if that is available then use that name or just use the placeholder
  async function SetName(){ 
    const name = await GetProjectName();
    filename = name.Name + ".docx.doc";
  }
  SetName();

  setTimeout(() => {
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      // For Internet Explorer or Edge
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // For other browsers
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
    document.body.removeChild(downloadLink);
  
  }, 1000);

}

//takes the generated code and downloads it as python file
function Export2Python(codeString) {
  // Create a Blob containing the Python code
  var blob = new Blob([codeString], {
    type: 'text/x-python'
  });

  // Specify link url
  var url = URL.createObjectURL(blob);

  var filename='';
  //getting the name of the project and if that is available then use that name or just use the placeholder
  async function SetName(){ 
    const name = await GetProjectName();
    filename = name.Name + ".py";
  }
  SetName();

  setTimeout(() => {
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      // For Internet Explorer or Edge
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // For other browsers
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      // Trigger the download
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }, 1000);
}





var once = true;
function NextStep({ data, isConnectable }) {

  //this gets all the nodes currently in the canvas
  const store = useStoreApi();
  const { nodeInternals } = store.getState();
  const nodes = Array.from(nodeInternals).map(([, node]) => node);

  //use for printing the new node below the last one which most near to the bottomm
  const heighest_height_node = getObjectWithHighestYPosition(nodes);//heighest hight of that a node on screen have.
  const yfornow = heighest_height_node.position.y+150;
  var ifdoc = false;
  var ifcode = false;
  if (data.forwhat === "doc") {
        ifdoc = true;
        ifcode = false;
  } else if (data.forwhat === "codeblock") {
        ifcode = true;
        ifdoc = false;
  }

  //popup for letting user know that code is copied to clipboard
  function showPop(title, description) {
    toast(title, {
      description: description
    })
  }
  //print the popup messages
  if(ifdoc) {
    setTimeout(() => {
      if(once){
        showPop("Documentation generated successfully!", "Ready for downloading and/or packing");
        once=false
      }
    }, 500);
  } 
  if (ifcode){
      if(!ifdoc){once=true}
      setTimeout(() => {
        if(once){
          showPop("Code generated successfully!", "Copied the CAD code to clipboard");
          setTimeout(() => {
            showPop("Ready for download", "You can down the generated file and run it in Ansys Spaceclaim.");
          }, 500);
          once=false
        }
      }, 500);
  }

  //copy the generated code into the clipboard of the user
  function copyToClipboard() {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = GeneratedCode;
  
    // Append the textarea to the DOM
    document.body.appendChild(textarea);
  
    // Select the text within the textarea
    textarea.select();
  
    // Execute the copy command
    document.execCommand('copy');
  
    // Remove the textarea from the DOM
    document.body.removeChild(textarea);
  }
  
  //download the document as docx file
  function downloadDocx() {
    const doc = document.getElementById('editor');
    if (doc instanceof HTMLDivElement) {
      Export2Word(doc);
    }
  }
  
  //download the code as py file
  function downloadCode() {
    if (GeneratedCode) {
      Export2Python(GeneratedCode);
    }
  }

  async function createFolderfunc(){
    const nameoftheproject = await GetProjectName();
    const doc = document.getElementById('editor');
    var editorCopy = doc.cloneNode(true);

    const readmecont = "Open the Spaceclaim file, go to design tab, open script section, and copy paste the code in the python file and run it."

    createFolder(nameoftheproject, GeneratedCode, editorCopy, readmecont);
  }
  
  return (
      <div className="NextStep" style={{overflow:'hidden', height:'auto'}}>
        <div className='text-black flex flex-row' style={{padding:'5px', width:'1000px'}}> 

          {/* download btn */}
          {ifcode && (
            <Button type='primary' onClick={downloadCode} style={{width:'inherit', zIndex:'9999', color:'black', fontWeight:'normal', fontSize:'16px', padding:'5px', margin:'10px', border:'2px solid', borderRadius:'20px' }}>Download</Button>
          )}
          {ifdoc && (
            <Button type='primary' onClick={downloadDocx} style={{width:'inherit', zIndex:'9999', color:'black', fontWeight:'normal', fontSize:'16px', padding:'5px', margin:'10px', border:'2px solid', borderRadius:'20px' }}>Download</Button>
          )}
          
          <Button type='primary' style={{width:'inherit', zIndex:'9999', color:'black', fontWeight:'normal', fontSize:'16px', padding:'5px', margin:'10px', border:'2px solid', borderRadius:'20px' }} disabled>Regenerate</Button>
          
          {/* Special btn specific to doc and code */}
          {ifdoc && (
            <Button type='primary' onClick={DoctoCode} style={{width:'inherit', zIndex:'9999', color:'black', fontWeight:'normal', fontSize:'16px', padding:'10px', margin:'10px', border:'2px solid', borderRadius:'20px' }}>Continue</Button>
          )}
          {ifcode && (
            <Button type='primary' onClick={copyToClipboard("GeneratedCode")} style={{width:'inherit', zIndex:'9999', color:'black', fontWeight:'normal', fontSize:'16px', padding:'10px', margin:'10px', border:'2px solid', borderRadius:'20px' }}>Copied</Button>
          )}

        </div>

        {ifcode && (
          <div className='text-black flex flex-row' style={{padding:'5px', width:'1000px', display:'flex', justifyContent:'center', marginTop:'50px', fontSize:'22px', fontWeight:'400'}}>
            Download Project Files and build the component in Ansys Spaceclaim.
          </div>
        )}

        {ifcode && (
          <div className='text-black flex flex-row' style={{padding:'5px', width:'1000px'}}>
            <Button type='primary' onClick={createFolderfunc} style={{width:'inherit', zIndex:'9999', color:'black', fontWeight:'normal', fontSize:'16px', padding:'5px', margin:'10px', border:'2px solid', borderRadius:'20px' }}>Download Project files</Button>
          </div>
        )}

      </div>
  );
}

//when continue is hit for printing the doc editor, the node placeholder should be removed.
//make the code to save all the generated stuff
//make the code to send the user input to the AI engine and then read the output file when going from the doc to code


export default NextStep;














