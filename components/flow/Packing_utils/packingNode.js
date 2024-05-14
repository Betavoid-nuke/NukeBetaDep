// Function to create a folder
export function createFolder(folderName, GeneratedCode, element, readme) {
    const therealHTML = element.innerHTML;

    return new Promise((resolve, reject) => {
        fetch('/api/createFolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Setting content type to JSON
            },
            body: JSON.stringify({ folderName: folderName, GeneratedCode: GeneratedCode, element: therealHTML, readme: readme }) // Sending folderName as JSON in the request body
        })
    });
}
