
"use server"

import fs from 'fs';
import JSZip from 'jszip';

// Function to read a file from a given path
function readFile(filePath: string): Promise<Buffer> {
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
export async function addFileToFolder(filePath: string, folderin: JSZip, fileName: string): Promise<void> {
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

// Example usage:
const folderPath = './path/to/your/folder';
const fileName = 'example.txt'; // Assuming your file is named example.txt

// addFileToFolder(`${folderPath}/${fileName}`, 'example_folder', fileName);
