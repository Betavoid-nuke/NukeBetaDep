
"use server"

import axios from 'axios';
import * as fs from 'fs';
const { htmlToDocx } = require('html-to-docx');


async function callApi() {

  //mock data for test
  const data = {
      prompt: "Create a stainless steel gear that fits in a 100mm x 100mm x 15mm volume, can handle 2400 Nm of torque, and costs less than $50 per unit, for a bicycle gear box.",
      input: {
        volume: [100, 100, 15],
        torque: 2400,
        torque_unit: "Nm",
        material: "stainless_steel",
        budget: 50,
        price_unit: "$",
        product: "gearbox",
        of: "bike",
        volume_unit: "mm",
        code: "james_quote.py"
      }
  };

  try {
    const response = await axios.post('https://nuke-ai.vercel.app/run-main', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('response - ', response.data);
  } catch (error: any) {
    if (error.response) {
      console.log('error response - ', error.response.data);
    } else {
      console.log('error - ', error.message);
    }
  }

}

//not using anymore, as deployed microservice on vercel
// export async function callPythonAPI() {
//   try {
//     // const response = await axios.get('https://nuke-ai.vercel.app/run-main');
//   } catch (error) {
//     console.error('Error calling Python API:', error);
//   }
// }

export async function readPyFile() {

  console.log(await callApi());
  const GeneratedCode = fs.readFileSync('AIEngine/outputs/new/output_cad_code.py','utf8');
  return GeneratedCode

}












