"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import SkiBamaLogo from './img/skibamalogo.svg';
import { fetchSheetData } from "./googlesheetservices";
import placeholderhomepageimage from "../app/img/placeholderhomepage.svg";

export default function Home() {
    const [sheetData, setSheetData] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(2);
    const [isSliding, setIsSliding] = useState(false);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const [loading, setLoading] = useState(true);
    const [image8B, setImage8B] = useState<string | null>(null);
    const [textFrom8C, setTextFrom8C] = useState<string | null>(null);

    // Set page title
    useEffect(() => {
        document.title = 'UA Waterski - Home';
    }, []);

    useEffect(() => {
        console.log("Fetching data...");
        // fetching data from Google Sheets
        const getData = async () => {
            try {
                const data = await fetchSheetData("HomePage");
                if (data) {
                    const imageUrls = data
                        .filter((row) => row[0]?.startsWith("http"))
                        .map((row) => row[0]);
                    setSheetData(imageUrls);

                    const image8BUrl = data[7]?.[1];
                    if (image8BUrl?.startsWith("http")) {
                        setImage8B(image8BUrl);
                    } else {
                        setImage8B(null);
                    }

                    const textFrom8C = data[7]?.[2];
                    if (textFrom8C) {
                        setTextFrom8C(textFrom8C);
                    } else {
                        setTextFrom8C("No content available.");
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

    const startSlide = (newIndex: number, dir: "left" | "right") => {
        setIsSliding(true);
        setDirection(dir);
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setIsSliding(false);
        }, 300);
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
                        {loading || error ? (
                            <div className="relative w-full flex justify-center items-center">
                                <div className="flex justify-center mb-12">
                                    <Image
                                        src={placeholderhomepageimage}
                                        alt="Jeongbin Son"
                                        width={1000}
                                        height={1000}
                                        className="rounded-full w-48 h-48 md:w-100 md:h-100"
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
                                                className="object-cover w-[1000px] h-[150px] md:w-[400px] md:h-[400px] rounded-md"
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
                                            className="object-cover w-[300px] h-[200px] md:w-[1100px] mt-10 md:h-[500px] rounded-md"
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
                                                className="object-cover w-[200px] h-[150px] md:w-[600px] md:h-[400px] rounded-md"
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        )}

                        {/* Left Arrow */}
                        <button
                            onClick={handlePrev}
                            className={`absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 bg-[#9E1B32] text-white p-4 md:p-6 rounded-full shadow-lg ${showPrevImage && !loading ? 'opacity-80 hover:opacity-100 hover:bg-[#B32346]' : 'opacity-50 cursor-not-allowed'} transition duration-300`}
                            disabled={!showPrevImage || loading}
                        >
                            {/* &#9664; */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 md:w-8 md:h-8 z-11"
                            >
                                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                            </svg>
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={handleNext}
                            className={`absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 bg-[#9E1B32] text-white p-4 md:p-6 rounded-full shadow-lg ${showNextImage && !loading ? 'opacity-80 hover:opacity-100 hover:bg-[#B32346]' : 'opacity-50 cursor-not-allowed'} transition duration-300`}
                            disabled={!showNextImage || loading}
                        >
                            {/* &#9654; */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 md:w-8 md:h-8 z-11"
                            >
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                            </svg>
                        </button>

                    </div>

                    <div className="container mx-auto text-center flex flex-col justify-center items-center min-h-[50vh] md:min-h-[70vh] px-4">

                        <div style={{ height: 'auto', width: '400px' }}>
                            <Image
                                src={SkiBamaLogo}
                                alt="Ski Bama Logo"
                                className="h-200 w-200 md:h-100 md:w-100 lg:h-200 lg:w-200 object-contain"
                                priority={true}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center mt-8 mx-15 border border-gray-300 p-4 rounded-lg min-h-[300px]">

                            {/* Picture from cell 8B */}
                            {image8B && (
                                <img
                                    src={image8B}
                                    alt="Image from 8B"
                                    className="h-200px w-200px md:h-250px md:w-250px lg:h-300px lg:w-300px max-w-full object-contain mr-6"
                                />
                            )}

                            {/* Text from 8C */}
                            <div className="flex flex-col justify-center h-full">
                                <p className="text-lg md:text-xl text-black max-w-3xl">
                                    {textFrom8C ? textFrom8C : "Loading content..."}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* temp usage of br for spacing on the bottom */}
                <br />
                <br />

            </main>
        </div>
    );
}