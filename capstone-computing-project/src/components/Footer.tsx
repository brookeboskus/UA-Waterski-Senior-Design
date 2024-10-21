"use client";
import uabrandingstandard from '../../src/app/img/uabrandingstandard.svg';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#9E1B32] text-white py-2 mt-0">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">

                {/* 'Alabama Sports Club' logo needed for copyright */}
                <div className="mb-2 md:mb-0">
                    <Image
                        src={uabrandingstandard}
                        alt="UA Branding Standard"
                        width={60}
                        height={60}
                        className="mx-auto md:mx-0"
                    />
                </div>

                {/* Contact and Social Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-y-0 md:space-x-4 text-sm md:text-base">
                    {/* Left Column*/}
                    <div className="flex flex-col">
                        <a
                            href="tel:1234567890"
                            className="text-white hover:text-black transition duration-300 hover:underline"
                        >
                            Phone: 123-456-7890
                        </a>
                        <a
                            href="https://www.instagram.com/alabama_waterski/"
                            target="_blank"
                            className="text-white hover:text-black transition duration-300 hover:underline"
                        >
                            Follow our Instagram
                        </a>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col">
                        <a
                            href="mailto:skibama18@gmail.com"
                            target="_blank"
                            className="text-white hover:text-black transition duration-300 hover:underline"
                        >
                            Email: skibama18@gmail.com
                        </a>
                        <a
                            href="https://www.facebook.com/AlabamaWaterskiTeam/"
                            target="_blank"
                            className="text-white hover:text-black transition duration-300 hover:underline"
                        >
                            Link to our Facebook
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-2 border-t border-gray-400">
                <p className="text-center text-xs py-1 text-gray-300">
                    University of Alabama Waterski Team
                </p>
            </div>
        </footer>
    );
}
