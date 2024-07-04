
"use server"

interface props {
    title: string
}

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getDate20DaysAgo() {
    const now = new Date();
    now.setDate(now.getDate() - 18);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

console.log(getCurrentDate()); // Outputs the current date in YYYY-MM-DD format
console.log(getDate20DaysAgo()); // Outputs the date 20 days before the current date in YYYY-MM-DD format



async function GetNewsFromApi({ title }: props) {

    const thedate = getDate20DaysAgo(); //2024-06-10

    const url = `https://newsapi.org/v2/everything?q=${title}&from=${thedate}&sortBy=popularity&apiKey=${process.env.NEWSAPI}`;
    const req = new Request(url);

    try {
        
        const response = await fetch(req);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const theOP = await response.json();
        
        return theOP;

    } catch (error) {

        console.error('Fetch error:', error);
        return null;
    }
}

export default GetNewsFromApi;