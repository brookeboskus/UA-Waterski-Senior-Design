"use client";

import Link from 'next/link';
import HeaderWLAM from './img/headerWLAM.svg';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="bg-[#9E1B32] p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/"> {/* lets the image be clickable and lead back to homepage */}
                        <Image src={HeaderWLAM} alt="Header WLAM image" width={300} height={300} />
                    </Link>
                </div>
                <div className="space-x-10 flex items-center">
                    <Link href="/" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        Home
                    </Link>
                    <Link href="/set-list-page" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        Set List
                    </Link>
                    {/* About Dropdown */}
                    <div className='cursor-pointer items-center gap-1 group relative'>
                        <div className='flex flex-row text-white text-lg hover:text-gray-400 transition duration-300'>
                            About
                        </div>
                        <ul className='left-1/2 transform -translate-x-1/2 hidden absolute pt-4 w-40 rounded-lg group-hover:block border-bg-black text-center'>
                            <li className='border-2 hover:bg-[#D44122] hover:text-white text-black bg-white'>
                                <Link
                                    href='/roster-page'
                                    className='block py-2 px-4'
                                >
                                    Roster
                                </Link>
                            </li>
                            <li className='border-2 hover:bg-[#D44122] hover:text-white text-black bg-white'>
                                <Link
                                    href='/club-information-page'
                                    className='block py-2 px-4'
                                >
                                    Club Info
                                </Link>
                            </li>
                            <li className='border-2 hover:bg-[#D44122] hover:text-white text-black bg-white'>
                                <Link
                                    href='/merch-page'
                                    className='block py-2 px-4'
                                >
                                    Merch
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link href="/officer-resources-page" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        Officer Resources
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
