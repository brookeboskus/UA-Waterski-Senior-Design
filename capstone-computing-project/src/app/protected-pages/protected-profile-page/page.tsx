
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DefaultPFP from '../../img/DefaultPFP.svg';
import FirstNameImage from '../../img/Text (1).svg';
import LastNameImage from '../../img/Text (2).svg';
import GradYearImage from '../../img/Text (3).svg';
import PhoneNumberImage from '../../img/Text (4).svg';
import EmailImage from '../../img/Text (5).svg';
import CWIDImage from '../../img/Text (6).svg';
import MajorImage from '../../img/Text (7).svg';
import StatusImage from '../../img/Text (8).svg';
import EditPage from '../protected-profile-edit-page/page';
import axios from 'axios';
import Link from 'next/link';
import EditIcon from '../../img/Icon (2).svg';
import { useSearchParams} from 'next/navigation';

interface TeamMember {
    Fname: string;
    Lname: string;
    GradYear: string;
    MemberType: string;
    Major: string;
    Phone: string;
    Email: string;
    CWID: string;
    PfpImage: string;
}

export default function ProfilePage() {
    const [teamMember, setTeamMember] = useState<TeamMember | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const [isEditPageOpen, setIsEditPageOpen] = useState(false); // state to manage edit page visibility
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const toggleEditPage = () => {
        setIsEditPageOpen(!isEditPageOpen);
    };


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); 
                if (!token) {
                    throw new Error('No token found'); 
                }

                const response = await axios.get<TeamMember>('http://localhost:4000/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}` // send the token in the request headers to authenticate
                    }
                });

                console.log('Profile data:', response.data); 

                setTeamMember(response.data); // store profile data in state
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
    if (!teamMember) {
        return <div>No team member righthere data available.</div>; 
    }else{

    return (
    <div className="relative w-[417px] h-[787px] bg-white rounded-[5px] z-40" style={{ top: '0px', right: '5px', borderLeft: '3px solid black' }}>
    {/* Container for the red header and profile image */}
    <div className="relative w-full h-full">
        {/* Red Header Section */}
        <div className="absolute left-0 top-0 w-full h-[320px] bg-[#9e1b32] z-10"></div> 

        {/* User Profile Image */}
        <div className="absolute left-[50%] top-[5%] w-[230px] h-[230px] rounded-full z-20 transform -translate-x-[50%] overflow-hidden">
        <Image
                    src={teamMember.PfpImage ? teamMember.PfpImage : DefaultPFP}
                    alt={`${teamMember.Fname} ${teamMember.Lname}'s profile image`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                />
        </div>
    </div>


    <div>
        {/* Edit Page */}
        <div
            className={`fixed top-0 p-2 ${isEditPageOpen ? 'z-0' : 'z-[9999]'}`}
            style={{ top: '-5px', right: '10px' }}
        >
            {/* open the sidebar */}
            <button onClick={toggleEditPage} className=" p-20  -m-5 transform translate-x-10">
                <Link href="#">
                    <Image
                    src={EditIcon}
                    alt="Profile picture"
                    width={20}
                    height={20}
                    className=" shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                </Link>
            </button>
        </div>
           

                {/* sidebar */}
                {isEditPageOpen && (
                    <div
                        className="fixed right-5 h-full bg-white z-[9998]"
                        style={{ top: '15px', width: '27%' }}
                    >
                        <button onClick={toggleEditPage} className="p-2 text-black">Close</button>
                        {/* render the profile page content */}
                        <EditPage  />
                    </div>

                )}
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
        }}