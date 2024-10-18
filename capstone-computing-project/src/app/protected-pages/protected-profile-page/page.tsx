
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ellipseImage from '../../img/DefaultPFP.svg';
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
        <div className="absolute left-[50%] top-[5%] w-[230px] h-[230px] rounded-full z-20 transform -translate-x-[50%] overflow-hidden">
            <Image src={ellipseImage} alt="DefaultPFP" layout="fill" objectFit="cover" className="rounded-full" />
        </div>
    </div>





            {/* Conditionally render the team member info only if teamMember is defined */}
            {teamMember ? (
                <>
                <div className="absolute left-[25%] top-[45%] w-[191px] h-[26px] text-center text-black text-xl font-bold transform -translate-x-[50%]">
            Your Information
        </div>
                    <div className="w-[101px] h-3.5 left-[99px] top-[397px] absolute text-black text-[15px] font-bold">First Name</div>
                    <div className="w-[220px] h-7 left-[99px] top-[418px] absolute text-[#b9b9b9] text-[15px] font-bold">{teamMember.Fname}</div>

                    <div className="w-[101px] h-3.5 left-[101px] top-[449px] absolute text-black text-[15px] font-bold">Last Name</div>
                    <div className="w-[220px] h-7 left-[99px] top-[472px] absolute text-[#b9b9b9] text-[15px] font-bold">{teamMember.Lname}</div>

                    <div className="w-[125px] h-[19px] left-[99px] top-[660px] absolute text-black text-[15px] font-bold">Graduation Year</div>
                    <div className="w-[241px] h-[22px] left-[100px] top-[680px] absolute text-[#b9b9b9] text-[15px] font-bold">{teamMember.GradYear}</div>

                    <div className="w-[101px] h-3.5 left-[101px] top-[719px] absolute text-black text-[15px] font-bold">Major</div>
                    <div className="w-[241px] h-[22px] left-[101px] top-[740px] absolute text-[#b9b9b9] text-[15px] font-bold">{teamMember.Major}</div>

                    <div className="w-[125px] h-[19px] left-[99px] top-[505px] absolute text-black text-[15px] font-bold">Phone Number</div>
                    <div className="w-[241px] h-[22px] left-[100px] top-[528px] absolute text-[#b9b9b9] text-[15px] font-bold">{teamMember.Phone}</div>
            
                    <div className="w-[101px] h-3.5 left-[101px] top-[557px] absolute text-black text-[15px] font-bold">E-mail</div>
                    <div className="w-[241px] h-[22px] left-[101px] top-[578px] absolute text-[#b9b9b9] text-[15px] font-bold">{teamMember.Email}</div>
            
                    <div className="w-[101px] h-3.5 left-[100px] top-[609px] absolute text-black text-[15px] font-bold">CWID</div>
                    <div className="w-[241px] h-[22px] left-[100px] top-[630px] absolute text-[#b9b9b9] text-[15px] font-bold">{teamMember.CWID}</div>
                </>
            ) : (
                <div>No team member data available.</div>
            )}
        </div>
    );
}
