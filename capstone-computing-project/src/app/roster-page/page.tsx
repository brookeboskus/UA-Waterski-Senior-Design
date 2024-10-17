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
    // Email: string; // not yet implemented, need back side of card
    // Phone: string; 
    PfpImage: string;
}

export default function RosterPage() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');

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

    // filter team members based on the search query
    const filteredMembers = teamMembers.filter((member) => {
        const fullName = `${member.Fname} ${member.Lname}`.toLowerCase();
        const major = member.Major?.toLowerCase() || '';  // added null check in case they didn't fill this out
        const gradYear = member.GradYear?.toLowerCase() || '';
        const memberType = member.MemberType?.toLowerCase() || '';

        return (
            fullName.includes(searchQuery.toLowerCase()) ||
            major.includes(searchQuery.toLowerCase()) ||
            gradYear.includes(searchQuery.toLowerCase()) ||
            memberType.includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className='container mx-auto px-4 py-8 bg-gray-50 min-h-screen'>
            <h1 className='text-4xl font-bold mb-6 text-center text-[#9E1B32]'>Team Roster</h1>

            {/* search bar to find team members based on inputs like name, major, year, etc */}
            <div className='mb-6'>
                <input
                    type='text'
                    placeholder='Search for Team Members...'
                    className='w-full p-2 border border-gray-300 rounded-md text-black'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {loading ? (
                <p className='text-gray-500 text-center'>Loading roster...</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                    {filteredMembers && filteredMembers.length > 0 ? (
                        filteredMembers.map((member, index) => (
                            <div
                                key={index}
                                className='bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300 border border-gray-200 transform hover:scale-105 hover:border-[#9E1B32]'>
                                <div className='p-4'>
                                    {/* Profile Picture */}
                                    <div className='relative w-24 h-24 mb-4 mx-auto'>
                                        <Image
                                            src={member.PfpImage || BlankPfp}
                                            alt={`${member.Fname} ${member.Lname}'s profile image`}
                                            layout='fill'
                                            objectFit='cover'
                                            className='rounded-full border shadow'
                                        />
                                    </div>

                                    <h2 className='text-xl font-semibold text-gray-900 mb-1 text-center'>
                                        {member.Fname} {member.Lname}
                                    </h2>
                                    <br></br>
                                    <p className='text-gray-700'><strong>Member Type:</strong> {member.MemberType}</p>
                                    <p className='text-gray-700'><strong>Graduation Year:</strong> {member.GradYear}</p>
                                    <p className='text-gray-700'><strong>Major:</strong> {member.Major || 'N/A'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-black-500 text-center'>No team members found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
