"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { fetchSheetData } from "../googlesheetservices";

export default function TeamNewsPage(){
    //const [image2A, setImage2A] = useState<string | null>(null);
    //const [sheetData, setSheetData] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [headerPhoto, setHeaderPhoto] = useState<string | null>(null);
    const [newsLetterHeader, setNewsLetterHeader] = useState<string[]>([]);
    const [newsLetterImg, setNewsLetterImg] = useState<string[]>([]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);


    //const [merchPrices, setMerchPrices] = useState<string[]>([]);

    useEffect(() => {
        // fetching data from Google Sheets
        const getData = async () => {
            try {
                const data = await fetchSheetData("TeamNewsPage");
                if (data) {

                    // const imageUrls = data
                    //     .filter((row) => row[0]?.startsWith("http"))
                    //     .map((row) => row[0])
                    // setNewsLetterHeader(imageUrls.slice(1));

                    // const imageUrls = data
                    //     .filter((row) => row[0]?.startsWith("http"))
                    //     .map((row) => row[0])
                    // setNewsLetterImg(imageUrls.slice(2));

                    const newsLetterHeader = data.map((row) => row[0]);
                    setNewsLetterHeader(newsLetterHeader.slice(3));

                    const newsLetterImg = data.map((row) => row[1]);
                    setNewsLetterImg(newsLetterImg.slice(3));

                    // console.log(sheetData);

                    const headerPhoto = data[1][0];
                    if (headerPhoto?.startsWith("http")) {
                        setHeaderPhoto(headerPhoto);
                    } else {
                        setHeaderPhoto(null);
                    }

                } else {
                    setNewsLetterHeader([]);
                }
            } catch (err) {
                console.error("Error fetching sheet data:", err);
                setError("Failed to fetch data");
            }
        };

        getData();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12"> 
                    <h1 className="text-5xl font-extrabold text-[#9E1B32] mb-6">Team News Page Coming Soon!</h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        this is a snippet about how the team wants to share our news letter with you
                    </p> 
                </div>

                <div className="border-t border-[#9E1B32] my-12"></div>
               
                <div className="flex flex-col space-y-6 mt-10">
                    {!error && newsLetterHeader && newsLetterHeader.length > 0 && 
                        newsLetterHeader.slice(0).map((imageUrl, index) => (
                            <div key={index} className="flex flex-col items-start w-full">
                                {/* Header that toggles the expansion */}
                                <button 
                                    className="text-md text-black text-left w-full flex items-center justify-between focus:outline-none"
                                    onClick={() =>
                                        setExpandedIndex((prev) => (prev === index ? null : index))
                                    }
                                >
                                    <p>{newsLetterHeader[index + 1]}</p>
                                    <span className="text-gray-500">
                                        {expandedIndex === index ? '-' : '+'}
                                    </span>
                                </button>
                                {/* Expandable Content */}
                                {expandedIndex === index && (
                                    <div className="flex justify-center w-full mt-2">
                                        <img
                                            src={imageUrl}
                                            alt={`Image ${index + 2}`}
                                            className="h-auto w-auto object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div>

            </section>
        </div>


    );
}