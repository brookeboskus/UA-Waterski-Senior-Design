// Footer.tsx for creating the footer of the website

"use client";
import uabrandingstandard from '../../src/app/img/uabrandingstandard.svg';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#9E1B32] text-white p-4 mt-8">
            <div className="container mx-auto text-center">
                <div className="mt-2">
                    <Image src={uabrandingstandard} alt="UA Branding Standard" width={100} height={100} />
                    <a href="/" className="text-white mx-2" target="_blank" rel="noopener noreferrer"> {/*EXAMPLE: href="https://github.com/brian419" */}
                        Phone Number: 123-456-7890
                    </a>
                    <a href="/" className="text-white mx-2" target="_blank" rel="noopener noreferrer"> {/* EXAMPLE: href="https://linkedin.com/in/jeongbin-son" */}
                        Email: fakeemail@crimson.ua.edu
                    </a>
                </div>
            </div>
        </footer>
    );
}
