// Navbar.tsx for the top navigation bar of the website (Like about me, home, contact, etc of the websites)

"use client";

import Link from 'next/link';
import HeaderWLAM from './img/headerWLAM.svg';
import Image from 'next/image';
//import WaterskiImage from '../img/loginSkiIMG.svg';

export default function Navbar() {
    return (
        <nav className="bg-[#9E1B32] p-4 shadow-md sticky top-0 z-50">
            {/* bg-gray-900 */}
            <div className="container mx-auto flex justify-between items-center">
                {/* Photo / Logo */}
                {/* Navigation Links */}
                <div className="flex items-center">
                    <Image src={HeaderWLAM} alt="Header WLAM image" width={300} height={300}/>
                </div>
                <div className="space-x-8">
                    <Link href="/" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        Home
                    </Link>
                    <Link href="/about-me-page" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        About
                    </Link>
                    <Link href="/page-3" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        Page 3
                    </Link>
                    <Link href="/contact-page" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        Contact
                    </Link>
                </div>
                <div>
                    <Link href="/login-page" className="bg-white-500 text-white text-lg py-2 px-4 rounded hover:bg-white hover:text-[#9E1B32] transition duration-300">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}
