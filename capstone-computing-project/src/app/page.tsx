// This will be for home page
// Important to not move this page.tsx into any other folders or to a different location

// monthly news letter updating ppl what's going on at the time
// officer's position updating the news letter
"use client";
// 
import { useEffect, useState } from 'react';
import { fetchSheetData } from './googlesheetservices'; // Update import as needed

//import HomePicture from './img/homePicture.svg';
import Image from 'next/image';

// helper home page
export default function Home() {
    const [sheetData, setSheetData] = useState<string[][] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(1);

    useEffect(() => {
        const getData = async () => {
            try{

                const data = await fetchSheetData();
                if (data) {
                    setSheetData(data);
                }else{
                    setSheetData([]);
                }
                console.log(sheetData);
                

            } catch (err){
                console.error('Error fetching sheet data:', err);
                setError('Failed to fetch data');
            }
            
        };

        getData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sheetData && sheetData.length > 1) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % sheetData.length);
                setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : prevIndex));
            }
        }, 3000); // Change image every 2 seconds

        return () => clearInterval(interval);
    }, [sheetData]);

    const handleNext = () => {
        if (sheetData) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sheetData.length);
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : prevIndex));
        }
    };

    const handlePrev = () => {
        if (sheetData) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + sheetData.length) % sheetData.length);
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : prevIndex));
        }
    };

    return (
        <div className="min-h-screen flex flex-col">

            <main className="flex-grow">
                {/* Hero Section */}
                {/* bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white */}
                <section className="bg-white py-28">
                    <div className="w-full flex justify-center">
                       {/* Image here */}
                       {/* Image here */}
                       {!error && sheetData && sheetData.length > 1 && (
                            <img 
                                src={sheetData[currentIndex][0]} // Adjusted to get the image from the first column
                                alt={`Image ${currentIndex}`} 
                                width={1200} 
                                height={800} 
                                className="object-cover w-full h-[800px] rounded-md"
                            />
                        )}
                        {/* Left Arrow */}
                        <button 
                            onClick={handlePrev}
                         
                            
                            className="absolute left-4 top-2/3 transform -translate-y-1/2 bg-transparent border border-gray-200 p-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
                        >
                            &#9664; {/* Left Arrow */}
                        </button>
                        {/* Right Arrow */}
                        <button 
                            onClick={handleNext}
                            className="absolute right-4 top-2/3 transform -translate-y-1/2 bg-transparent border border-gray-200 p-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
                        >
                            &#9654; {/* Right Arrow */}
                        </button>
                    </div>

                    

                    <div className="container mx-auto text-center flex flex-col justify-center items-center min-h-[70vh]">
                        {/* Add photo of Skibama team */}
                        <h1 className="text-6xl font-extrabold mb-6 text-[#9E1B32]">
                            TEMP WELCOME MESSAGE
                        </h1>
                        <p className="text-2xl mb-12 text-black-300 max-w-3xl mx-auto">
                            TEMP STATEMENT
                        </p>
                        <a
                            href="#projects"
                            className="bg-[#49A097] text-white px-8 py-4 rounded-full hover:bg-[#3d857c] transition duration-300"
                        >
                            TEMP
                        </a>
                    </div>
                </section>

                {/* Horizontal Line */}
                <div className="w-full border-t-4 border-[#49A097]"></div>

                {/* Projects Section */}
                <section id="projects" className="py-20 bg-gray-100 text-gray-800">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-[#49A097]">
                            TEMP SECTION
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            TEMP 
                        </p>
                    </div>
                </section>

                {/* Horizontal Line */}
                <div className="w-full border-t-4 border-[#49A097]"></div>
            </main>
        </div>
    );
}

