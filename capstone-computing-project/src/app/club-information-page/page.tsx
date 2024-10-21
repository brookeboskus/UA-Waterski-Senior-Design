// //a. officer roles b. Bi-laws c. team history d. team drivers e. team judges


"use client";
import { useState } from "react";
import Image from 'next/image';
import waterskiClubInfoPhoto1 from '../../components/img/waterski-club-info-1 1.svg';

export default function ClubInfo() {
    const [activeSection, setActiveSection] = useState<string>('roles');
    const [isBylawsExpanded, setIsBylawsExpanded] = useState<boolean>(false);

    const toggleBylaws = () => {
        setIsBylawsExpanded(!isBylawsExpanded);
    };

    const sections = {
        roles: (
            <div>
                <h2 className="text-3xl font-bold text-[#9E1B32] mb-4">Officer Roles</h2>
                <p className="text-gray-700 leading-relaxed">
                    The executive body consists of a President, Vice-President, Secretary, Treasurer, and Team Captain. Each role holds specific responsibilities critical to the team’s success.
                </p>
            </div>
        ),
        bilaws: (
            <div>
                <h2 className="text-3xl font-bold text-[#9E1B32] mb-4">Bi-Laws</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Active members may drive the team boat only after the member’s driving and safety skills are assessed and approved by one officer.
                </p>

                <button
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-400 mb-6"
                    onClick={toggleBylaws}
                >
                    {isBylawsExpanded ? "Collapse Bi-Laws" : "Expand Bi-Laws"}
                </button>
                <div className="border-t border-gray-700 my-2"></div>
                <br></br>

                {isBylawsExpanded && (
                    <div className="text-gray-700 leading-relaxed space-y-8">
                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE I—Name</h3>
                            <p className="pl-4">For all intents and purposes, this sport club of The University of Alabama shall be called The University of Alabama Waterski Team.</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE II—Purpose</h3>
                            <p className="pl-4">The purpose of the University of Alabama Waterski Team shall be to organize, promote, and direct intercollegiate waterskiing events at the University of Alabama and its competitors as a sports discipline of the National Collegiate Water Ski Association (NCWSA).</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE III—Membership</h3>
                            <p className="pl-4">A. Any enrolled undergraduate or graduate student at the University of Alabama who maintains a 2.0 grade point average shall be eligible for membership.</p>
                            <p className="pl-4">B. Membership in registered student organizations shall be open to all students of The University of Alabama, without regard to race, religion, sex, ability status, national origin, color, age, gender identity, gender expression, sexual identity, or veteran status.</p>
                            <p className="pl-4">C. Members must pay dues of $500. Active members must also be members of USA Waterski for insurance and liability purposes.</p>
                            <p className="pl-4">D. Active members in good standing have access to the team’s practice facility (Lymanland USA), team equipment, and team gas.</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE IV—Meetings</h3>
                            <p className="pl-4">The team meets every Monday evening during the fall and occasionally during the spring. Time and location will be determined by the president and advisor.</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE V—Executive Body</h3>
                            <p className="pl-4">A. The executive body consists of a President, Vice-President, Secretary, Treasurer, and Team Captain.</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE VI—Elections</h3>
                            <p className="pl-4">A. All officials are elected on a yearly basis by popular vote at a designated team meeting.</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE VII—Funds</h3>
                            <p className="pl-4">A. Travel budgets and specific purchase requests are paid by individual ski team members as needed. Other club expenditures such as lake rental, boat storage, electricity, team boat, tournament entry fees, and hotel rooms are paid with collected money from semester dues, FAC and SGA allocations, and received donations.</p>
                            <p className="pl-4">B. State provisions for allocation of any bank account funds held in the name of the organization in the event that the organization goes defunct or is terminated with The SOURCE.</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE VIII—Affiliations</h3>
                            <p className="pl-4">A. The University of Alabama Waterski Team is a member of the National Collegiate Waterski Association (NCWSA). The team is also affiliated with USA Waterski, requiring all ski team members to be paying members of USA Waterski for insurance and liability purposes.</p>
                            <p className="pl-4">B. The team must renew membership with the NCWSA each year by paying the annual dues. Members must individually renew their USA Waterski membership by paying the annual dues.</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE IX—Amendments</h3>
                            <p className="pl-4">A. Amendments to the bylaws must be approved by a 2/3 vote of the active members present at a designated team meeting.</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE XII—Bylaws</h3>
                            <p className="pl-4">A. Active members may drive the team boat only after the member’s driving and safety skills are assessed and approved by one officer.</p>
                            <p className="pl-4">B. Bylaws must be reviewed as a team annually and signed by each member of the Alabama Water Ski Team.</p>
                        </div>
                    </div>
                )}
            </div>
        ),
        drivers: (
            <div>
                <h2 className="text-3xl font-bold text-[#9E1B32] mb-4">Team Drivers</h2>
                <p className="text-gray-700 leading-relaxed">
                    Only team members who have been assessed and approved by an officer are allowed to drive the team boat.
                </p>
            </div>
        ),
        judges: (
            <div>
                <h2 className="text-3xl font-bold text-[#9E1B32] mb-4">Team Judges</h2>
                <p className="text-gray-700 leading-relaxed">
                    Judges oversee competitions and ensure that all participants adhere to the rules of the sport.
                </p>
            </div>
        ),
    };

    return (
        <div className="min-h-screen flex flex-col text-gray-800 overflow-hidden">
            {/* Club Info Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-[#9E1B32] mb-6">Club Info</h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        The University of Alabama's Water Ski Team has a proud tradition of over 30 years, bringing together passionate athletes from across the country. Our team offers a supportive environment for skiers of all skill levels, from beginners to world champions, allowing them to excel both on and off the water. As one of the top teams in the country, we focus on fostering a strong sense of community and helping our athletes grow both personally and competitively.
                    </p>
                </div>

                {/* Image Section */}
                <div className="flex justify-center mb-12">
                    <Image
                        src={waterskiClubInfoPhoto1}
                        alt="Water Ski Club Info Photo 1"
                        width={800}
                        height={500}
                    />
                </div>

                <div className="border-t border-[#9E1B32] my-12"></div>

                <div className="flex flex-col items-center mb-12">
                    {/* Section Toggle Buttons */}
                    <div className="mb-6">
                        <button
                            className={`px-4 py-2 mx-2 ${activeSection === 'roles' ? 'bg-[#9E1B32] text-white' : 'bg-white text-[#9E1B32] border border-[#9E1B32]'}`}
                            onClick={() => setActiveSection('roles')}
                        >
                            Officer Roles
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 ${activeSection === 'bilaws' ? 'bg-[#9E1B32] text-white' : 'bg-white text-[#9E1B32] border border-[#9E1B32]'}`}
                            onClick={() => setActiveSection('bilaws')}
                        >
                            Bi-Laws
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 ${activeSection === 'drivers' ? 'bg-[#9E1B32] text-white' : 'bg-white text-[#9E1B32] border border-[#9E1B32]'}`}
                            onClick={() => setActiveSection('drivers')}
                        >
                            Team Drivers
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 ${activeSection === 'judges' ? 'bg-[#9E1B32] text-white' : 'bg-white text-[#9E1B32] border border-[#9E1B32]'}`}
                            onClick={() => setActiveSection('judges')}
                        >
                            Team Judges
                        </button>
                    </div>

                    {/* Active Section Content */}
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
                        {sections[activeSection]}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 text-black py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold text-[#9E1B32] mb-8">Our Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl text-[#9E1B32] font-bold mb-2">Teamwork</h3>
                            <p className="text-gray-700">Collaboration and mutual support are the backbone of our team.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl text-[#9E1B32] font-bold mb-2">Discipline</h3>
                            <p className="text-gray-700">We believe that consistent training and discipline are the keys to success.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl text-[#9E1B32] font-bold mb-2">Excellence</h3>
                            <p className="text-gray-700">With a commitment to excellence, our team continually strives to reach new levels of achievement.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
