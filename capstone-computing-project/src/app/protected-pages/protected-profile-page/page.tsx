"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';  // Make sure to import Image from 'next/image'
import ellipseImage from '../img/DefaultPFP.svg';  // Adjust the path as necessary
import editPFP from '../img/EditPFPIcon.svg';  // Adjust the path as necessary

export default function ProfilePage() {
    const [profileData, setProfileData] = useState({
        fname: '',
        lname: '',
        phone: '',
        email: '',
        cwid: '',
        gradYear: '',
        major: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            const response = await fetch('/auth/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: 'akspencer1@crimson.ua.edu' })  // Replace with actual user email
            });
            const data = await response.json();
            setProfileData(data);
        };

        fetchProfileData();
    }, []);

    return (
        <div className="w-[428px] h-[926px] relative bg-white rounded-[5px]">
            <div className="w-[428px] h-[328px] left-0 top-0 absolute bg-[#9e1b32]"></div> 
            <div className="w-[227px] h-[227px] left-[100px] top-[70px] absolute rounded-full shadow">
                <Image src={ellipseImage} alt="DefaultPFP" />
            </div>
            <div className="w-[227px] h-[227px] left-[400px] top-[25px] absolute rounded-full shadow">
                <Image src={editPFP} alt="Edit Icon" width={20} height={20} />
            </div>
            <div className="w-[191px] h-[26px] left-[-8px] top-[358px] absolute text-center text-black text-xl font-bold">Your Information</div>

            {/* Displaying fetched user data */}
            <div className="w-[101px] h-3.5 left-[99px] top-[397px] absolute text-black text-[15px] font-bold"> First Name</div>
            <div className="w-[220px] h-7 left-[99px] top-[418px] absolute text-[#b9b9b9] text-[15px] font-bold">{profileData.fname}</div>
            
            <div className="w-[101px] h-3.5 left-[101px] top-[449px] absolute text-black text-[15px] font-bold">Last Name</div>
            <div className="w-[220px] h-7 left-[99px] top-[472px] absolute text-[#b9b9b9] text-[15px] font-bold">{profileData.lname}</div>
            
            <div className="w-[125px] h-[19px] left-[99px] top-[505px] absolute text-black text-[15px] font-bold">Phone Number</div>
            <div className="w-[241px] h-[22px] left-[100px] top-[528px] absolute text-[#b9b9b9] text-[15px] font-bold">{profileData.phone}</div>
            
            <div className="w-[101px] h-3.5 left-[101px] top-[557px] absolute text-black text-[15px] font-bold">E-mail</div>
            <div className="w-[241px] h-[22px] left-[101px] top-[578px] absolute text-[#b9b9b9] text-[15px] font-bold">{profileData.email}</div>
            
            <div className="w-[101px] h-3.5 left-[100px] top-[609px] absolute text-black text-[15px] font-bold">CWID</div>
            <div className="w-[241px] h-[22px] left-[100px] top-[630px] absolute text-[#b9b9b9] text-[15px] font-bold">{profileData.cwid}</div>
            
            <div className="w-[101px] h-3.5 left-[100px] top-[665px] absolute text-black text-[15px] font-bold">Graduation Year</div>
            <div className="w-[241px] h-[22px] left-[100px] top-[686px] absolute text-[#b9b9b9] text-[15px] font-bold">{profileData.gradYear}</div>
            
            <div className="w-[101px] h-3.5 left-[101px] top-[719px] absolute text-black text-[15px] font-bold">Major</div>
            <div className="w-[241px] h-[22px] left-[101px] top-[740px] absolute text-[#b9b9b9] text-[15px] font-bold">{profileData.major}</div>
        </div>
    );
}