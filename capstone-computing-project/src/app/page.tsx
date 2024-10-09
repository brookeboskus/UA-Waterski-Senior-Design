"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import { fetchSheetData } from "./googlesheetservices";
import placeholderhomepageimage from "../app/img/placeholderhomepage.svg";

export default function Home() {
    const [sheetData, setSheetData] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetching data from Google Sheets
        const getData = async () => {
            try {
                const data = await fetchSheetData();
                if (data) { // if data not null, filter out only image URLs
                    const imageUrls = data
                        .filter((row) => row[0]?.startsWith("http")) // assumes image url is in first column
                        .map((row) => row[0]);
                    setSheetData(imageUrls);
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

    const startSlide = (newIndex: number, dir: "left" | "right") => {
        setIsSliding(true);
        setDirection(dir);
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setIsSliding(false);
        }, 300); // 
    };

    const handleNext = () => {
        if (sheetData) {
            const nextIndex = (currentIndex + 1) % sheetData.length;
            startSlide(nextIndex, "right");
        }
    };

    const handlePrev = () => {
        if (sheetData) {
            const prevIndex = (currentIndex - 1 + sheetData.length) % sheetData.length;
            startSlide(prevIndex, "left");
        }
    };

    const showPrevImage = currentIndex > 0;
    const showNextImage = sheetData && currentIndex < sheetData.length - 1;

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                <section className="bg-white">
                    <div className="w-full flex justify-center relative overflow-hidden">
                        {/* placeholder image when loading or on error */}
                        {loading || error ? (
                            <div className="relative w-full flex justify-center items-center">
                                <div className="flex justify-center mb-12">
                                    <Image
                                        src={placeholderhomepageimage}
                                        alt="Jeongbin Son"
                                        width={1000}
                                        height={1000}
                                        className="rounded-full"
                                    />
                                </div>


                            </div>
                        ) : (
                            !error && sheetData && sheetData.length > 1 && (
                                <div className="relative w-full flex justify-center items-center">
                                    {/* Previous Image */}
                                    {showPrevImage && (
                                        <div
                                            className={`absolute left-0 transition-transform duration-300 transform ${isSliding && direction === "left"
                                                ? "translate-x-full"
                                                : isSliding && direction === "right"
                                                    ? "-translate-x-full"
                                                    : "translate-x-0"
                                                } opacity-50 scale-75`}
                                        >
                                            <img
                                                src={sheetData[currentIndex - 1]}
                                                alt="Previous Image"
                                                className="object-cover w-[600px] h-[400px] rounded-md"
                                            />
                                        </div>
                                    )}

                                    {/* Current Image */}
                                    <div
                                        className={`transition-transform duration-300 transform ${isSliding && direction === "right"
                                            ? "-translate-x-full"
                                            : isSliding && direction === "left"
                                                ? "translate-x-full"
                                                : "translate-x-0"
                                            } z-10`}
                                    >
                                        <img
                                            src={sheetData[currentIndex]}
                                            alt="Current Image"
                                            className="object-cover w-[800px] h-[500px] rounded-md scale-100"
                                        />
                                    </div>

                                    {/* Next Image */}
                                    {showNextImage && (
                                        <div
                                            className={`absolute right-0 transition-transform duration-300 transform ${isSliding && direction === "right"
                                                ? "translate-x-full"
                                                : isSliding && direction === "left"
                                                    ? "-translate-x-full"
                                                    : "translate-x-0"
                                                } opacity-50 scale-75`}
                                        >
                                            <img
                                                src={sheetData[currentIndex + 1]}
                                                alt="Next Image"
                                                className="object-cover w-[600px] h-[400px] rounded-md"
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        )}

                        {/* Left Arrow */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-2/3 transform -translate-y-1/2 bg-transparent border border-gray-200 p-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
                            disabled={!showPrevImage || loading} // disables left/right arrows if no previous image or loading
                        >
                            &#9664;
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-2/3 transform -translate-y-1/2 bg-transparent border border-gray-200 p-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
                            disabled={!showNextImage || loading} // disables left/right arrows if no next image or loading
                        >
                            &#9654;
                        </button>
                    </div>

                    <div className="container mx-auto text-center flex flex-col justify-center items-center min-h-[70vh]">
                        <h1 className="text-6xl font-extrabold mb-6 text-[#9E1B32]">
                            TEMP WELCOME MESSAGE
                        </h1>
                        <p className="text-2xl mb-12 text-black-300 max-w-3xl mx-auto">
                            TEMP STATEMENT
                        </p>
                        <a
                            href="#projects"
                            className="bg-[#D45031] text-white px-8 py-4 rounded-full hover:bg-[#3d857c] transition duration-300"
                        >
                            TEMP
                        </a>
                    </div>
                </section>

                <div className="w-full border-t-4 border-[#D45031]"></div>

                <section id="projects" className="py-20 bg-gray-100 text-gray-800">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-[#D45031]">
                            TEMP SECTION
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">TEMP</p>
                    </div>
                </section>

                <div className="w-full border-t-4 border-[#D45031]"></div>
            </main>
        </div>
    );
}
