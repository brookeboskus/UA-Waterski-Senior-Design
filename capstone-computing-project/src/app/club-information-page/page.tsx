//a. officer roles b. Bi-laws c. team history d. team drivers e. team judges
"use client";

import Image from 'next/image';
import waterskiClubInfoPhoto1 from '../../components/img/waterski-club-info-1 1.svg'

export default function ClubInfo() {
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

                <div className="flex flex-wrap justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md flex-grow">
                        <h2 className="text-3xl font-bold text-[#9E1B32] mb-4">Team History</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Founded over three decades ago, the Alabama Water Ski Team started as a small group of dedicated skiers. Over the years, we’ve grown into a nationally ranked powerhouse, competing at the highest level in collegiate water skiing. Our rich history is marked by continuous improvement, hard work, and the pursuit of excellence, making us one of the most respected teams in the NCWSA.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md flex-grow">
                        <h2 className="text-3xl font-bold text-[#9E1B32] mb-4">Competitive Events</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We focus on three primary events in competitive water skiing: Slalom, Trick, and Jump. Each of our athletes specializes in one or more of these events, training rigorously to compete at the highest level. Whether it's carving through a slalom course, performing complex trick routines, or flying off the jump ramp, our skiers are committed to pushing their limits and striving for personal bests.
                        </p>
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
                            <p className="text-gray-700">Collaboration and mutual support are the backbone of our team. Every success on the water is a shared victory, with teammates constantly encouraging one another to improve and reach new heights.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl text-[#9E1B32] font-bold mb-2">Discipline</h3>
                            <p className="text-gray-700">We believe that consistent training and discipline are the keys to success. Our athletes are dedicated to perfecting their techniques and pushing through challenges to meet their goals.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl text-[#9E1B32] font-bold mb-2">Excellence</h3>
                            <p className="text-gray-700">With a commitment to excellence, our team continually strives to reach new levels of achievement, both in competition and in personal growth. Every year, we aim to improve and surpass the expectations set before us.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
