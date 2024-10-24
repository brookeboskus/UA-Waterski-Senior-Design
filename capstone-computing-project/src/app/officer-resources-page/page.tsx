// // //a. Depth Chart (i. Skier rankings for our team) b. fundraising addresses c. alumni contacts d. meeting notes


"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function MeetingNotes({ isEditing, setIsEditing, notes, setNotes }: any) {
    const [newNote, setNewNote] = useState({ title: "", content: "" });
    const [openNoteId, setOpenNoteId] = useState<number | null>(null);

    const fetchNotes = async () => {
        try {
            const response = await axios.get("http://localhost:4000/auth/meetingnotes");
            const formattedNotes = response.data.map((note: any) => ({
                ...note,
                date: new Date(note.date)
            }));
            console.log("Received Notes:", formattedNotes);
            setNotes(formattedNotes);
        } catch (error) {
            console.error("Error fetching meeting notes:", error);
        }
    };

    

    useEffect(() => {
        fetchNotes();
    }, [setNotes]);

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

            await axios.post('http://localhost:4000/auth/meetingnotes', noteData, {
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
            await axios.delete(`http://localhost:4000/auth/meetingnotes/${id}`);
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
                    {notes.map((note: any) => (
                        <div
                            key={note.id}
                            className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:border-[#9E1B32] transition duration-300 cursor-pointer"
                            onClick={(event) => toggleNote(event, note.id)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900">{note.title}</h2>
                                    <p className="text-gray-600 text-sm">
                                        {new Date(note.date).toLocaleDateString('en-US', {
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

export default function OfficerResourcesPage() {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [notes, setNotes] = useState<any[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isOfficer, setIsOfficer] = useState<boolean>(false); 
    const [isCheckingLogin, setIsCheckingLogin] = useState(true);
    const router = useRouter();

    // Set page title
    useEffect(() => {
        document.title = 'UA Waterski - Officer Resources';
    }, []);

    // chck user if they are logged in + they are officer or not
    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login-page'); // not logged in
                return;
            }

            try {
                const response = await axios.get('http://localhost:4000/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { MemberType } = response.data;
                setIsLoggedIn(true);
                setIsOfficer(MemberType === 'Officer'); 
                if (MemberType !== 'Officer') {
                    router.push('/'); // not officer, then go back to homepage
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                router.push('/login-page'); 
            } finally {
                setIsCheckingLogin(false); 
            }
        };

        checkLoginStatus(); 
    }, [router]);

    if (isCheckingLogin) { // if checking login status, then return null
        return null;
    }

    if (!isLoggedIn || !isOfficer) { // if not logged in or not an officer, then return null
        return null; 
    }

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-[#9E1B32] mb-8">Officer Resources</h1>

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
            </main>
        </div>
    );
}
