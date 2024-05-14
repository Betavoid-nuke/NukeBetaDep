

export function parseSentence(input: string, keywords: string[]): { [key: string]: any } {
    const parsedData: { [key: string]: any } = {};

    // Regular expression pattern to match numbers with optional units
    const pattern = /(\d+(\.\d+)?)(?:\s*(?:mm|nm)?)?/;

    // Split the input sentence into words
    const words = input.toLowerCase().split(/\s+/);

    // Iterate over each word
    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        // Check if the word matches any of the keywords
        if (keywords.includes(word)) {
            // Look for a numeric value nearby
            for (let j = i - 1; j >= 0; j--) {
                const match = words[j].match(pattern);
                if (match && match[1] !== undefined) {
                    parsedData[word] = parseFloat(match[1]);
                    break;
                }
            }
            // If numeric value not found before, look after the keyword
            if (!parsedData[word]) {
                for (let j = i + 1; j < words.length; j++) {
                    const match = words[j].match(pattern);
                    if (match && match[1] !== undefined) {
                        parsedData[word] = parseFloat(match[1]);
                        break;
                    }
                }
            }
        }
    }

    return parsedData;
}


