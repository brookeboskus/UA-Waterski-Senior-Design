"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './setlist_styles.css'
import Image from 'next/image';
import BlankPfp from '../img/blankpfp.svg';
import { useRouter } from 'next/navigation';
import ReactDOMServer from 'react-dom/server';

// NOTE: One potential issue is that this page was only tested in CST. 
// While this is where we expect most users to use the page (as it is for the UA Waterski team, which is located in CST),
// the page may not work as expected in other time zones. - Lilly Eide

interface SetListReservation {
    Date: string;
    Fname: string;
    Lname: string;
    Email: string;
    RegisteredBy: string;
}

interface TeamMember {
    Fname: string;
    Lname: string;
    GradYear: string;
    MemberType: string;
    Major: string;
    PfpImage?: string;
    Email?: string;
    Phone?: string;
}

// Standard button
const Button = ({ onClick, className, children }) => {
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
};

// A pop-up centered on the page
function Popup({ children, isOpen, onClose }) {
    return (
      <div className={`popup ${isOpen ? 'open' : ''}`}>
        <div className="popup-content">
          {children}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
};

// Handles the reservation logic. Makes the API call to register for a given date
const makeReservation = async (date) => {
    try {

        const token = localStorage.getItem('token'); 
        if (!token) {
            throw new Error('No token found'); 
        }

        const payload = {
            'reserveDate': date
        };

        const response = await axios.post('http://localhost:4000/auth/setlist', payload, {
            headers: {
                Authorization: `Bearer ${token}` // send the token in the request headers to authenticate
            },
        });

        console.log('Data Received for setList:', response.data);

    } catch (error) {
        // If registration fails, show alert stating that registration failed
        console.error('Failed to make reservation', error);
        alert("An error occurred when trying to make a reservation. Please refresh the page and try again. If this repeatedly fails, contact the site administrator.");
    } finally {
        // Whether registration fails or succeeds, refresh page to show new data
        window.location.reload();
    }
};

// Handles the delete reservation logic. Makes the API call to delete a reserved date
const deleteReservation = async (date) => {
    try {

        const token = localStorage.getItem('token'); 
        if (!token) {
            throw new Error('No token found'); 
        }

        const payload = {
            headers: {
                Authorization: `Bearer ${token}` // send the token in the request headers to authenticate
            },
            data: {
                'reserveDate': date
            }
        };

        const response = await axios.delete('http://localhost:4000/auth/setlist', payload);

        console.log('Data Received for setList:', response.data);

    } catch (error) {
        // If delete fails, show alert stating that delete failed
        console.error('Failed to delete reservation', error);
        alert("An error occurred when trying to delete your reservation. Please refresh the page and try again. If this repeatedly fails, contact the site administrator.");
    } finally {
        // Whether registration fails or succeeds, refresh page to show new data
        window.location.reload();
    }
}

// Content to fill the user pop-up
function popupContent(info) {
    return (
        <div className="bg-white rounded-lg">
            <div className="p-4">
                {/* Profile Picture */}
                <div className="relative w-24 h-24 mb-4 mx-auto">
                    <Image
                        src={info.PfpImage || BlankPfp}
                        alt={`${info.Fname} ${info.Lname}'s profile image`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full border shadow"
                    />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1 text-center">
                    {info.Fname} {info.Lname}
                </h2>
                <p className="text-gray-700">
                    <strong>Member Type:</strong> {info.MemberType}
                </p>
                <p className="text-gray-700">
                    <strong>Graduation Year:</strong> {info.GradYear}
                </p>
                <p className="text-gray-700">
                    <strong>Major:</strong> {info.Major || 'N/A'}
                </p>
                <p className="text-gray-700">
                    <strong>Email:</strong> {info.Email || 'N/A'}
                </p>
                <p className="text-gray-700">
                    <strong>Phone:</strong> {info.Phone || 'N/A'}
                </p>
            </div>
        </div>   
    )
}

// Render the content to HTML and set the popup box's content to the correct user info
function setUserInfo(info) {
    var popupElement = document.getElementById("popupContent") as HTMLDivElement;
    
    if (popupElement != null) {
        popupElement.innerHTML = ReactDOMServer.renderToString(popupContent(info));
    }
};

const SetListButton = ({date, reservationState, reservationName, userInfo, setIsPopupOpen}) => {
    
    const info = userInfo;

    const handleClick = () => {
        if (reservationState == "open" && date >= Date.now()) {
            // Ensure user wants to register for given time
            if (confirm("Reserve slot for " + date.toLocaleString("en-US") + "? Press OK or Yes to continue.")) {
                makeReservation(date.getTime());
            }
        } else if (reservationState == "reservedByYou" && date >= Date.now()) {
            // Ensure user wants to cancel existing reservation
            if (confirm("Cancel reservation for " + date.toLocaleString("en-US") + "? Press OK or Yes to continue.")) {
                deleteReservation(date.getTime());
            }
        } else if (reservationState == "reservedBySomeoneElse" || (date < Date.now() && reservationState == "reservedByYou")) {
            // Show user info if someone else's registration OR if a registration by current user, but past the current time
            // This should only be callable on objects that actually contain user info, so this should be fine?
            setUserInfo(info);
            setIsPopupOpen(true);
        }
    };
    
    if (date < Date.now()) { // If date is before current time, disallow registration
        if (reservationState == "reservedBySomeoneElse") {
            return (
                <div>
                  <Button className="reservedBySomeoneElse" onClick={handleClick}>Past reservation,<br></br>reserved by {reservationName}</Button>
                </div>
            ); 
        } else if (reservationState == "reservedByYou") {
            return (
                <div>
                  <Button className="reservedBySomeoneElse" onClick={handleClick}>Past reservation,<br></br>reserved by you</Button>
                </div>
            ); 
        } else {
            return (
                <div>
                  <Button className="pastReservation" onClick={handleClick}>Past reservation,<br></br>cannot register</Button>
                </div>
            ); 
        }
    } else if (reservationState == "open") { // open slot
        return (
            <div>
              <Button className="openReservation" onClick={handleClick}>Slot available.<br></br>Click to reserve</Button>
            </div>
        ); 
    } else if (reservationState == "reservedByYou") { // reserved by current user
        return (
            <div>
              <Button className="reservedByYou" onClick={handleClick}>Slot registered by you.<br></br>Click to cancel</Button>
            </div>
        ); 
    } else { // reserved by someone else
        return (
            <div>
              <Button className="reservedBySomeoneElse" onClick={handleClick}>Reserved by<br></br>{reservationName}</Button>
            </div>
        ); 
    }
};

// Returns the first team member from the team members list whose email matches the input email, otherwise returns null
function getTeamMemberInfo(teamMembers, email) {
    for (var i = 0; i < teamMembers.length; i++) {
        if (teamMembers[i].Email == email) {
            return teamMembers[i];
        }
    }
    return null;
}

// Returns info for the given reservation if it exists, else returns null
function getReservationInfo(reservations, date) {
    for (var i = 0; i < reservations.length; i++) {
        if (new Date(reservations[i].Date).getTime() == date.getTime()) {
            return reservations[i];
        }
    }
    return null;
}

// Main set list page
export default function SetListPage() {
    const [reservations, setReservations] = useState<SetListReservation[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // initial state as null to represent loading
    const [loading, setLoading] = useState<boolean>(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isCheckingLogin, setIsCheckingLogin] = useState(true); // Track if checking login status
    const timesSet = new Set();
    const router = useRouter();

    // Set page title
    useEffect(() => {
        document.title = 'UA Waterski - Set List';
    }, []);

    // Check if the user is logged in by looking for the token in localStorage
    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoggedIn(false);
                router.push('/login-page'); // Redirect to login page if not logged in
            } else {
                setIsLoggedIn(true); // Set logged-in status
            }
            setIsCheckingLogin(false); // Done checking login status
        };

        checkToken(); // Initial check when the component mounts
    }, [router]);
    
    // Getting the roster
    useEffect(() => {
        const fetchRoster = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                if (!token) {
                    throw new Error('No token available');
                }

                const response = await axios.get<TeamMember[]>('http://localhost:4000/auth/roster', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Send token in request headers
                    },
                });

                setTeamMembers(response.data); // Set the team members data
            } catch (error) {
                console.error('Failed to fetch team roster:', error);
                router.push('/login-page'); // Redirect to login if fetch fails
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchRoster(); // Only fetch the roster if the user is logged in
        }
    }, [isLoggedIn, router]);

    // Sets up the TimeTable
    function TimeTableBody() {
        var rows = [];

        var currentWeekDropDown = document.getElementById("dateRangeDropDown") as HTMLInputElement;

        // Drop down must be created before table can be returned, so return nothing until drop down exists on document
        if (currentWeekDropDown == null) {
            return;
        }

        // Multiply by 1000 to get as milliseconds for date
        var currentWeekStartDate = new Date(Number(currentWeekDropDown.value) * 1000);

        // From 7am to 5pm
        for (var hour = 7; hour <= 17; hour++) {
            // From :00 to :45
            for (var minutes = 0; minutes < 60; minutes += 15) {
                // Special case to allow for 5pm
                if (hour == 17 && minutes != 0) {
                    continue;
                }
                
                // Cells of table
                var cells = [];
                
                // Handle 12 hour logic
                var hourString = (hour <= 12) ? hour.toString() : (hour - 12).toString();
                // Add leading zero if hours is 0 (could also do this with precision?)
                var minuteString = (minutes == 0) ? minutes.toString() + "0" : minutes.toString();
                var amPMString = (hour < 12) ? "am" : "pm";
    
                var timeString = hourString + ":" + minuteString + amPMString;
                // Set id for right-align styling
                cells.push(<td key={"timeCell_" + hour + "_" + minutes}className="timeCell">{timeString}</td>);

                for (var day = 0; day <= 6; day++) {
                    var thisButtonDate = new Date(new Date(currentWeekStartDate).setDate(currentWeekStartDate.getDate() + (day)));
                    thisButtonDate.setHours(hour);
                    thisButtonDate.setMinutes(minutes);
                    thisButtonDate.setSeconds(0);
                    thisButtonDate.setMilliseconds(0);

                    // Here, we should change reservationState depending on results from database
                    if (timesSet.has(thisButtonDate.getTime())) {
                        // Find reservation
                        // This is potentially slow depending on the amount of reservations in the 5 week time span. Maybe try to optimize later
                        let reservation = getReservationInfo(reservations, thisButtonDate);
                        if (reservation != null) {
                            // Again, this is potentially slow. See if it can be optimized later
                            let userInfo = getTeamMemberInfo(teamMembers, reservation.Email);
                            if (reservation.RegisteredBy == "you") {
                                cells.push(<td key={day + "_" + hour + "_" + minutes}><SetListButton date={thisButtonDate} reservationState={"reservedByYou"} reservationName={reservation.Fname + " " + reservation.Lname} userInfo={userInfo} setIsPopupOpen={setIsPopupOpen}></SetListButton></td>);
                            } else {
                                cells.push(<td key={day + "_" + hour + "_" + minutes}><SetListButton date={thisButtonDate} reservationState={"reservedBySomeoneElse"} reservationName={reservation.Fname + " " + reservation.Lname} userInfo={userInfo} setIsPopupOpen={setIsPopupOpen}></SetListButton></td>);
                            }
                        }
                    } else {
                        cells.push(<td key={day + "_" + hour + "_" + minutes}><SetListButton date={thisButtonDate} reservationState={"open"} reservationName={""} userInfo={null} setIsPopupOpen={setIsPopupOpen}></SetListButton></td>);
                    }
                }
                
                rows.push(<tr key={"row_" + hour + "_" + minutes}>{cells}</tr>);
            }
        }

        return (
            <tbody>
                {rows}
            </tbody>
        )

    };

    // Headers for table, as well as init for table
    function TimeTable() {
        return (
            <table id="setListTable">
                <thead>
                    <tr>
                        <th className="timeCell">Time</th>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                {TimeTableBody()}
            </table>
        )
    };

    // Initializes time table, placing dropdown above it
    const TimeTableWithDropDown = ({values, labels}) => {
        // Ensure that values and labels are filled
        if (values == null || labels == null) {
            return;
        }

        var options = [];
        for (var i = 0; i < values.length; i++) {
            options.push([values[i], labels[i]]);
        }
        // Default to selecting middle option, which should be current week
        const [selectedOption, setSelectedOption] = useState(options[2][0]);
        return (
            <div id="timeTableDiv">
                <select
                    id="dateRangeDropDown"
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}>
                    {options.map(o => (
                    <option key={o[0]} value={o[0]}>{o[1]}</option>
                    ))}
                </select>
                {TimeTable()}
            </div>
        );
    };

    // Initializes time table
    function TimeTableInit() {
        var today = new Date();
        // weekRange is the number of weeks shown before and after the current week.
        // Setting this to 2 will result in a list that containts the two weeks before the current week, the current week, and the next two weeks after the current week
        // Seems like setting it above 2 causes odd behavior. Not sure what the cause of this is. For now, leave set to 2.
        var weekRange = 2;

        var dateRanges = [];
        var values = [];
        var labels = [];

        var thisWeekSunday = new Date();
        thisWeekSunday.setDate(today.getDate() - today.getDay());

        for (var i = 0; i < (weekRange * 2) + 1; i++) {
            // Each item in dateRange is an array consisting of a start and end day for the week
            dateRanges.push([new Date(), new Date()]);
            dateRanges[i][0].setDate(today.getDate() - today.getDay() + (7 * (i - weekRange)));
            dateRanges[i][1].setDate(today.getDate() - today.getDay() + (7 * (i - weekRange)) + 6);
            labels.push(dateRanges[i][0].toLocaleDateString("en-US") + " - " + dateRanges[i][1].toLocaleDateString("en-US"));
            values.push(dateRanges[i][0].getTime() / 1000);
        }

        
        // This component holds the actual table, as well as the date dropdown in the top left
        return (
            <TimeTableWithDropDown values={values} labels={labels}></TimeTableWithDropDown>
        )
    }
    
    // Initialize date range for database lookup
    const todayDate = new Date();
    const dateRangeStart = new Date();
    dateRangeStart.setDate(todayDate.getDate() - todayDate.getDay() - 14);
    const dateRangeEnd = new Date();
    dateRangeEnd.setDate(todayDate.getDate() - todayDate.getDay() + 20);
    // End results are the Sunday that is two weeks from before the current week, and the next Saturday two weeks in advance, thus getting a 5 week period with the current week in the middle
    const dateRangeStartString = dateRangeStart.getFullYear().toString() + "-" + (dateRangeStart.getMonth() + 1).toString() + "-" + dateRangeStart.getDate().toString() + " 00:00:00";
    const dateRangeEndString = dateRangeEnd.getFullYear().toString() + "-" + (dateRangeEnd.getMonth() + 1).toString() + "-" + dateRangeEnd.getDate().toString() + " 23:59:59";

    // Get reservations on page load
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
                        startDate: dateRangeStartString,
                        endDate: dateRangeEndString
                    }
                });

                console.log('Data Received for setList:', response.data); 

                setReservations(response.data); // store profile data in state
            } catch (error) {
                console.error('Failed to fetch Reservation', error);
                alert("An error occurred when trying to fetch the Set List.\nPlease refresh the page and try again. If this repeatedly fails, contact the site administrator.");
            } finally {
                setLoading(false);
            }
        };

        fetchSetList();
    }, []);

    if (loading) {
        return <div className="text-black">Loading...</div>; // Render a loading message while data is being fetched
    }

    // Add our reservation times to timesSet to make checking faster later on
    for (var i = 0; i < reservations.length; i++) {
        timesSet.add(new Date(reservations[i].Date).getTime());
    }

    return (
        <div className="relative bg-white rounded-[5px] pageContent">
            <div>
                <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                    <div id='popupContent'>
                        Popup info here.
                    </div>
                </Popup>
            </div>
            {TimeTableInit()}
        </div>
    );
}
