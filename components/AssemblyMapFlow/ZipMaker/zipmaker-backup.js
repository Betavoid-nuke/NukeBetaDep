
import { addFileToFolder, copyFileToFolder } from '../AMFUtils-backup';
import { makethezip } from '../AMFUtils';
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

// Function to create zip folder structure recursively
async function createZipStructure(data, parentFolder, zip) {

    const theparentfolder = {};
    for (let i = 0; i < data.length; i++) {

        const entry = data[i];
        const folderName = entry.data.label; // Using data.label as folder name
        const parentNode = entry.parentNode;

        if (parentNode) {
            const parentEntry = data.find(item => item.id === parentNode);
            const parentFolderName = parentEntry.data.label; //name of the parent folder in which current folder will go
            const parentFolder = theparentfolder[parentFolderName];
            
            //making a folder for the node
            const folder = parentFolder.folder(folderName);
            theparentfolder[folderName] = folder;

            //putting an empty spaceclaim project in the folder
            const folderPath = '../../../SpaceclaimEmpty';
            const fileName = 'Design1.scdoc';
            await addFileToFolder(`${folderPath}/${fileName}`, folder, fileName);

            // Create a spaceclaim file
            folder.file(`${folderName}.scdoc`, '', { createFolders: false });

        } else {

            const folder = parentFolder.folder(folderName);
            theparentfolder[folderName] = folder

            // Create a spaceclaim file
            folder.file(`${folderName}.scdoc`, '', { createFolders: false });

        }

    }    

}

// Create and populate zip file
function createZipFile(data) {

    const zip = new JSZip();

    createZipStructure(data, zip, zip);

    return zip;
}

// Function to prompt user for download location
function downloadZip(zip) {
    zip.generateAsync({ type: "blob" }).then(function(content) {
        // Trigger download
        const link = document.createElement('a');
        link.download = 'folder_structure.zip';
        link.href = URL.createObjectURL(content);
        link.click();
    });
}

export function tryzip() {
    // Create zip file and download
    const zip = createZipFile(parseStringToArray(jsonData));
    downloadZip(zip);
}