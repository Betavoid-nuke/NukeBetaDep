
"use server"

const path = require('path');
// const path = require('../../SpaceclaimEmpty');
const JSZip = require('jszip');





// Function to read a file from a given path
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        // Read the file asynchronously
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(data);
        });
    });
}

// Function to create a folder and add a file to it using JSZip
async function addFileToFolder(filePath, folderin, fileName) {

    // Create a new instance of JSZip
    const zip = new JSZip();

    try {
        // Read the file from the given path
        const fileContent = await readFile(filePath);

        // Create a new folder in the zip file
        const folder = folderin;

        // Add the file to the folder
        if (folder) {
            folder.file(fileName, fileContent);
        } else {
            // Handle case when folderin is not provided
        }

        // Generate the zip file
        const content = await zip.generateAsync({ type: 'nodebuffer' });

        // Write the generated zip file to disk
        fs.writeFile('example.zip', content, err => {
            if (err) {
                console.error(err);
            } else {
                console.log('Zip file created successfully.');
            }
        });
    } catch (err) {
        console.error(err);
    }

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
            const folderPath = '../../SpaceclaimEmpty';
            const fileName = 'Design1.scdoc';
            await addFileToFolder(`${folderPath}/${fileName}`, folder, fileName);

            // Create a spaceclaim file
            folder.file(`${folderName}.scdoc`, '', { createFolders: false });

        } else {

            const folder = parentFolder.folder(folderName);
            theparentfolder[folderName] = folder;

            // Create a spaceclaim file
            folder.file(`${folderName}.scdoc`, '', { createFolders: false });

        }

    }    

}

export async function makethezip(data) {
    const zip = new JSZip();
    await createZipStructure(data, zip, zip);
    return zip;
}




