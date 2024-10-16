"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import SkiBamaLogo from './img/skibamalogo.svg';
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
                if (data) {
                    const imageUrls = data
                        .filter((row) => row[0]?.startsWith("http"))
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
                                                className="object-cover w-[200px] h-[150px] md:w-[600px] md:h-[400px] rounded-md"
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
                                            className="object-cover w-[300px] h-[200px] md:w-[800px] md:h-[500px] rounded-md"
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
                            &#9664;
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={handleNext}
                            className={`absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 bg-[#9E1B32] text-white p-4 md:p-6 rounded-full shadow-lg ${showNextImage && !loading ? 'opacity-80 hover:opacity-100 hover:bg-[#B32346]' : 'opacity-50 cursor-not-allowed'} transition duration-300`}
                            disabled={!showNextImage || loading}
                        >
                            &#9654;
                        </button>

                    </div>

                    <div className="container mx-auto text-center flex flex-col justify-center items-center min-h-[50vh] md:min-h-[70vh] px-4">
                        {/* Logo Image */}
                        <Link href="/">
                            <Image 
                                src={SkiBamaLogo} 
                                alt="Ski Bama Logo" 
                                width={400} 
                                height={400} 
                                className="h-200 w-200 md:h-100 md:w-100 lg:h-200 lg:w-200 object-contain" // image scales within navbar height and width with different screen sizes
                            />
                        </Link>
                        {/* Blank */}
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#9E1B32]">
                            
                        </h1>

                        {/* About Us snippet */}
                        <p className="text-lg md:text-1xl mb-12 text-black max-w-3xl mx-auto">
                        The University of Alabama Waterski Team was started in 1976, when a group of four students with a passion for competitive waterskiing decided to bring Alabama into the collegiate realm of waterskiing. Since then, the ski team has placed in the top four at the National Championships in 18 of the last 23 years. In the past seven years, we have had 18 members of our team earn a medal at The World Championships, with 9 of them currently skiing for Alabama. 
                        Our team is full of top-ranked water skiers who are proud to represent The University of Alabama. something something something
                        </p>

                        {/* Temp Button */}
                        <a
                            href="#projects"
                            className="bg-[#9E1B32] text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-[#3d857c] transition duration-300"
                        >
                            TEMP
                        </a>

                    </div>
                </section>


                <section id="projects" className="py-10 md:py-20 text-gray-800">
                    <div className="container mx-auto text-center px-4">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#9E1B32]">
                            TEMP SECTION
                        </h2>
                        <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto">TEMP</p>
                    </div>
                </section>
                
            </main>
        </div>
    );
}
