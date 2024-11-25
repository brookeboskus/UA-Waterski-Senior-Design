"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import BlankPfp from '../img/blankpfp.svg';
import React from 'react';
import Select, { SingleValue, MultiValue } from 'react-select';
import { useRouter } from 'next/navigation';

let APP_URL = process.env.NEXT_PUBLIC_APP_URL;


const yearOptions = [
    { value: 'Freshman', label: 'Freshman' },
    { value: 'Sophomore', label: 'Sophomore' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Senior', label: 'Senior' },
];

const roleOptions = [
    { value: 'Athlete', label: 'Athlete' },
    { value: 'Officer', label: 'Officer' },
];

const sortOptions = [
    { value: 'firstName', label: 'Sort by First Name' },
    { value: 'lastName', label: 'Sort by Last Name' },
];

interface TeamMember {
    Fname: string;
    Lname: string;
    GradYear: string;
    MemberType: string;
    Major: string;
    PfpImage: string;
    Email?: string;
    Phone?: string;
    SlalomDriver?: string;
    TrickDriver?: string;
    JumpDriver?: string;
}

interface Option {
    value: string;
    label: string;
}

export default function RosterPage() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedYears, setSelectedYears] = useState<MultiValue<Option>>([]);
    const [selectedRoles, setSelectedRoles] = useState<MultiValue<Option>>([]);
    const [selectedSortOption, setSelectedSortOption] = useState<SingleValue<Option>>(null);
    const [flipped, setFlipped] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        document.title = 'UA Waterski - Roster';
    }, []);

    const [isCheckingLogin, setIsCheckingLogin] = useState(true);

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoggedIn(false);
                router.push('/login-page');
            } else {
                setIsLoggedIn(true);
            }
            setIsCheckingLogin(false);
        };

        checkToken();
    }, [router]);

    useEffect(() => {
        const fetchRoster = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token available');
                }

                // const response = await axios.get<TeamMember[]>('http://localhost:4000/auth/roster', {
                //     headers: {
                //         'Authorization': `Bearer ${token}`,
                //     },
                // });

                if (
                    window.location.host.includes("brian") ||
                    window.location.host.includes("lilly") ||
                    window.location.host.includes("brooke") ||
                    window.location.host.includes("anastasia")
                ) {
                    const host = window.location.host;
                    const baseDomain = "uawaterski.com";
        
                    if (host !== `www.${baseDomain}` && host.endsWith(baseDomain)) {
                        APP_URL = `https://${host}/`;
                    }
        
                    // console.log("Current APP_URL:", APP_URL);
                } else {
                    console.log("oops you coded wrong, what a dummy");
                }
                const response = await axios.get<TeamMember[]>(`${APP_URL}api/roster`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTeamMembers(response.data);
            } catch (error) {
                console.error('Failed to fetch team roster:', error);
                router.push('/login-page');
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchRoster();
        }
    }, [isLoggedIn, router]);

    const handleYearChange = (selectedOptions: MultiValue<Option>) => {
        setSelectedYears(selectedOptions);
    };

    const handleRoleChange = (selectedOptions: MultiValue<Option>) => {
        setSelectedRoles(selectedOptions);
    };

    if (isCheckingLogin || isLoggedIn === null) {
        return null;
    }

    if (!isLoggedIn) {
        return null;
    }

    const filteredMembers = teamMembers
        .filter((member) => {
            const fullName = `${member.Fname} ${member.Lname}`.toLowerCase();
            const major = member.Major?.toLowerCase() || '';
            const gradYear = member.GradYear?.toLowerCase() || '';
            const memberType = member.MemberType?.toLowerCase() || '';

            const matchesYear = selectedYears.length > 0
                ? selectedYears.some(option => option.value.toLowerCase() === gradYear)
                : true;

            const matchesRole = selectedRoles.length > 0
                ? selectedRoles.some(option => option.value.toLowerCase() === memberType)
                : true;

            const matchesSearchQuery = fullName.includes(searchQuery.toLowerCase()) ||
                major.includes(searchQuery.toLowerCase());

            return matchesYear && matchesRole && matchesSearchQuery;
        })
        .sort((a, b) => {
            if (selectedSortOption?.value === 'firstName') {
                return a.Fname.localeCompare(b.Fname);
            } else if (selectedSortOption?.value === 'lastName') {
                return a.Lname.localeCompare(b.Lname);
            }
            return 0;
        });

    const handleFlip = (index: number) => {
        setFlipped(index);
    };

    const handleMouseLeave = (index: number) => {
        if (flipped === index) {
            setFlipped(null);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-[#9E1B32]">Team Roster</h1>

            {/* Search bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search for Team Members..."
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Filters for searching members */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Class Year */}
                <Select
                    isMulti
                    options={yearOptions}
                    value={selectedYears}
                    onChange={handleYearChange}
                    className="text-black"
                    placeholder="Filter by Class Year"
                />

                {/* Member Type */}
                <Select
                    isMulti
                    options={roleOptions}
                    value={selectedRoles}
                    onChange={handleRoleChange}
                    className="text-black"
                    placeholder="Filter by Member Type"
                />

                {/* First Name / Last Name */}
                <Select
                    options={sortOptions}
                    value={selectedSortOption}
                    onChange={(option) => setSelectedSortOption(option)}
                    className="text-black"
                    placeholder="Sort by Name"
                    isClearable={true}
                />
            </div>

            {loading ? (
                <p className="text-gray-500 text-center">Loading roster...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {filteredMembers && filteredMembers.length > 0 ? (
                        filteredMembers.map((member, index) => (
                            <div
                                key={index}
                                className={`relative perspective w-full h-72 border border-gray-200 transform hover:scale-105`}
                                onClick={() => handleFlip(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                <div className={`flip-card ${flipped === index ? 'flipped' : ''}`}>
                                    <div className="flip-card-front bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden h-full">
                                        <div className="p-4">
                                            <div className="relative w-24 h-24 mb-4 mx-auto">
                                                <Image
                                                    src={member.PfpImage || BlankPfp}
                                                    alt={`${member.Fname} ${member.Lname}'s profile image`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-full border shadow"
                                                />
                                            </div>
                                            <h2 className="text-xl font-semibold text-gray-900 mb-1 text-center">
                                                {member.Fname} {member.Lname}
                                            </h2>
                                            <p className="text-gray-700">
                                                <strong>Status:</strong> {member.MemberType}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong>Graduation Year:</strong> {member.GradYear}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong>Major:</strong> {member.Major || 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flip-card-back bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden p-4 text-black h-full">
                                        <div className="relative w-24 h-24 mb-4 mx-auto">
                                            <Image
                                                src={member.PfpImage || BlankPfp}
                                                alt={`${member.Fname} ${member.Lname}'s profile image`}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-full border shadow"
                                            />
                                        </div>
                                        <h2 className="text-xl font-semibold text-center mb-1">
                                            {member.Fname} {member.Lname}
                                        </h2>
                                        <p>
                                            <strong>Email:</strong> {member.Email || 'N/A'}
                                        </p>
                                        <p>
                                            <strong>Phone:</strong> {member.Phone || 'N/A'}
                                        </p>
                                        <p>
                                            <strong>Slalom Driver:</strong> {member.SlalomDriver}
                                        </p>
                                        <p>
                                            <strong>Trick Driver:</strong> {member.TrickDriver}
                                        </p>
                                        <p>
                                            <strong>Jump Driver:</strong> {member.JumpDriver}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-black-500 text-center">No team members found.</p>
                    )}
                </div>
            )}
        </div>
    );
}