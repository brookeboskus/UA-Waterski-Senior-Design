// a. Depth Chart (i. Skier rankings for our team) b. fundraising addresses c. alumni contacts d. meeting notes

"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import RosterPage from "../roster-page/page";
import ScrollToTop from '../../components/ScrollToTop';
import confirmAccountSVG from '../../components/img/confirmaccount.svg';
import denyAccountSVG from '../../components/img/denyaccount.svg';

let APP_URL = process.env.NEXT_PUBLIC_APP_URL;


type Note = {
    id: number;
    title: string;
    content: string;
    date: Date;
};

interface MeetingNotesProps {
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function MeetingNotes({ isEditing, setIsEditing, notes, setNotes }: MeetingNotesProps) {
    const [newNote, setNewNote] = useState({ title: "", content: "" });
    const [openNoteId, setOpenNoteId] = useState<number | null>(null);

    const fetchNotes = useCallback(async () => {
        try {
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
            const response = await axios.get(`${APP_URL}api/meetingnotes`);

            const formattedNotes = response.data.map((note: Note) => ({
                ...note,
                date: new Date(note.date)
            }));
            // console.log("Received Notes:", formattedNotes);
            setNotes(formattedNotes);
        } catch (error) {
            console.error("Error fetching meeting notes:", error);
        }
    }, [setNotes]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const addNewNote = async () => {
        if (!newNote.title) {
            alert('Please add a title for the note');
            return;
        }

        try {
            const noteData = {
                title: newNote.title,
                content: newNote.content || '',
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

                // console.log("Current APP_URL:", APP_URL);
            } else {
                console.log("oops you coded wrong, what a dummy");
            }

            await axios.post(`${APP_URL}api/meetingnotes`, noteData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            await fetchNotes();
            setNewNote({ title: '', content: '' });
            setIsEditing(false);
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };


    const deleteNote = async (id: number) => {
        try {
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
            await axios.delete(`${APP_URL}api/meetingnotes?id=${id}`);
            fetchNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const toggleNote = (event: React.MouseEvent, id: number) => {
        event.stopPropagation();
        setOpenNoteId(openNoteId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8" onClick={(event) => event.stopPropagation()}>
            <div className="container mx-auto px-4">
                {isEditing && (
                    <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-[#DA425D]">Add New Meeting Note</h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                            className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
                        />
                        <textarea
                            placeholder="Content (optional)"
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                            className="w-full mb-4 p-2 border border-gray-300 text-black rounded"
                        ></textarea>
                        <button
                            className="bg-[#9E1B32] text-white px-4 py-2 rounded-lg hover:bg-[#7E1626]"
                            onClick={addNewNote}
                        >
                            Add to Meeting Notes
                        </button>
                    </div>
                )}

                <div className="grid gap-6">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:border-[#9E1B32] transition duration-300 cursor-pointer overflow-x-auto"
                            onClick={(event) => toggleNote(event, note.id)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900">{note.title}</h2>
                                    <p className="text-gray-600 text-sm">
                                        {note.date.toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                                {isEditing && (
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => deleteNote(note.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>

                            {openNoteId === note.id && (
                                <div className="mt-4 text-gray-800">
                                    <pre>{note.content}</pre>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


interface User {
    Email: string;
    Fname: string;
    Lname: string;
}

interface ConfirmMemberRegistrationProps {
    pendingUsers: User[];
    handleAction: (email: string, action: 'confirm' | 'deny') => void;
}

function ConfirmMemberRegistration({ pendingUsers, handleAction }: ConfirmMemberRegistrationProps) {
    return (
        <div className="flex flex-col items-center min-h-[50vh] bg-gray-100 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Confirm Member Registration</h1>
            <div className="w-full max-w-4xl">
                {pendingUsers.length === 0 ? (
                    <p className="text-lg text-gray-700 text-center">No pending registrations to confirm.</p>
                ) : (
                    <ul className="space-y-4">
                        {pendingUsers.map(user => (
                            <li key={user.Email} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium text-gray-900">{user.Fname} {user.Lname}</p>
                                    <p className="text-sm text-gray-600">{user.Email}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                        onClick={() => handleAction(user.Email, 'confirm')}
                                    >
                                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                        onClick={() => handleAction(user.Email, 'deny')}
                                    >
                                        <svg fill="#000000" width="25" height="25" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <title>cancel2</title>
                                            <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default function OfficerResourcesPage() {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isOfficer, setIsOfficer] = useState<boolean>(false);
    const [isCheckingLogin, setIsCheckingLogin] = useState(true);
    const router = useRouter();
    const manageMembersRef = useRef<HTMLDivElement>(null);

    const [manageMembersMode, setManageMembersMode] = useState<'roster' | 'confirm'>('roster');

    const [pendingUsers, setPendingUsers] = useState<User[]>([]);



    useEffect(() => {
        const fetchPendingUsers = async () => {
            try {
                const response = await axios.get('/api/pendingRegistrations');
                setPendingUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch pending users:', error);
            }
        };

        fetchPendingUsers();
    }, []);

    const handleAction = async (email: string, action: 'confirm' | 'deny') => {
        try {
            await axios.post('/api/confirmRegistrations', { email, action });
            setPendingUsers(pendingUsers.filter(user => user.Email !== email));
        } catch (error) {
            console.error(`Failed to ${action} user:`, error);
        }
    };

    useEffect(() => {
        document.title = "UA Waterski - Officer Resources";
    }, []);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login-page");
                return;
            }

            try {
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
                } else {
                    console.log("oops you coded wrong, what a dummy");
                }
                const response = await axios.get(`${APP_URL}api/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { MemberType } = response.data;
                setIsLoggedIn(true);
                setIsOfficer(MemberType === "Officer");
                if (MemberType !== "Officer") {
                    router.push("/");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                router.push("/login-page");
            } finally {
                setIsCheckingLogin(false);
            }
        };

        checkLoginStatus();
    }, [router]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                manageMembersRef.current &&
                !manageMembersRef.current.contains(event.target as Node)
            ) {
                if (openSection === "manage-members") {
                    setOpenSection(null);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSection]);

    if (isCheckingLogin) {
        return null;
    }

    if (!isLoggedIn || !isOfficer) {
        return null;
    }

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-[#9E1B32] mb-8">Officer Resources</h1>

                {/* Manage Members Section */}
                <section
                    ref={manageMembersRef}
                    className={`mb-8 p-6 bg-white rounded-lg shadow-lg transition-shadow duration-300 border-2 hover:border-[#9E1B32] ${openSection === "manage-members" ? "border-[#9E1B32]" : "border-transparent"
                        }`}
                >
                    <div
                        className="cursor-pointer"
                        onClick={() => toggleSection("manage-members")}
                    >
                        <h2 className="text-2xl font-semibold text-gray-800">Manage Members</h2>
                        <p className="text-gray-600">
                            Manage our team members, their roles, and profile information.
                            If the user has put inappropriate information (even their profile picture, this section lets the admin change such info)
                        </p>
                    </div>
                    {openSection === "manage-members" && (
                        <div className="mt-4 text-gray-700">
                            <p>Manage members section is only editable for the admin account.</p>
                            <br></br>
                            <div className="flex space-x-4 mb-4">
                                <button
                                    className={`px-4 py-2 rounded-lg ${manageMembersMode === 'roster' ? 'bg-[#9E1B32] text-white' : 'bg-gray-200 text-gray-800'}`}
                                    onClick={() => setManageMembersMode('roster')}
                                >
                                    Roster Page
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-lg ${manageMembersMode === 'confirm' ? 'bg-[#9E1B32] text-white' : 'bg-gray-200 text-gray-800'}`}
                                    onClick={() => setManageMembersMode('confirm')}
                                >
                                    Confirm Member Registration
                                </button>
                            </div>
                            {manageMembersMode === 'roster' ? <RosterPage /> : <ConfirmMemberRegistration pendingUsers={pendingUsers} handleAction={handleAction} />}
                        </div>
                    )}
                </section>

                {/* Meeting Notes Section */}
                <section
                    className="mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 border-transparent hover:border-[#9E1B32]"
                    onClick={() => toggleSection("meeting-notes")}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Meeting Notes</h2>
                        {openSection === "meeting-notes" && (
                            <button
                                className="bg-[#9E1B32] text-white px-4 py-2 rounded-lg hover:bg-[#7E1626]"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setIsEditing(!isEditing);
                                }}
                            >
                                {isEditing ? "Cancel" : "Edit"}
                            </button>
                        )}
                    </div>
                    <p className="text-gray-600">
                        Stay updated with meeting notes and action items from officer meetings. Ensure everyone
                        is on the same page with decisions.
                    </p>
                    {openSection === "meeting-notes" && (
                        <div onClick={(event) => event.stopPropagation()}>
                            <MeetingNotes
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                                notes={notes}
                                setNotes={setNotes}
                            />
                        </div>
                    )}
                </section>

                {/* Depth Chart Section */}
                <section
                    className="mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 border-transparent hover:border-[#9E1B32]"
                    onClick={() => toggleSection("depth-chart")}
                >
                    <h2 className="text-2xl font-semibold text-gray-800">Depth Chart</h2>
                    <p className="text-gray-600">
                        Skier rankings for our team. View the performance and rankings of each team member based
                        on their recent performances.
                    </p>
                    {openSection === "depth-chart" && (
                        <div className="mt-4 text-gray-700">
                            <p>Depth Chart details will be added here...</p>
                        </div>
                    )}
                </section>
                <section
                    className="mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 border-transparent hover:border-[#9E1B32]"
                    onClick={() => toggleSection("fundraising")}
                >
                    <h2 className="text-2xl font-semibold text-gray-800">Fundraising Addresses</h2>
                    <p className="text-gray-600">
                        Addresses for current and upcoming fundraising activities. Use this to organize
                        fundraising efforts and stay updated on goals.
                    </p>
                    {openSection === "fundraising" && (
                        <div className="mt-4 text-gray-700">
                            <p>Fundraising Addresses will be added here...</p>
                        </div>
                    )}
                </section>

                {/* Alumni Contact Section*/}
                <section
                    className="mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 border-transparent hover:border-[#9E1B32]"
                    onClick={() => toggleSection("alumni-contacts")}
                >
                    <h2 className="text-2xl font-semibold text-gray-800">Alumni Contacts</h2>
                    <p className="text-gray-600">
                        Access the contact information of team alumni to foster relationships and networking for
                        team growth and sponsorships.
                    </p>
                    {openSection === "alumni-contacts" && (
                        <div className="mt-4 text-gray-700">
                            <p>Alumni contact information will be added here...</p>
                        </div>
                    )}
                </section>
            </main>
            <ScrollToTop />
        </div>
    );
}