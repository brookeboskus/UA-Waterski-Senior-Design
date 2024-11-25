import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); 

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;

export const fetchSheetData = async (sheetName: string): Promise<string[][] | null> => {
    try {11
        const response = await axios.get(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}?key=${API_KEY}`
        );
        return response.data.values; 
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        return null;
    }
};