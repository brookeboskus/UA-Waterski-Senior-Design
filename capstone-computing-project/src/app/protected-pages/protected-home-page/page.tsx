// This will be for home page after loging in]
"use client"
import Image from 'next/image';  // Make sure to import Image from 'next/image'
import ellipseImage from '../../img/DefaultPFP.svg';  // Adjust the path as necessary
import Link from 'next/link';
;

export default function HomeAfterLogin() {

    return (
        <div>
            <div>
        

            <Link href="/protected-pages/protected-profile-page">
                <Image 
                    src={ellipseImage} 
                    alt="Header WLAM image" 
                    width={80} 
                    height={80} 
                    className="h-20 w-20 md:h-28 md:w-28 lg:h-48 lg:w-48 object-contain" // image scales within navbar height and width with different screen sizes
                />
            </Link>
            </div>
     
            

            <main className="flex-grow">
                {/* Hero Section */}
                {/* bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white */}
                <section className="bg-white py-28">

                    <div className="container mx-auto text-center flex flex-col justify-center items-center min-h-[70vh]">
                        {/* Add photo of Skibama team */}
                        <h1 className="text-6xl font-extrabold mb-6 text-[#F96868]">
                            THIS SHOULD ONLY SHOW UP AFTER YOU LOGGED IN
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

