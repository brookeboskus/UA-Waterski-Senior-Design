"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import BlankPfp from '../img/blankpfp.svg';

interface TeamMember {
    Fname: string;
    Lname: string;
    GradYear: string;
    MemberType: string;
    Major: string;
}

export default function RosterPage() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const fetchRoster = async () => {
            try {
                const response = await axios.get<TeamMember[]>('http://localhost:4000/auth/roster');
                setTeamMembers(response.data);
            } catch (error) {
                console.error('Failed to fetch team roster:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoster();
    }, []);

    return (
        <div className='container mx-auto px-4 py-8 bg-gray-50 min-h-screen'>
            <h1 className='text-4xl font-bold mb-6 text-center text-[#0F766E]'>Team Roster</h1>
            {loading ? (
                <p className='text-gray-500 text-center'>Loading roster...</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {teamMembers && teamMembers.length > 0 ? (
                        teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className='bg-white shadow-md hover:shadow-2xl rounded-lg overflow-hidden transition-all duration-300 border border-gray-200 transform hover:scale-105 hover:bg-[#C7C7C7]'>
                                <div className='p-6'>
                                    {/* Profile Picture */}
                                    <div className='relative w-full h-64 mb-4'>
                                        <Image
                                            src={BlankPfp}
                                            alt={`${member.Fname} ${member.Lname}'s profile image`}
                                            layout='fill'
                                            objectFit='cover'
                                            className='rounded-full'
                                        />
                                    </div>

                                    <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
                                        {member.Fname} {member.Lname}
                                    </h2>
                                    <p className='text-blue-400'><strong>Major:</strong> {member.Major ? member.Major : 'N/A'}</p>
                                    <p className='text-blue-400'><strong>Graduation Year:</strong> {member.GradYear}</p>
                                    <p className='text-blue-400'><strong>Member Type:</strong> {member.MemberType}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-500 text-center'>No team members found.</p>
                    )}
                </div>
            )}
        </div>
    );
}