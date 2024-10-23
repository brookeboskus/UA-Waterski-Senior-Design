// v3
"use client";

import Link from 'next/link';
import Image from 'next/image';
import HeaderWLAM from './img/headerWLAM.svg';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode"; // needed this for token expiration!!

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // for mobile menu toggle
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // for about's dropdown toggle
    const [isLoggedIn, setIsLoggedIn] = useState(false); // track login status
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    const checkTokenExpiration = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000; 
                if (decoded.exp < currentTime) {
                    localStorage.removeItem('token'); 
                    setIsLoggedIn(false);
                    router.push('/login-page'); 
                    console.log('Token expired. Redirected to login page.');
                } else {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('token');
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    };
    // checks if the user is logged in by looking for the token in localStorage
    useEffect(() => {

        checkTokenExpiration(); // Check token expiration when component mounts

        const checkToken = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkToken(); // the initial check when component mounts

        const intervalId = setInterval(checkToken, 1000); // check token every second

        return () => clearInterval(intervalId); // cleans up the interval on component unmount
    }, []);

    // the log out function
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/'); // redirects to login page after logout
        console.log('Logged out and redirected to home page');
    };

    return (
        <nav className="bg-[#9E1B32] shadow-md sticky top-0 z-[9999] w-full">
            <div className="container mx-auto flex justify-between items-center px-4 h-20 md:h-14 lg:h-15">
                {/* where legends are made logo */}
                <Link href="/">
                    <div className="relative">
                        <Image
                            src={HeaderWLAM}
                            alt="Header WLAM image"
                            width={250}
                            height={250}
                            className="object-contain cursor-pointer"
                        />
                    </div>
                </Link>

                {/* dropdown for mobile view */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* navigation links for desktop */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link href="/" className="text-white text-base hover:text-black hover:underline transition duration-300">
                        Home
                    </Link>
                    {isLoggedIn && (
                        <Link href="/set-list-page" className="text-white text-base hover:text-black hover:underline transition duration-300">
                            Set List
                        </Link>
                    )}

                    {/* about dropdown */}
                    <div className="cursor-pointer items-center gap-1 group relative">
                        <div className="flex flex-row text-white text-base hover:text-black hover:underline transition duration-300">
                            <Link href="/about-me-page" className="flex items-center py-2 px-4">
                                About
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </Link>
                        </div>
                        <ul className="z-50 left-1/2 transform -translate-x-1/2 hidden absolute pt-4 w-40 rounded-lg group-hover:block border-bg-black text-center">
                            {isLoggedIn ? (
                                <>
                                    <li className="border-2 hover:bg-[#9E1B32] hover:text-white text-black bg-white">
                                        <Link href="/roster-page" className="block py-2 px-4">
                                            Roster
                                        </Link>
                                    </li>
                                    <li className="border-2 hover:bg-[#9E1B32] hover:text-white text-black bg-white">
                                        <Link href="/club-information-page" className="block py-2 px-4">
                                            Club Info
                                        </Link>
                                    </li>
                                    <li className="border-2 hover:bg-[#9E1B32] hover:text-white text-black bg-white">
                                        <Link href="/merch-page" className="block py-2 px-4">
                                            Merch
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="border-2 hover:bg-[#9E1B32] hover:text-white text-black bg-white">
                                        <Link href="/club-information-page" className="block py-2 px-4">
                                            Club Info
                                        </Link>
                                    </li>
                                    <li className="border-2 hover:bg-[#9E1B32] hover:text-white text-black bg-white">
                                        <Link href="/merch-page" className="block py-2 px-4">
                                            Merch
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {isLoggedIn && (
                        <Link href="/officer-resources-page" className="text-white text-base hover:text-black hover:underline transition duration-300">
                            Officer Resources
                        </Link>
                    )}
                </div>

                {/* login/logout button */}
                <div className="hidden md:block">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="bg-white-500 text-white text-base py-2 px-4 rounded hover:bg-white hover:text-[#9E1B32] transition duration-300">
                            Log Out
                        </button>
                    ) : (
                        <Link href="/login-page" className="bg-white-500 text-white text-base py-2 px-4 rounded hover:bg-white hover:text-[#9E1B32] transition duration-300">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* mobile menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4 space-y-4`}>
                <Link href="/" className="block text-white text-lg hover:text-black transition duration-300" onClick={closeMenu}>
                    Home
                </Link>
                {isLoggedIn && (
                    <Link href="/set-list-page" className="block text-white text-lg hover:text-black transition duration-300" onClick={closeMenu}>
                        Set List
                    </Link>
                )}

                {/* about dropdown for mobile */}
                <div>
                    <button onClick={toggleDropdown} className="flex justify-between items-center w-full text-white text-lg hover:text-black transition duration-300">
                        About
                        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <ul className="space-y-2 mt-2 bg-[#D67D7D]">
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link href="/roster-page" className="block text-white text-lg hover:text-black transition duration-300" onClick={closeMenu}>
                                            Roster
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/club-information-page" className="block text-white text-lg hover:text-black transition duration-300" onClick={closeMenu}>
                                            Club Info
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/merch-page" className="block text-white text-lg hover:text-black transition duration-300" onClick={closeMenu}>
                                            Merch
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link href="/club-information-page" className="block text-white text-lg hover:text-black transition duration-300" onClick={closeMenu}>
                                            Club Info
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/merch-page" className="block text-white text-lg hover:text-black transition duration-300" onClick={closeMenu}>
                                            Merch
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    )}
                </div>

                {isLoggedIn && (
                    <Link href="/officer-resources-page" className="block text-white text-lg hover:text-black transition duration-300" onClick={closeMenu}>
                        Officer Resources
                    </Link>
                )}

                <div className="hidden md:block">
                    {isLoggedIn ? (
                        // Added "pl-8" to push the button to the left
                        <button onClick={handleLogout} className="bg-white-500 text-white text-base py-2 px-4 rounded hover:bg-white hover:text-[#9E1B32] transition duration-300 pl-8">
                            Log Out
                        </button>
                    ) : (
                        <Link href="/login-page" className="bg-white-500 text-white text-base py-2 px-4 rounded hover:bg-white hover:text-[#9E1B32] transition duration-300">
                            Login
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    );
}
