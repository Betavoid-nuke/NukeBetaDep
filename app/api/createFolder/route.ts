import { NextRequest } from "next/server";
import * as fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from "next";
import { parseDocument } from 'htmlparser2';
import * as htmlToDocx from 'html-docx-js';



function blobToBuffer(blob: Blob): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(Buffer.from(reader.result));
      } else {
        reject(new Error('Failed to convert Blob to Buffer: ArrayBuffer is not available.'));
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(blob);
  });
}

function isBlob(data: Blob | Buffer): data is Blob {
  return data instanceof Blob;
}

//function is working but the document it is saving is not opening properly
async function Export(element: String, filepath: string): Promise<void> {
  
  var preHtml = "";
  var postHtml = "";
  var fullhtml = preHtml + element + postHtml;

  var blob = new Blob(['\ufeff', fullhtml], {
    type: 'application/msword'
  });

  // Convert the Blob to a buffer
  var bufferPromise = blob.arrayBuffer();
  bufferPromise.then(buffer => {
    setTimeout(() => {
      fs.writeFile(filepath, Buffer.from(buffer), (err) => {});
    }, 100);
  });
}

//function is working but the document it is saving is not opening properly
async function Export2Word(element: HTMLElement, filepath: string): Promise<void> {
  
  var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  var postHtml = "</body></html>";
  var fullhtml = preHtml + element + postHtml;

  var blob = new Blob(['\ufeff', fullhtml], {
    type: 'application/msword'
  });

  // Convert the Blob to a buffer
  var bufferPromise = blob.arrayBuffer();
  bufferPromise.then(buffer => {
    setTimeout(() => {
      fs.writeFile(filepath, Buffer.from(buffer), (err) => {});
    }, 100);
  });
}





export async function POST(req:any) {
  const sourceFilePath = path.join(process.cwd(), 'SpaceclaimEmpty', 'Design1.scdoc');
  const fileName = 'Design1.scdoc'; // Name of the file you want to copy

  const body = await req.json()  
  const folderNameA = body.folderName;
  const destinationFolderPath = path.join(process.cwd(), folderNameA);

  // Create destination folder if it doesn't exist
  fs.mkdirSync(destinationFolderPath, { recursive: true });

  const destinationFilePath = path.join(destinationFolderPath, fileName);

  // Copy the file to the new folder
  fs.copyFileSync(sourceFilePath, destinationFilePath);

  //save the documentation as docx
  const thenamed = body.folderName + ' - Documentation.docx.doc'
  const htmlelement = body.element;
  const fpath = path.join(destinationFolderPath, thenamed);
  Export2Word(htmlelement, fpath)

  //save the code genrated is py
  const thename = body.folderName + ' - CADScript.py'
  const gencode = body.GeneratedCode;
  const genpath = path.join(destinationFolderPath, thename);
  Export(gencode, genpath)

  //save the readme file
  const readme = 'readme.txt'
  const rmcode = body.readme;
  const rmpath = path.join(destinationFolderPath, readme);
  Export(rmcode, rmpath)


  console.log('Spaceclaim file created:', destinationFilePath);
  console.log('Documentation saved:', destinationFilePath);
  return new Response('File copied successfully', { status: 200 });
}






