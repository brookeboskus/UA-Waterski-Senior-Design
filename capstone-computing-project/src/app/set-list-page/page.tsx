"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// This doesn't currently work. Struggling to figure out how to make the url endpoint take the start and end date parameters.

interface SetListReservation {
    ReservationDate: string;
    Fname: string;
    Lname: string;
}

// lake sign up sheet
export default function SetListPage() {
    const [reservations, setReservations] = useState<SetListReservation[]>([]);

    useEffect(() => {
        const fetchSetList = async () => {
            try {
                // This doesn't do what you would expect right now. Struggling to understand this part
                const response = await axios.get<SetListReservation[]>('http://localhost:4000/auth/setlist', {
                    params: {
                        startDate: '2024-10-14 00:00:00',
                        endDate: '2024-10-18 23:59:59'
                    }
                });
                setReservations(response.data);
            } catch (error) {
                console.error('Failed to fetch reservations:', error);
            }
        };

        fetchSetList();
    }, []);

    const firstReservation = reservations.length > 0 ? reservations[0] : undefined;
    
    return (
        <div className="w-[428px] h-[926px] relative bg-white rounded-[5px]">
            <div className="w-[428px] h-[328px] left-0 top-0 absolute bg-[#9e1b32]"></div> 
            <div className="w-[191px] h-[26px] left-[-8px] top-[358px] absolute text-center text-black text-xl font-bold">Your Information</div>

            {/* Conditionally render the team member info only if teamMember is defined */}
            {firstReservation ? (
                <>
                    <div className="w-[101px] h-3.5 left-[99px] top-[397px] absolute text-black text-[15px] font-bold">Reservation Date</div>
                    <div className="w-[220px] h-7 left-[99px] top-[418px] absolute text-[#b9b9b9] text-[15px] font-bold">{firstReservation.ReservationDate}</div>

                    <div className="w-[101px] h-3.5 left-[99px] top-[397px] absolute text-black text-[15px] font-bold">First Name</div>
                    <div className="w-[220px] h-7 left-[99px] top-[418px] absolute text-[#b9b9b9] text-[15px] font-bold">{firstReservation.Fname}</div>

                    <div className="w-[101px] h-3.5 left-[101px] top-[449px] absolute text-black text-[15px] font-bold">Last Name</div>
                    <div className="w-[220px] h-7 left-[99px] top-[472px] absolute text-[#b9b9b9] text-[15px] font-bold">{firstReservation.Lname}</div>

                </>
            ) : (
                <div>No reservation data available.</div>
            )}
        </div>
    );
}
