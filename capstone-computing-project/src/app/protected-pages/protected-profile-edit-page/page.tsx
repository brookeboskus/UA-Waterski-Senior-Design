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

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;


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
                // const response = await axios.get<TeamMember>('http://localhost:4000/auth/profile', {
                //     headers: {
                //         Authorization: `Bearer ${token}`
                //     }
                // });

                const response = await axios.get<TeamMember>(`${APP_URL}api/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
        <div className="relative w-[417px] max-h-full h-[787px] bg-white rounded-[5px] z-40 overflow-y-auto flex flex-col items-center overflow-y-auto" style={{ top: '39px', right: '5px', borderLeft: '3px solid black' }}>
                <div className="relative w-full h-full">
                    {/* red header section */}
                    <div className="absolute left-0 top-0 w-full h-[280px] bg-[#9e1b32] z-10"></div>

                    {/* user profile image */}
                    <div className="absolute left-[50%] top-[5%] w-[230px] h-[230px] rounded-full z-20 transform -translate-x-[50%] overflow-hidden" style={{ top: '-2px' }}>
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

   
            <div className="w-[433px] h-[866px] relative bg-white rounded-lg shadow-lg">
             

                {/* Input Fields */}
                <div className="absolute p-5" style={{top: '290px'}}>
                    {/* First Name */}
                    <div className="text-[#b9b9b9] text-[15px] font-bold">First Name</div>
                    <div className="w-[380px] h-[68px] bg-white rounded-[20px] border-2 border-[#9e1b32] mt-1">
                        <input
                            type="text"
                            value={teamMember.Fname}
                            onChange={(e) => setFname(e.target.value)}
                            className="w-full h-full text-black text-[15px] font-bold bg-transparent outline-none p-4"
                            placeholder="Your First Name"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="text-[#b9b9b9] text-[15px] font-bold mt-5">Last Name</div>
                    <div className="w-[380px] h-[68px] bg-white rounded-[20px] border-2 border-[#9e1b32] mt-1">
                        <input
                            type="text"
                            value={teamMember.Lname}
                            onChange={(e) => setLname(e.target.value)}
                            className="w-full h-full text-black text-[15px] font-bold bg-transparent outline-none p-4"
                            placeholder="Your Last Name"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="text-[#b9b9b9] text-[15px] font-bold mt-5">Phone Number</div>
                    <div className="w-[380px] h-[68px] bg-white rounded-[20px] border-2 border-[#9e1b32] mt-1">
                        <input
                            type="text"
                            value={teamMember.Phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-full text-black text-[15px] font-bold bg-transparent outline-none p-4"
                            placeholder="123-456-7890"
                        />
                    </div>

                    {/* Email */}
                    <div className="text-[#b9b9b9] text-[15px] font-bold mt-5">E-mail</div>
                    <div className="w-[380px] h-[68px] bg-white rounded-[20px] border-2 border-[#9e1b32] mt-1">
                        <input
                            type="text"
                            value={teamMember.Email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-full text-black text-[15px] font-bold bg-transparent outline-none p-4"
                            placeholder="youremail@email.com"
                        />
                    </div>
                </div>

                {/* Save Button */}

                

                <div  onClick={updateProfile} className="w-[380px] h-[57px] bg-[#9e1b32] rounded-[30px] absolute left-[18px] bottom-[30px]">
                    <button className="w-full h-full text-[#f7f7f7] text-xl font-bold font-['Inter']">Save</button>
                </div>
            </div>
            <br>
        </br>
        <br>
        </br>
            </div>
        </div>
       
    );
}