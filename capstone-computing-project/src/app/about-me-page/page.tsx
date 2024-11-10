//temporary page 
"use client";

import { useEffect, useState } from 'react';
import { fetchSheetData } from '../googlesheetservices'; // Same folder


export default function AboutMe() {
    const [sheetData, setSheetData] = useState<string[][] | null>(null);
    
    useEffect(() => {
        const getData = async () => {
            const data = await fetchSheetData("AboutMe");
            if (data) {
                setSheetData(data);
            }
        };

        getData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            
            {/* About Team Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-[#49A097] mb-6">
                        About Waterski
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Hi, []!
                    </p>
                </div>
                
                <div className="flex flex-wrap justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
                    {/* Personal Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
                        <h2 className="text-3xl font-bold text-[#49A097] mb-4">Background</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We []
                        </p>
                    </div>

                    {/* Professional Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
                        <h2 className="text-3xl font-bold text-[#49A097] mb-4">Another Section</h2>
                        <p className="text-gray-700 leading-relaxed">
                            TEMP
                        </p>
                    </div>
                </div>
            </section>

            {/* Data Display Section */}
            <section className="bg-gray-200 py-10">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-[#49A097] text-center mb-6">
                        Fetched Data from Google Sheets
                    </h2>
                    {sheetData ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sheetData.map((row, rowIndex) => (
                                <div key={rowIndex} className="bg-white shadow-lg rounded-lg p-4">
                                    <h3 className="text-xl font-bold mb-2">Row {rowIndex + 1}</h3>
                                    <ul>
                                        {row.map((cell, cellIndex) => (
                                            <li key={cellIndex} className="text-gray-700">
                                                {cell}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Loading data...</p>
                    )}
                </div>
            </section>


            {/* Another Section */}
            <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold text-[#49A097] mb-8">
                        TEMP
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-2">TEMP</h3>
                            <p className="text-gray-300">TEMP.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-2">TEMP</h3>
                            <p className="text-gray-300">TEMP</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-2">TEMP</h3>
                            <p className="text-gray-300">TEMP.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
