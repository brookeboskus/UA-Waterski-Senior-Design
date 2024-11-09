"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FirstNameImage from '../../img/Text (1).svg';
import LastNameImage from '../../img/Text (2).svg';
import GradYearImage from '../../img/Text (3).svg';
import PhoneNumberImage from '../../img/Text (4).svg';
import EmailImage from '../../img/Text (5).svg';
import CWIDImage from '../../img/Text (6).svg';
import MajorImage from '../../img/Text (7).svg';
import StatusImage from '../../img/Text (8).svg';
import DefaultPFP from '../../img/DefaultPFP.svg';

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

export default function EditProfile() {
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [gradYear, setGradYear] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');

    const [teamMember, setTeamMember] = useState<TeamMember | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Authentication token missing. Please log in again.');
                return;
            }

            try {
                const response = await axios.get<TeamMember>('http://localhost:4000/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data;
                setTeamMember(data);

            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Authentication token missing. Please log in again.');
                return; 
            }

            const payload = {
                Fname: fname,
                Lname: lname,
                GradYear: gradYear,
                Major: selectedMajor,
                Phone: phone,
                Email: email,
                CWID: teamMember?.CWID
            };

            const response = await fetch('/api/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ payload })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Profile updated successfully!');
            } else {
                console.error('Failed to update profile:', data.error || 'Error occurred.');
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    if (!teamMember) {
        return <div>No team member data available.</div>;
    }

    return (
        <div className="relative w-[417px] h-[787px] bg-white rounded-[5px] z-40" style={{ top: '0px', right: '5px', borderLeft: '3px solid black' }}>
            <div className="relative w-full h-full">
                <div className="absolute left-0 top-0 w-full h-[320px] bg-[#9e1b32] z-10"></div>
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

            <div className="absolute left-[25%] top-[42%] w-[191px] h-[26px] text-center text-black text-xl font-bold transform -translate-x-[50%]">
                Your Information
            </div>
            <div>
                <button onClick={updateProfile} className="absolute bg-[#9e1b32] left-[60%] top-[40%] text-black p-2 rounded mt-4 ">
                    Save Changes
                </button>
            </div>

            {/* First Name */}
            <div className="w-[101px] h-[15px] left-[99px] top-[360px] absolute text-black text-[13px] font-bold">First Name</div>
            <div className="absolute left-[50px] top-[365px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                <Image src={FirstNameImage} alt="First Name Icon" layout="fill" objectFit="contain" className="rounded" />
            </div>
            <div className="w-[220px] h-[20px] left-[99px] top-[380px] absolute">
                <input
                    type="text"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className="w-full h-full text-[#b9b9b9] text-[13px] font-bold bg-transparent outline-none"
                    placeholder={teamMember.Fname}
                />
            </div>

            {/* Last Name */}
            <div className="w-[101px] h-[15px] left-[99px] top-[410px] absolute text-black text-[13px] font-bold">Last Name</div>
            <div className="absolute left-[50px] top-[415px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                <Image src={LastNameImage} alt="Last Name Icon" layout="fill" objectFit="contain" className="rounded" />
            </div>
            <div className="w-[220px] h-[20px] left-[99px] top-[430px] absolute text-[#b9b9b9] text-[13px] font-bold">
                <input
                    type="text"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    className="w-full h-full text-[#b9b9b9] text-[13px] font-bold bg-transparent outline-none"
                    placeholder={teamMember.Lname}
                />
            </div>

            {/* Graduation Year */}
            <div className="w-[125px] h-[15px] left-[99px] top-[460px] absolute text-black text-[13px] font-bold">Graduation Year</div>
            <div className="absolute left-[50px] top-[465px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                <Image src={GradYearImage} alt="Graduation Year Icon" layout="fill" objectFit="contain" className="rounded" />
            </div>
            <div className="w-[220px] h-[20px] left-[99px] top-[480px] absolute text-[#b9b9b9] text-[13px] font-bold">
                <input
                    type="text"
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    className="w-full h-full text-[#b9b9b9] text-[13px] font-bold bg-transparent outline-none"
                    placeholder={teamMember.GradYear}
                />
            </div>

            {/* Major */}
            <div className="w-[101px] h-[15px] left-[99px] top-[510px] absolute text-black text-[13px] font-bold">Major</div>
            <div className="absolute left-[50px] top-[515px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                <Image src={MajorImage} alt="Major Icon" layout="fill" objectFit="contain" className="rounded" />
            </div>
            <div className="w-[220px] h-[20px] left-[99px] top-[530px] absolute text-[#b9b9b9] text-[13px] font-bold">
                <input
                    type="text"
                    value={selectedMajor}
                    onChange={(e) => setSelectedMajor(e.target.value)}
                    className="w-full h-full text-[#b9b9b9] text-[13px] font-bold bg-transparent outline-none"
                    placeholder={teamMember.Major}
                />
            </div>

            {/* Phone Number */}
            <div className="w-[125px] h-[15px] left-[99px] top-[560px] absolute text-black text-[13px] font-bold">Phone Number</div>
            <div className="absolute left-[50px] top-[565px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                <Image src={PhoneNumberImage} alt="Phone Number Icon" layout="fill" objectFit="contain" className="rounded" />
            </div>
            <div className="w-[220px] h-[20px] left-[99px] top-[580px] absolute text-[#b9b9b9] text-[13px] font-bold">
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-full text-[#b9b9b9] text-[13px] font-bold bg-transparent outline-none"
                    placeholder={teamMember.Phone}
                />
            </div>

            {/* Email */}
            <div className="w-[101px] h-[15px] left-[99px] top-[610px] absolute text-black text-[13px] font-bold">E-mail</div>
            <div className="absolute left-[50px] top-[615px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                <Image src={EmailImage} alt="Email Icon" layout="fill" objectFit="contain" className="rounded" />
            </div>
            <div className="w-[220px] h-[20px] left-[99px] top-[630px] absolute text-[#b9b9b9] text-[13px] font-bold">
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-full text-[#b9b9b9] text-[13px] font-bold bg-transparent outline-none"
                    placeholder={teamMember.Email}
                />
            </div>

            {/* CWID */}
            <div className="w-[101px] h-[15px] left-[99px] top-[660px] absolute text-black text-[13px] font-bold">CWID</div>
            <div className="absolute left-[50px] top-[665px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                <Image src={CWIDImage} alt="CWID Icon" layout="fill" objectFit="contain" className="rounded" />
            </div>
            <div className="w-[220px] h-[20px] left-[99px] top-[680px] absolute text-[#b9b9b9] text-[13px] font-bold">
                {teamMember.CWID}
            </div>

            {/* Status */}
            <div className="w-[101px] h-[15px] left-[99px] top-[710px] absolute text-black text-[13px] font-bold">Status</div>
            <div className="absolute left-[50px] top-[715px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                <Image src={StatusImage} alt="Status Icon" layout="fill" objectFit="contain" className="rounded" />
            </div>
            <div className="w-[220px] h-[20px] left-[99px] top-[730px] absolute text-[#b9b9b9] text-[13px] font-bold">
                {teamMember.CWID}
            </div>
        </div>
    );
}