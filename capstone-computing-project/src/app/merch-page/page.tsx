"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { fetchSheetData } from "../googlesheetservices";

export default function MerchPage() {
    const [image2A, setImage2A] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [sheetData, setSheetData] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // fetching data from Google Sheets
        const getData = async () => {
            try {
                const data = await fetchSheetData("MerchPage");
                if (data) {

                    const image2AUrl = data[1][0];
                    if (image2AUrl?.startsWith("http")){
                        setImage2A(image2AUrl);
                    } else {
                        setImage2A(null);
                    }

                } else {
                    setSheetData([]);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching sheet data:", err);
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        getData();
    }, []);


    return (
        <div className="min-h-screen flex flex-col">

            <Link href = "/">
                {image2A && (
                    <img 
                        src = {image2A}
                            alt = "Image from 2A"
                                    
                                className = "h-200px w-200px md:h-250px md:w-250px lg:h-300px lg:w-300px max-w-full object-contain mr-20"
                            />
                )}
            </Link>

            <main className="flex-grow">
                <h1 className="text-black text-center"> This will be for merch page </h1>
            
                    
            </main>
        </div>
    );
}
