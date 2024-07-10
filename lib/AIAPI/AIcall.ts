
"use server"

import axios from 'axios';
import * as fs from 'fs';
const { htmlToDocx } = require('html-to-docx');
// import * as fs from '../../AIEngine/outputs/new/output_cad_code.py';

//to get output from the ai engine, first you need to start it.. 
//Cd into the AIEngine and then run this: python app.py
// i have automated this, so when you run npm run dev, it automatically starts both servers.
//so chill, if you already ran npm start dev, both are running and you can call the function below

export async function callPythonAPI(): Promise<void> {
  try {
    const response = await axios.get('http://localhost:5000/run-main');
    console.log('Response from Python server:', response.data);
  } catch (error) {
    console.error('Error calling Python API:', error);
  }
}

export async function readPyFile() {

  const GeneratedCode = fs.readFileSync('AIEngine/outputs/new/output_cad_code.py','utf8');
  return GeneratedCode

}












