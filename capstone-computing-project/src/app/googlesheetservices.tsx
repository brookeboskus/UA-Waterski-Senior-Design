import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // this loads the defined variables in .env file

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const RANGE = process.env.NEXT_PUBLIC_RANGE;

console.log('API_KEY:', API_KEY);
console.log('SPREADSHEET_ID:', SPREADSHEET_ID);
console.log('RANGE:', RANGE);

export const fetchSheetData = async (): Promise<string[][] | null> => {
    try {
        const response = await axios.get(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        return response.data.values; 
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        return null;
    }
};
