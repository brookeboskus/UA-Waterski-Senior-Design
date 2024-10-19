"use client";
import uabrandingstandard from '../../src/app/img/uabrandingstandard.svg';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#9E1B32] text-white py-4 mt-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                
                {/* 'Alabama Sports Club' logo needed for copyright */}
                <div className="mb-4 md:mb-0">
                    <Image 
                        src={uabrandingstandard} 
                        alt="UA Branding Standard" 
                        width={80} 
                        height={80} 
                        className="mx-auto md:mx-0"
                    />
                </div>

                {/* Contact Information */}
                <div className="flex flex-col md:flex-row md:space-x-8 items-center">
                    <a 
                        href="tel:1234567890" 
                        className="text-white mx-2 md:mx-0 mb-2 md:mb-0 hover:text-gray-300 transition duration-300 text-sm md:text-base"
                    >
                        Phone Number: 123-456-7890
                    </a>
                    <a 
                        href="mailto:fakeemail@crimson.ua.edu" 
                        className="text-white mx-2 md:mx-0 hover:text-gray-300 transition duration-300 text-sm md:text-base"
                    >
                        Email: fakeemail@crimson.ua.edu
                    </a>
                </div>
            </div>
            
            <div className="mt-4 border-t border-gray-400">
                <p className="text-center text-xs md:text-sm py-2 text-gray-300">
                    University of Alabama Waterski Team
                </p>
            </div>
        </footer>
    );
}
