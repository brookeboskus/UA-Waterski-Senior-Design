import axios from 'axios';

const API_KEY = 'AIzaSyDPIUXDDaAX_z4iA7423TtrmMSh0ZUYsDA'
const SPREADSHEET_ID = '1XxrLrv2y1YcQHswXKIG_yo-8WpX57zONek7PjeYMCG8'
const RANGE = 'Sheet1!A1:D10';

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
