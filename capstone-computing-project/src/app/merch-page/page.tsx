"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { fetchSheetData } from "../googlesheetservices";

export default function MerchPage() {
    const [image2A, setImage2A] = useState<string | null>(null);
    const [sheetData, setSheetData] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [merchLabels, setMerchLabels] = useState<string[]>([]);
    const [merchPrices, setMerchPrices] = useState<string[]>([]);

    // Set page title
    useEffect(() => {
        document.title = 'UA Waterski - Merch';
    }, []);

    useEffect(() => {
        // fetching data from Google Sheets
        const getData = async () => {
            try {
                const data = await fetchSheetData("MerchPage");
                if (data) {

                    const imageUrls = data
                        .filter((row) => row[0]?.startsWith("http"))
                        .map((row) => row[0])
                    setSheetData(imageUrls.slice(1));

                    const merchLabels = data.map((row) => row[1]);
                    setMerchLabels(merchLabels.slice(3));

                    const merchPrices = data.map((row) => row[2]);
                    setMerchPrices(merchPrices.slice(3));

                    // console.log(sheetData);

                    const image2AUrl = data[1][0];
                    if (image2AUrl?.startsWith("http")) {
                        setImage2A(image2AUrl);
                    } else {
                        setImage2A(null);
                    }

                } else {
                    setSheetData([]);
                }
            } catch (err) {
                console.error("Error fetching sheet data:", err);
                setError("Failed to fetch data");
            }
        };

        getData();
    }, []);



    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {image2A && (
                <img
                    src={image2A}
                    alt="Image from 2A"
                    className="h-200px w-200px md:h-250px md:w-250px lg:h-300px lg:w-300px max-w-full object-contain"
                />
            )}

            <h2 className="text-2xl font-bold text-center mt-10" style={{ color: '#9E1B32' }}>Alabama Waterski Team Merchandise</h2>

            {/* Section for smaller images */}
            <div className="flex flex-wrap justify-center space-x-20 mt-10">
                {!error && sheetData && sheetData.length > 0 && sheetData.slice(0).map((imageUrl, index) => (
                    <Link key={index} href="#" className="flex flex-col flex-shrink-0 w-1/4 pointer-events-none"> {/* added pointer-events-none for now disabling clicking images. currently takes to homepage, but taking link element requires href. can add external link later in href */}

                        <img
                            src={imageUrl}
                            alt={`Image ${index + 2}`}
                            className="h-full w-auto object-contain"
                        />
                        <div className="flex flex-col">
                            <p className="mt-2 text-md text-black">{merchLabels[index + 1]}</p> {/* Label under each image */}
                            <p className="mt-2 mb-20 text-md text-black">{merchPrices[index + 1]}</p> {/* Label under each image */}
                        </div>
                    </Link>

                ))}
            </div>

        </div>
    );
}