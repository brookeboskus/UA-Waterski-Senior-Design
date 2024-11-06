"use client"
import Image from 'next/image';  // Make sure to import Image from 'next/image'
import ellipseImage from '../../img/DefaultPFP.svg';  // Adjust the path as necessary
import ProtectedProfilePage from '../protected-profile-page/page';
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
import SaveChanges from '../../img/savechange.svg';
import DefaultPFP from '../../img/DefaultPFP.svg';
import { useSearchParams, useRouter } from 'next/navigation';



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
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [cwid, setCwid] = useState('');
    const [phone, setPhone] = useState('');
    const [gradYear, setGradYear] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    // const router = useRouter();
    // const [major, setMajor] = useState('');


    const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // console.error('No token found in localStorage');
                setError('Authentication token missing. Please log in again.');
                return;
            }

            try {
                const response = await axios.get<TeamMember>('http://localhost:4000/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // console.log('Profile data:', response.data);
                // setTeamMember(response.data);

                const data = response.data;
                setTeamMember(data);
                // console.log('Team Member:', teamMember);

            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setError('Failed to fetch profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);


    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token'); // retrieve token from localStorage
            if (!token) {
                // console.error('No token found in localStorage');
                setError('Authentication token missing. Please log in again.');
                return;
            }
            // console.log('Token retrieved for updateProfile:', token);

            const payload = {
                Fname: fname,
                Lname: lname,
                GradYear: gradYear,
                Major: selectedMajor,
                Phone: phone,
                Email: email,
                CWID: cwid
            };

            // console.log('Payload:', payload);

            const response = await fetch('/api/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ payload })
            });


            // log the response and handle based on status
            const data = await response.json();
            // console.log('Response Status:', response.status);
            // console.log('Response Data:', data);

            if (response.ok) {
                setMessage('Profile updated successfully!');
                setError('');
            } else {
                setMessage('');
                setError(data.error || 'Failed to update profile.');
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            setMessage('');
            setError('Something went wrong. Please try again.');
        }
    };








    if (!teamMember) {
        return <div>No team member data available.</div>; // no data available then say this
    }


    return (
        <div className="relative w-[417px] max-h-full h-[787px] bg-white rounded-[5px] z-40 overflow-y-auto" style={{ top: '0px', right: '5px', borderLeft: '.5px solid black' }}>
            <div className="relative w-full h-full">
                {/* Red header section */}
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

            {/* Conditionally render the team member info only if teamMember is defined */}
            {teamMember ? (
                <>
                    {/* "Your Information" Label */}
                    <div className="absolute left-[50%] top-[42%] w-full text-center text-black text-xl font-bold transform -translate-x-[50%]">
                        Your Information
                    </div>

                    {/* Profile Edit Button */}
                    <div className="absolute left-[90%] top-[150%] transform -translate-x-[50%] mt-4 z-50">
                        <button onClick={updateProfile} className="w-[380px] h-[57px] left-0 top-5 absolute bg-[#9e1b32] rounded-[30px]" style={{ left: '-350px', top: '-20' }}>
                            <div className="w-[333.31px] h-[32.41px] left-[31.84px] top-[12.29px] absolute text-center text-[#f7f7f7] text-[20px] font-bold">Save</div>
                        </button>
                    </div>

                    {/* Fields Container */}
                    <div className="p-2 relative space-y-4" style={{ top: '-420px' }}>
                        {[
                            { label: "First Name", value: fname, onChange: setFname, placeholder: teamMember.Fname },
                            { label: "Last Name", value: lname, onChange: setLname, placeholder: teamMember.Lname },
                            { label: "Grad Year", value: gradYear, onChange: setGradYear, placeholder: teamMember.GradYear },
                            { label: "Major", value: selectedMajor, onChange: setSelectedMajor, placeholder: teamMember.Major },
                            { label: "Phone Number", value: phone, onChange: setPhone, placeholder: teamMember.Phone },
                            { label: "Email", value: email, onChange: setEmail, placeholder: teamMember.Email },
                            { label: "CWID", value: cwid, onChange: setCwid, placeholder: teamMember.CWID },
                            { label: "Status", value: cwid, onChange: setCwid, placeholder: teamMember.CWID }
                        ].map((field, idx) => (
                            <div key={idx} className="w-half bg-white rounded-[20px] border-2 border-[#9e1b32] p-4">
                                <div className="text-black text-[13px] font-bold">{field.label}</div>
                                <input
                                    type="text"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="w-full h-[20px] text-[#b9b9b9] text-[13px] font-bold bg-transparent outline-none"
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div>No team member data available.</div>
            )}
        </div>
    );
}    