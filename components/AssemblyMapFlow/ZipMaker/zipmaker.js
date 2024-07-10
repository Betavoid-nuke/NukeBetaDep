
import { makethezip } from '../AMFUtils'
const path = require('path');
// const path = require('../../../SpaceclaimEmpty');
const JSZip = require('jszip');


//the jason that we set from the index, that is a string, this func converts it to a array of objects
function parseStringToArray(stringData) {
    try {
        // Parsing the string into JSON
        const jsonData = JSON.parse(stringData);
        
        // Checking if the parsed data is an array
        if (!Array.isArray(jsonData)) {
            throw new Error("The parsed data is not an array.");
        }

        // Returning the parsed array
        return jsonData;
    } catch (error) {
        console.error("Error parsing string:", error.message);
        return [];
    }
}

var jsonData;
export function setJSONData(data) {
    jsonData = data;
}

// Function to prompt user for download location
function downloadZip(zip) {
    console.log("____________________________________________________________________________________");
    console.log(zip);
    zip.generateAsync({ type: "blob" }).then(function(content) {
        // Trigger download
        const link = document.createElement('a');
        link.download = 'folder_structure.zip';
        link.href = URL.createObjectURL(content);
        link.click();
    });
}






//not working still, making stuff asyc and await not working





export async function tryzip() {
    // Create zip file and download
    const zip = await makethezip(parseStringToArray(jsonData));
    downloadZip(zip);
}