"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// This doesn't currently work. Struggling to figure out how to make the url endpoint take the start and end date parameters.

interface SetListReservation {
    ReservationDate: string;
    Fname: string;
    Lname: string;
}


export default function SetListPage() {
    const [reservations, setReservations] = useState<SetListReservation[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSetList = async () => {
            try {
                const token = localStorage.getItem('token'); 
                if (!token) {
                    throw new Error('No token found'); 
                }

                const response = await axios.get<SetListReservation[]>('http://localhost:4000/auth/setlist', {
                    headers: {
                        Authorization: `Bearer ${token}` // send the token in the request headers to authenticate
                    },
                    params: {
                        startDate: '2024-3-14 00:00:00',
                        endDate: '2024-10-20 23:59:59'
                    }
                });

                console.log('Data Recieved for setList:', response.data); 

                setReservations(response.data); // store profile data in state
            } catch (error) {
                console.error('Failed to fetch Reservation', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSetList();
    }, []);
// lake sign up sheet


    const firstReservation = reservations.length > 0 ? reservations[0] : undefined;
    const secondReservation = reservations.length > 0 ? reservations[1] : undefined;
    
    return (
        <div className="w-[428px] h-[926px] relative bg-white rounded-[5px]">
            <div className="w-[428px] h-[328px] left-0 top-0 absolute bg-[#9e1b32]"></div> 
            <div className="w-[191px] h-[26px] left-[-8px] top-[358px] absolute text-center text-black text-xl font-bold">Your Information</div>

            {/* Conditionally render the team member info only if teamMember is defined */}
            {firstReservation ? (
                <>
                    <div className="w-[1524px] h-[806px] relative">
    <div className="w-[1524px] h-[806px] left-0 top-0 absolute bg-[#f3f3f3] rounded-[10px]"></div>
    <div className="w-[324px] h-[37px] left-[17px] top-[14px] absolute bg-[#d9d9d9] rounded-[10px]"></div>
    <div className="left-[26px] top-[21px] absolute text-black text-2xl font-medium font-['Poppins'] leading-normal">Oct. 7th - Oct. 13th, 2024</div>
    <div className="w-6 h-6 left-[317px] top-[21px] absolute"></div>
    <div className="w-[1101px] h-[724px] left-[17px] top-[63px] absolute bg-white rounded-[10px]"></div>
    <div className="w-[262px] h-6 left-[115px] top-[152px] absolute bg-[#9e1b32] rounded-[5px]"></div>
    <div className="w-[239px] h-6 left-[115px] top-[208px] absolute bg-[#9e1b32] rounded-[5px]"></div>
    <div className="w-[1101px] h-[0px] left-[17px] top-[99px] absolute border border-black"></div>
    <div className="left-[26px] top-[70px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">Time</div>
    <div className="w-[724px] h-[0px] left-[111px] top-[63px] absolute origin-top-left rotate-90 border border-black"></div>
    <div className="w-[724px] h-[0px] left-[392px] top-[63px] absolute origin-top-left rotate-90 border border-black"></div>
    <div className="w-[724px] h-[0px] left-[587px] top-[63px] absolute origin-top-left rotate-90 border border-black"></div>
    <div className="left-[26px] top-[99px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">7:00am</div>
    <div className="left-[118px] top-[99px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">{firstReservation.Fname}</div>
    <div className="left-[399px] top-[99px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">etc...</div>
    <div className="left-[118px] top-[123px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">{secondReservation?.Fname}</div>
    <div className="left-[115px] top-[180px] absolute text-black text-base font-medium font-['Poppins'] leading-normal"></div>
    <div className="left-[115px] top-[260px] absolute text-black text-base font-medium font-['Poppins'] leading-normal"></div>
    <div className="left-[118px] top-[208px] absolute text-white text-base font-medium font-['Poppins'] leading-normal"></div>
    <div className="left-[118px] top-[152px] absolute text-white text-base font-medium font-['Poppins'] leading-normal"></div>
    <div className="left-[26px] top-[152px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">7:30am</div>
    <div className="left-[28px] top-[180px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">7:45am</div>
    <div className="left-[26px] top-[123px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">7:15am</div>
    <div className="w-[1101px] h-[0px] left-[17px] top-[123px] absolute border border-black"></div>
    <div className="w-[1102px] h-[0px] left-[16px] top-[147px] absolute border border-black"></div>
    <div className="w-[1102px] h-[0px] left-[16px] top-[180px] absolute border border-black"></div>
    <div className="left-[28px] top-[208px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">8:00am</div>
    <div className="left-[28px] top-[260px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">5:00pm</div>
    <div className="left-[29px] top-[236px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">etc...</div>
    <div className="w-[1102px] h-[0px] left-[16px] top-[204px] absolute border border-black"></div>
    <div className="w-[1102px] h-[0px] left-[16px] top-[236px] absolute border border-black"></div>
    <div className="w-[1102px] h-[0px] left-[16px] top-[260px] absolute border border-black"></div>
    <div className="left-[118px] top-[70px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">Monday</div>
    <div className="left-[399px] top-[69px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">Tuesday</div>
    <div className="left-[594px] top-[69px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">Wednesday</div>
    <div className="w-[724px] h-[0px] left-[773px] top-[63px] absolute origin-top-left rotate-90 border border-black"></div>
    <div className="left-[780px] top-[69px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">Thursday</div>
    <div className="w-[724px] h-[0px] left-[934px] top-[63px] absolute origin-top-left rotate-90 border border-black"></div>
    <div className="left-[941px] top-[69px] absolute text-black text-base font-medium font-['Poppins'] leading-normal">Friday</div>
</div>
                   

                </>
            ) : (
                <div>No reservation data available.</div>
            )}
        </div>
    );
}
