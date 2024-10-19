"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './setlist_styles.css'

interface SetListReservation {
    ReservationDate: string;
    Fname: string;
    Lname: string;
}

export default function SetListPage() {
    const [reservations, setReservations] = useState<SetListReservation[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function TimeTableBody() {
        var rows = [];

        for (var hour = 7; hour <= 17; hour++) {
            // From :00 to :45
            for (var minutes = 0; minutes < 60; minutes += 15) {
                // Special case to allow for 5pm
                if (hour == 17 && minutes != 0) {
                    continue;
                }
                var cells = [];
                
                // Handle 12 hour logic
                var hourString = (hour <= 12) ? hour.toString() : (hour - 12).toString();
                // Add leading zero if hours is 0 (could also do this with precision?)
                var minuteString = (minutes == 0) ? minutes.toString() + "0" : minutes.toString();
                var amPMString = (hour < 12) ? "am" : "pm";
    
                var timeString = hourString + ":" + minuteString + amPMString;
                // Set id for right-align styling
                cells.push(<td key={"timeCell_" + hour + "_" + minutes}className="timeCell">{timeString}</td>);
                // Initialize empty table cells for later modification
                for (var day = 1; day <= 5; day++) {
                    // Doesn't quite work as you'd expect... need to look into this
                    cells.push(<td key={day + "_" + hour + "_" + minutes}><button className="openReservation" onClick={() => alert("Register for " + dayNames[day] + " at " + timeString)}>Slot available. Click to reserve</button></td>);
                }
                rows.push(<tr key={"row_" + hour + "_" + minutes}>{cells}</tr>);
            }
        }

        return (
            <tbody>
                {rows}
            </tbody>
        )

    }

    function weekDropDown() {
        var today = new Date();
        // weekRange is the number of weeks shown before and after the current week.
        // Setting this to 2 will result in a list that containts the two weeks before the current week, the current week, and the next two weeks after the current week
        // Seems like setting it above 2 causes odd behavior. Not sure what the cause of this is.
        var weekRange = 2;

        var dateRanges = [];

        var optionsList = [];

        for (var i = 0; i < (weekRange * 2) + 1; i++) {
            // Each item in dateRange is an array consisting of a start and end day for the week
            dateRanges.push([new Date(), new Date()]);
            dateRanges[i][0].setDate(today.getDate() - today.getDay() + (7 * (i - weekRange)) + 1);
            dateRanges[i][1].setDate(today.getDate() - today.getDay() + (7 * (i - weekRange)) + 5);
        }

        // Previous (weekRange) weeks
        for (var i = 0; i < weekRange; i++) {
            optionsList.push(<option key={"prevWeek" + i} value={i}>{dateRanges[i][0].toLocaleDateString("en-US") + " - " + dateRanges[i][1].toLocaleDateString("en-US")}</option>);
        }

        // Current week
        optionsList.push(<option key="currentWeek" value={weekRange}>{dateRanges[Math.floor(weekRange / 2) + 1][0].toLocaleDateString("en-US") + " - " + dateRanges[Math.floor(weekRange / 2) + 1][1].toLocaleDateString("en-US")}</option>);

        // Next (weekRange) weeks
        for (var i = 0; i < weekRange; i++) {
            optionsList.push(<option key={"nextWeek" + i} value={i + weekRange + 1}>{dateRanges[i + weekRange + 1][0].toLocaleDateString("en-US") + " - " + dateRanges[i + weekRange + 1][1].toLocaleDateString("en-US")}</option>);
        }

        // Need to set an onChange handler apparently?
        return (
            <select id="dateRangeDropDown" defaultValue={weekRange}>
                {optionsList}
            </select>
        )
    }
    

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
                alert("An error occurred when trying to fetch the Set List. Please contact the site administrator.");
            } finally {
                setLoading(false);
            }
        };

        fetchSetList();
    }, []);
// lake sign up sheet
    if (loading) {
        return <div className="text-black">Loading...</div>; // Render a loading message while data is being fetched
    }

    const firstReservation = reservations.length > 0 ? reservations[0] : undefined;
    const secondReservation = reservations.length > 0 ? reservations[1] : undefined;
    
    return (
        <div className="relative bg-white rounded-[5px]">
            {weekDropDown()}
            {/* <select id="dateRangeDropDown">
                {dropDownOptions()}
                <option>Sept. 30, 2024 - Oct. 4, 2024</option>
                <option>Oct. 7, 2024 - Oct. 11, 2024</option>
                <option>Oct. 14, 2024 - Oct. 18, 2024</option>
                <option>Oct. 21, 2024 - Oct. 25, 2024</option>
                <option>Oct. 28, 2024 - Nov. 1, 2024</option>
            </select> */}
            
            <table id="setListTable">
                <thead>
                    <tr>
                        <th className="timeCell">Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>
                </thead>
                {TimeTableBody()}
            </table>
            {/* Conditionally render the team member info only if teamMember is defined */}
            {firstReservation ? (
                <>
                    <h1 className="text-black PoppinsFont">The items below are to be deleted soon. Leaving them for now to keep up with how to access reservations. - Lilly</h1>
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
