
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ellipseImage from '../../img/DefaultPFP.svg';
import FirstNameImage from '../../img/Text (1).svg';
import LastNameImage from '../../img/Text (2).svg';
import GradYearImage from '../../img/Text (3).svg';
import PhoneNumberImage from '../../img/Text (4).svg';
import EmailImage from '../../img/Text (5).svg';
import CWIDImage from '../../img/Text (6).svg';
import MajorImage from '../../img/Text (7).svg';
import StatusImage from '../../img/Text (8).svg';
import axios from 'axios';

interface TeamMember {
    Fname: string;
    Lname: string;
    GradYear: string;
    MemberType: string;
    Major: string;
    Phone: string;
    Email: string;
    CWID: string;
}

export default function ProfilePage() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get<TeamMember[]>('http://localhost:4000/auth/profile');
                setTeamMembers(response.data);
            } catch (error) {
                console.error('Failed to fetch team roster:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Render a loading message while data is being fetched
    }

    // Ensure teamMembers array has at least one member
    const teamMember = teamMembers.length > 0 ? teamMembers[0] : undefined;

    return (
        <div className="relative w-[417px] h-[787px] bg-white rounded-[5px] z-40" style={{ top: '0px', right: '5px', borderLeft: '3px solid black' }}>
    {/* Container for the red header and profile image */}
    <div className="relative w-full h-full">
        {/* Red Header Section */}
        <div className="absolute left-0 top-0 w-full h-[320px] bg-[#9e1b32] z-10"></div> 

        {/* User Profile Image */}
        <div className="absolute left-[50%] top-[5%] w-[230px] h-[230px]  z-20 transform -translate-x-[50%] overflow-hidden">
            <Image src={ellipseImage} alt="DefaultPFP" layout="fill" objectFit="cover"  />
        </div>
    </div>





            {/* Conditionally render the team member info only if teamMember is defined */}
            {teamMember ? (
            <>
                {/* "Your Information" Label */}
                <div className="absolute left-[25%] top-[42%] w-[191px] h-[26px] text-center text-black text-xl font-bold transform -translate-x-[50%]">
                    Your Information
                </div>

                {/* First Name */}
                <div className="w-[101px] h-[15px] left-[99px] top-[360px] absolute text-black text-[13px] font-bold">First Name</div>
                <div className="absolute left-[50px] top-[365px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                    <Image 
                        src={FirstNameImage} 
                        alt="First Name Icon" 
                        layout="fill" 
                        objectFit="contain"
                        className="rounded"
                    />
                </div>
                <div className="w-[220px] h-[20px] left-[99px] top-[380px] absolute text-[#b9b9b9] text-[13px] font-bold">
                    {teamMember.Fname}
                </div>

                {/* Last Name */}
                <div className="w-[101px] h-[15px] left-[99px] top-[410px] absolute text-black text-[13px] font-bold">Last Name</div>
                <div className="absolute left-[50px] top-[415px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                    <Image 
                        src={LastNameImage} 
                        alt="Last Name Icon" 
                        layout="fill" 
                        objectFit="contain"
                        className="rounded"
                    />
                </div>
                <div className="w-[220px] h-[20px] left-[99px] top-[430px] absolute text-[#b9b9b9] text-[13px] font-bold">
                    {teamMember.Lname}
                </div>

                {/* Graduation Year */}
                <div className="w-[125px] h-[15px] left-[99px] top-[460px] absolute text-black text-[13px] font-bold">Graduation Year</div>
                <div className="absolute left-[50px] top-[465px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                    <Image 
                        src={GradYearImage} 
                        alt="Graduation Year Icon" 
                        layout="fill" 
                        objectFit="contain"
                        className="rounded"
                    />
                </div>
                <div className="w-[220px] h-[20px] left-[99px] top-[480px] absolute text-[#b9b9b9] text-[13px] font-bold">
                    {teamMember.GradYear}
                </div>

                {/* Major */}
                <div className="w-[101px] h-[15px] left-[99px] top-[510px] absolute text-black text-[13px] font-bold">Major</div>
                <div className="absolute left-[50px] top-[515px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                    <Image 
                        src={MajorImage} 
                        alt="Major Icon" 
                        layout="fill" 
                        objectFit="contain"
                        className="rounded"
                    />
                </div>
                <div className="w-[220px] h-[20px] left-[99px] top-[530px] absolute text-[#b9b9b9] text-[13px] font-bold">
                    {teamMember.Major}
                </div>

                {/* Phone Number */}
                <div className="w-[125px] h-[15px] left-[99px] top-[560px] absolute text-black text-[13px] font-bold">Phone Number</div>
                <div className="absolute left-[50px] top-[565px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                    <Image 
                        src={PhoneNumberImage} 
                        alt="Phone Number Icon" 
                        layout="fill" 
                        objectFit="contain"
                        className="rounded"
                    />
                </div>
                <div className="w-[220px] h-[20px] left-[99px] top-[580px] absolute text-[#b9b9b9] text-[13px] font-bold">
                    {teamMember.Phone}
                </div>

                {/* Email */}
                <div className="w-[101px] h-[15px] left-[99px] top-[610px] absolute text-black text-[13px] font-bold">E-mail</div>
                <div className="absolute left-[50px] top-[615px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                    <Image 
                        src={EmailImage} 
                        alt="Email Icon" 
                        layout="fill" 
                        objectFit="contain"
                        className="rounded"
                    />
                </div>
                <div className="w-[220px] h-[20px] left-[99px] top-[630px] absolute text-[#b9b9b9] text-[13px] font-bold">
                    {teamMember.Email}
                </div>

                {/* CWID */}
                <div className="w-[101px] h-[15px] left-[99px] top-[660px] absolute text-black text-[13px] font-bold">CWID</div>
                <div className="absolute left-[50px] top-[665px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                    <Image 
                        src={CWIDImage} 
                        alt="CWID Icon" 
                        layout="fill" 
                        objectFit="contain"
                        className="rounded"
                    />
                </div>
                <div className="w-[220px] h-[20px] left-[99px] top-[680px] absolute text-[#b9b9b9] text-[13px] font-bold">
                    {teamMember.CWID}
                </div>

                {/* Status */}
                <div className="w-[101px] h-[15px] left-[99px] top-[710px] absolute text-black text-[13px] font-bold">Status</div>
                <div className="absolute left-[50px] top-[715px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                    <Image 
                        src={StatusImage} 
                        alt="Status Icon" 
                        layout="fill" 
                        objectFit="contain"
                        className="rounded"
                    />
                </div>
                <div className="w-[220px] h-[20px] left-[99px] top-[730px] absolute text-[#b9b9b9] text-[13px] font-bold">
                    {teamMember.CWID}
                </div>
            </>
        ) : (
            <div>No team member data available.</div>
        )}
    </div>
);
        }