"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import BlankPfp from '../img/blankpfp.svg';
import { useRouter } from 'next/navigation';
import ReactDOMServer from 'react-dom/server';
import boatSVG from '../img/boat-svgrepo-com.svg';
// import { useMediaQuery } from 'react-responsive';
// import Select, { SingleValue } from 'react-select';
import clockSVG from "../../components/img/clock-two-thirty-svgrepo-com.svg"


let APP_URL = process.env.NEXT_PUBLIC_APP_URL;

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
    SlalomDriver?: string | null;
    TrickDriver?: string | null;
    JumpDriver?: string | null;
}

const Button = ({ onClick, className, children }: { onClick: () => void; className: string; children: React.ReactNode }) => {

    return (
        <button
            className={`${className} w-full h-full block overflow-hidden text-ellipsis whitespace-pre-wrap`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

// function Popup({ children, isOpen, onClose }: { children: React.ReactNode; isOpen: boolean; onClose: () => void }) {
//     return (
//         <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//                 {children}
//                 <button onClick={onClose} className="mt-4 w-full bg-[#931b32] text-white py-2 rounded-lg hover:bg-[#8b0000]">Close</button>
//             </div>
//         </div>
//     );
// };

function Popup({ children, isOpen, onClose }: { children: React.ReactNode; isOpen: boolean; onClose: () => void }) {
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            style={{ zIndex: 1000 }} 
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-[#931b32] text-white py-2 rounded-lg hover:bg-[#8b0000]"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


const makeReservation = async (date: Date) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const payload = {
            'reserveDate': date.getTime()
        };

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

            console.log("Current APP_URL:", APP_URL);
        } else {
            console.log("oops you coded wrong, what a dummy");
        }
        await axios.post(`${APP_URL}api/setlist`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

    } catch (error) {
        console.error('Failed to make reservation', error);
        alert("An error occurred when trying to make a reservation. Please refresh the page and try again. If this repeatedly fails, contact the site administrator.");
    } finally {
        window.location.reload();
    }
};


const deleteReservation = async (date: Date) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const payload = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                'reserveDate': date.getTime()
            }
        };

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

            console.log("Current APP_URL:", APP_URL);
        } else {
            console.log("oops you coded wrong, what a dummy");
        }
        await axios.delete(`${APP_URL}api/setlist`, payload);

    } catch (error) {
        console.error('Failed to delete reservation', error);
        alert("An error occurred when trying to delete your reservation. Please refresh the page and try again. If this repeatedly fails, contact the site administrator.");
    } finally {
        window.location.reload();
    }
};

function popupContent(info: TeamMember) {
    // console.log(info);
    return (
        <div className="p-4">
            <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                    src={info.PfpImage || BlankPfp}
                    alt={`${info.Fname} ${info.Lname}'s profile image`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border-4 border-gray-300 shadow-lg"
                />
            </div>
            <h2 className="text-center text-2xl font-semibold text-gray-800">{info.Fname} {info.Lname}</h2>
            <div className="mt-2 text-gray-700 text-sm">
                <p><span className="font-bold">Status:</span> {info.MemberType}</p>
                <p><span className="font-bold">Graduation Year:</span> {info.GradYear}</p>
                <p><span className="font-bold">Major:</span> {info.Major || 'N/A'}</p>
                <p><span className="font-bold">Phone:</span> {info.Phone || 'N/A'}</p>
                <p><span className="font-bold">Slalom Driver:</span> {info.SlalomDriver}</p>
                <p><span className="font-bold">Trick Driver:</span> {info.TrickDriver}</p>
                <p><span className="font-bold">Jump Driver:</span> {info.JumpDriver}</p>
            </div>
        </div>
    );
}

function setUserInfo(info: TeamMember) {
    const popupElement = document.getElementById("popupContent") as HTMLDivElement;

    if (popupElement != null) {
        popupElement.innerHTML = ReactDOMServer.renderToString(popupContent(info));
    }
};


const SetListButton = ({
    date,
    reservationState,
    reservationName,
    userInfo,
    setIsPopupOpen,
}: {
    date: Date;
    reservationState: string;
    reservationName: string;
    userInfo: TeamMember | null;
    setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState<'reserve' | 'cancel' | null>(null);
    const info = userInfo;

    const info2: TeamMember | null = userInfo;

    const handleReservationAction = () => {
        if (modalAction === 'reserve') {
            makeReservation(date);
        } else if (modalAction === 'cancel') {
            deleteReservation(date);
        }
        setShowModal(false);
    };

    const openModal = (action: 'reserve' | 'cancel') => {
        setModalAction(action);
        setShowModal(true);
    };

    const handleClick = () => {
        if (reservationState === 'open' && date >= new Date()) {
            openModal('reserve');
        } else if (reservationState === 'reservedByYou' && date >= new Date()) {
            openModal('cancel');
        } else if (reservationState === 'reservedBySomeoneElse' || (date < new Date() && reservationState === 'reservedByYou')) {
            if (info) {
                setUserInfo(info);
                setIsPopupOpen(true);
            } else {
                console.error('User information is not available');
            }
        }
    };

    let buttonClass, buttonText;



    if (date < new Date()) {
        buttonText = reservationState === 'reservedByYou'
            // ? 'My past reservation' // past reservation made by you
            ? (
                <div className="w-full h-full">
                    <span className="hidden sm:inline">My past reservation</span>
                </div>
            )
            : reservationState === 'reservedBySomeoneElse'
                // ? `${reservationName}'s past reservation` // past reservation made by someone else
                ? (
                    <div className="w-full h-full">
                        {/* <span className="hidden sm:inline">{reservationName}'s past reservation</span> */}
                        <span className="hidden sm:inline">{`${reservationName}'s past reservation`}</span>

                    </div>
                )
                : ''; // past reserveration

        buttonClass = reservationState === 'reservedByYou'
            ? ' bg-[#855454] text-white border-2 border-transparent hover:border-[#9E1B32] w-50'
            : reservationState === 'reservedBySomeoneElse'
                ? 'bg-[#404040] text-white border-2 border-transparent hover:border-black w-50'
                : 'bg-[#808080] text-black cursor-not-allowed border-2 border-transparent hover:border-black w-50';
    } else {

        buttonClass = reservationState === 'open'
            ? 'bg-[#D7D7E0] text-black border-2 border-transparent hover:border-green-200 sm:hover:border-gray-500 w-full h-full'
            : reservationState === 'reservedByYou'
                ? 'bg-black text-white hover:border-green-50 sm:hover:border-gray-500 w-full h-full'
                : 'bg-[#800020] text-white w-full h-full border border-0 hover:border-white';


        if (info2 != null) {
            if (info2.SlalomDriver === "Yes" || info2.JumpDriver === "Yes" || info2.TrickDriver === "Yes") {
                console.log("YES IM A DRIVER")
                console.log("BOAT SVG", boatSVG)

                buttonText = reservationState === 'open'
                    ? (
                        <div className="w-full h-full">
                            <span className="hidden sm:inline">Slot available</span>
                        </div>
                    )
                    : reservationState === 'reservedByYou'
                        ? (
                            <div className="w-full h-full flex items-center justify-center bg-[#ACACB5] text-black border border-black hover:text-white">
                                <span className="hidden sm:inline text-center ">Click to cancel reservation</span>
                            </div>
                        )
                        : (
                            <div className="w-full h-full space-y-2">
                                <div className="hidden sm:block space-y-2">
                                    <div>
                                        <Image src={boatSVG.src} alt="Boat SVG" width={24} height={24} className="ml-16" />
                                    </div>
                                    <div>Reserved by {reservationName}</div>
                                </div>
                            </div>
                        );


            } else {
                console.log("NO IM NOT A DRIVER")

                buttonText = reservationState === 'open'
                    ? (
                        <div className="w-full h-full">
                            <span className="visible sm:invisible">Slot available</span>
                        </div>
                    ) : reservationState === 'reservedByYou'
                        ? 'Slot reserved by you. Click to cancel'
                        : `Reserved by ${reservationName}`;

            }
        } 
        else {
            console.log("NO INFO");
            buttonText = reservationState === 'open'
                ? (
                    <div className={`w-full h-full flex items-center justify-center ${reservationState === 'open' ? 'bg-green-400 sm:bg-transparent' : ''}`}>
                        <span className="hidden sm:inline text-center">Slot available</span>
                    </div>
                ) : reservationState === 'reservedByYou'
                    ? 'Slot reserved by you. Click to cancel'
                    : `Reserved by ${reservationName}`;
        }

    }

    return (
        <>
            <Button onClick={handleClick} className={`${buttonClass} w-full h-full`}>
                {buttonText}
            </Button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center">
                        <h3 className="text-2xl font-semibold mb-4 text-[#9E1B32]">
                            {modalAction === 'reserve' ? 'Confirm Reservation' : 'Cancel Reservation'}
                        </h3>
                        <p className="text-gray-700">
                            {modalAction === 'reserve'
                                ? `Would you like to reserve this slot for ${date.toLocaleString('en-US')}?`
                                : `Would you like to cancel your reservation for ${date.toLocaleString('en-US')}?`}
                        </p>
                        <div className="flex justify-center mt-6 space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReservationAction}
                                className="bg-[#9E1B32] text-white px-4 py-2 rounded-md mr-2 hover:bg-[#8B1A2B]"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

function getTeamMemberInfo(teamMembers: TeamMember[], email: string): TeamMember | null {
    return teamMembers.find(member => member.Email === email) || null;
}

function getReservationInfo(reservations: SetListReservation[], date: Date): SetListReservation | null {
    return reservations.find(reservation => new Date(reservation.Date).getTime() === date.getTime()) || null;
}

export default function SetListPage() {
    const [reservations, setReservations] = useState<SetListReservation[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const timesSet = new Set();
    const router = useRouter();

    const todayDate = new Date();
    const dateRangeStart = new Date();
    dateRangeStart.setDate(todayDate.getDate() - todayDate.getDay() - 14);
    const dateRangeEnd = new Date();
    dateRangeEnd.setDate(todayDate.getDate() - todayDate.getDay() + 20);

    const dateRangeStartString = `${dateRangeStart.getFullYear()}-${(dateRangeStart.getMonth() + 1)}-${dateRangeStart.getDate()} 00:00:00`;
    const dateRangeEndString = `${dateRangeEnd.getFullYear()}-${(dateRangeEnd.getMonth() + 1)}-${dateRangeEnd.getDate()} 23:59:59`;



    useEffect(() => {
        document.title = 'UA Waterski - Set List';
    }, []);

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoggedIn(false);
                router.push('/login-page');
            } else {
                setIsLoggedIn(true);
            }
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

                    console.log("Current APP_URL:", APP_URL);
                } else {
                    console.log("oops you coded wrong, what a dummy");
                }
                const response = await axios.get<TeamMember[]>(`${APP_URL}api/roster`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
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

    useEffect(() => {
        const fetchSetList = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

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

                    console.log("Current APP_URL:", APP_URL);
                } else {
                    console.log("oops you coded wrong, what a dummy");
                }
                const response = await axios.get<SetListReservation[]>(`${APP_URL}api/setlist`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        startDate: dateRangeStartString,
                        endDate: dateRangeEndString
                    }
                });

                setReservations(response.data);
            } catch (error) {
                console.error('Failed to fetch Reservation', error);
                alert("An error occurred when trying to fetch the Set List.\nPlease refresh the page and try again. If this repeatedly fails, contact the site administrator.");
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchSetList();
        }
    }, [isLoggedIn, dateRangeEndString, dateRangeStartString]);


    function TimeTableBody() {
        const rows = [];

        const currentWeekDropDown = document.getElementById("dateRangeDropDown") as HTMLInputElement;
        if (currentWeekDropDown == null) return;

        const currentWeekStartDate = new Date(Number(currentWeekDropDown.value) * 1000);

        for (let hour = 7; hour <= 17; hour++) {
            for (let minutes = 0; minutes < 60; minutes += 15) {
                if (hour === 17 && minutes !== 0) continue;

                const cells = [];
                const hourString = hour <= 12 ? hour.toString() : (hour - 12).toString();
                const minuteString = minutes === 0 ? minutes.toString() + "0" : minutes.toString();
                const amPMString = hour < 12 ? "am" : "pm";
                const timeString = hourString + ":" + minuteString + amPMString;

                cells.push(
                    <td
                        key={"timeCell_" + hour + "_" + minutes}
                        className="text-center font-medium text-gray-600 border border-gray-300 whitespace-normal break-words"
                    >
                        {timeString}
                    </td>
                );

                for (let day = 0; day <= 6; day++) {
                    const thisButtonDate = new Date(new Date(currentWeekStartDate).setDate(currentWeekStartDate.getDate() + day));
                    thisButtonDate.setHours(hour, minutes, 0, 0);

                    if (timesSet.has(thisButtonDate.getTime())) {
                        const reservation = getReservationInfo(reservations, thisButtonDate);
                        if (reservation) {
                            const userInfo = getTeamMemberInfo(teamMembers, reservation.Email);
                            const state = reservation.RegisteredBy === "you" ? "reservedByYou" : "reservedBySomeoneElse";
                            const name = reservation.Fname + " " + reservation.Lname;
                            cells.push(
                                <td key={day + "_" + hour + "_" + minutes} className="border border-gray-300">
                                    <SetListButton
                                        date={thisButtonDate}
                                        reservationState={state}
                                        reservationName={name}
                                        userInfo={userInfo}
                                        setIsPopupOpen={setIsPopupOpen}
                                    />
                                </td>
                            );
                        }
                    } else {
                        cells.push(
                            <td key={day + "_" + hour + "_" + minutes} className="border border-gray-300">
                                <SetListButton
                                    date={thisButtonDate}
                                    reservationState="open"
                                    reservationName=""
                                    userInfo={null}
                                    setIsPopupOpen={setIsPopupOpen}
                                />
                            </td>
                        );
                    }
                }

                rows.push(<tr key={"row_" + hour + "_" + minutes} className="h-20">{cells}</tr>);
            }
        }

        return <tbody>{rows}</tbody>;
    }

    function TimeTable() {
        return (
            <table className="table-fixed bg-white rounded-lg h-full text-center overflow-hidden shadow-lg border-collapse border border-gray-300 w-full">
                <thead>
                    <tr className="text-center bg-gray-300 font-semibold text-lg text-gray-800">
                        <th className="p-2 text-center border border-gray-400">
                            <span className="hidden sm:inline">Time</span>
                        </th>
                        <th className="p-2 text-center border border-gray-400">
                            <span className="hidden sm:inline">Sunday</span>
                            <span className="sm:hidden">S</span>
                        </th>
                        <th className="p-2 text-center border border-gray-400">
                            <span className="hidden sm:inline">Monday</span>
                            <span className="sm:hidden">M</span>
                        </th>
                        <th className="p-2 text-center border border-gray-400">
                            <span className="hidden sm:inline">Tuesday</span>
                            <span className="sm:hidden">T</span>
                        </th>
                        <th className="p-2 text-center border border-gray-400">
                            <span className="hidden sm:inline">Wednesday</span>
                            <span className="sm:hidden">W</span>
                        </th>
                        <th className="p-2 text-center border border-gray-400">
                            <span className="hidden sm:inline">Thursday</span>
                            <span className="sm:hidden">TR</span>
                        </th>
                        <th className="p-2 text-center border border-gray-400">
                            <span className="hidden sm:inline">Friday</span>
                            <span className="sm:hidden">F</span>
                        </th>
                        <th className="p-2 text-center border border-gray-400">
                            <span className="hidden sm:inline">Saturday</span>
                            <span className="sm:hidden">S</span>
                        </th>
                    </tr>
                </thead>
                {TimeTableBody()}
            </table>
        );
    }

    const TimeTableWithDropDown = ({
        values,
        labels
    }: {
        values: number[];
        labels: string[];
    }) => {
        const today = new Date();

        const thisWeekSunday = new Date();
        thisWeekSunday.setDate(today.getDate() - today.getDay());

        const currentWeekTimestamp = Math.floor(thisWeekSunday.getTime() / 1000);

        const defaultSelectedIndex = values.findIndex(value => value === currentWeekTimestamp);
        const [selectedOption, setSelectedOption] = useState(defaultSelectedIndex >= 0 ? values[defaultSelectedIndex] : values[Math.floor(values.length / 2)]);
        if (!values || !labels) return null;

        const options = [];
        for (let i = 0; i < values.length; i++) {
            options.push([values[i], labels[i]]);
        }

        return (
            <div className="overflow-x-auto w-full p-4">
                <div>
                    <select
                        id="dateRangeDropDown"
                        value={selectedOption}
                        onChange={e => setSelectedOption(Number(e.target.value))}
                        className="p-2 rounded-lg border-none bg-gray-600 text-lg font-bold mb-4"
                    >
                        {options.map(o => (
                            <option key={o[0]} value={o[0]}>{o[1]}</option>
                        ))}
                    </select>
                    <div>
                        {TimeTable()}
                    </div>
                </div>

                {/* legends section only for mobile view */}
                {/* <div className="md:hidden absolute top-0 right-0 flex flex-col bg-white mt-5 mr-10 p-4 rounded-lg shadow-lg border border-gray-300">
                    <table className="table-auto w-full">
                        <tbody>
                            <tr>
                                <td className="p-2 border border-gray-300 bg-green-200 text-black whitespace-nowrap mr-5">Available</td>
                                <td className="p-2 border border-gray-300 bg-[#ACACB5] text-white whitespace-nowrap mr-5">Reserved by Me</td>
                                <td className="p-2 border border-gray-300 bg-[#800020] text-white whitespace-nowrap mr-5">Reserved</td>
                                <td className="p-2 border border-gray-300 bg-[#855454] text-white whitespace-nowrap">My Previous Reservation</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}

                {/* legends section only for mobile view */}
                <div className="md:hidden fixed bottom-4 right-4 bg-white p-2 rounded-md shadow-lg border border-gray-300 w-fit text-sm">
                    <table className="table-auto">
                        <tbody>
                            <tr>
                                <td className="p-1 bg-green-200 text-black whitespace-nowrap">Available</td>
                            </tr>
                            <tr>
                                <td className="p-1 bg-[#ACACB5] text-white whitespace-nowrap">Reserved by Me</td>
                            </tr>
                            <tr>
                                <td className="p-1 bg-[#800020] text-white whitespace-nowrap">Reserved</td>
                            </tr>
                            <tr>
                                <td className="p-1 bg-[#855454] text-white whitespace-nowrap">My Previous Reservation</td>
                            </tr>
                            <tr>
                                <td className="p-1 bg-[#404040] text-white whitespace-nowrap">Previous Reservation</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
        );
    };

    function TimeTableInit() {
        const today = new Date();
        const weekRange = 2;
        const dateRanges = [];
        const values = [] as number[];
        const labels = [];

        const thisWeekSunday = new Date();
        thisWeekSunday.setDate(today.getDate() - today.getDay());

        for (let i = 0; i < (weekRange * 2) + 1; i++) {
            dateRanges.push([new Date(), new Date()]);
            dateRanges[i][0].setDate(today.getDate() - today.getDay() + (7 * (i - weekRange)));
            dateRanges[i][1].setDate(today.getDate() - today.getDay() + (7 * (i - weekRange)) + 6);
            labels.push(dateRanges[i][0].toLocaleDateString("en-US") + " - " + dateRanges[i][1].toLocaleDateString("en-US"));
            values.push(dateRanges[i][0].getTime() / 1000);
        }

        return <TimeTableWithDropDown values={values} labels={labels} />;
    }

    if (loading) {
        return <div className="text-black">Loading...</div>;
    }

    reservations.forEach(reservation => {
        timesSet.add(new Date(reservation.Date).getTime());
    });

    return (
        <div className="relative bg-gray-50 rounded-lg max-w-full overflow-x-auto p-6">
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

