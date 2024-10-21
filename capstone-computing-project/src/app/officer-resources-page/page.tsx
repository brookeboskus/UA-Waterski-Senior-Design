// a. Depth Chart (i. Skier rankings for our team) b. fundraising addresses c. alumni contacts d. meeting notes

"use client";
import { useState, useEffect } from 'react';
import PouchDB from 'pouchdb'; 

const db = new PouchDB('meeting_notes'); 

function MeetingNotes({ isEditing, setIsEditing, notes, setNotes }: any) {
    const [openNoteId, setOpenNoteId] = useState<number | null>(null);
    const [newNote, setNewNote] = useState({ title: '', content: '' });
    const [file, setFile] = useState<File | null>(null); 

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const result = await db.allDocs({ include_docs: true });
                const fetchedNotes = result.rows.map(row => row.doc);
                setNotes(fetchedNotes);
            } catch (error) {
                console.error('Error fetching notes from PouchDB:', error);
            }
        };

        fetchNotes();
    }, []);

    const addNewNote = async () => {
        if (newNote.title && newNote.content) {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            const newNoteData = {
                _id: new Date().toISOString(), 
                title: `${newNote.title} - ${formattedDate}`,
                date: formattedDate,
                content: newNote.content,
            };

            try {
                await db.put(newNoteData); 
                setNotes([...notes, newNoteData]);
                setNewNote({ title: '', content: '' }); 
                setIsEditing(false); 
            } catch (error) {
                console.error('Error adding new note to PouchDB:', error);
            }
        }
    };

    const deleteNote = async (id: string) => {
        try {
            const noteToDelete = await db.get(id);
            await db.remove(noteToDelete);
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error('Error deleting note from PouchDB:', error);
        }
    };

    const toggleNote = (event: React.MouseEvent, id: number) => {
        event.stopPropagation();
        setOpenNoteId(openNoteId === id ? null : id);
    };

    return (
        <div
            className="min-h-screen bg-gray-100 py-8"
            onClick={(event) => event.stopPropagation()}
        >
            <div className="container mx-auto px-4">
                {isEditing && (
                    <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Add New Meeting Note</h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                            className="w-full mb-4 p-2 border border-gray-300 rounded"
                        />
                        <textarea
                            placeholder="Content"
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                            className="w-full mb-4 p-2 border border-gray-300 rounded"
                        ></textarea>

                        <label className="block mb-2">Upload file (optional):</label>
                        <input type="file" onChange={(event) => setFile(event.target.files ? event.target.files[0] : null)} className="block mb-4" />

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
                            key={note._id}
                            className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:border-[#9E1B32] transition duration-300 cursor-pointer"
                            onClick={(event) => toggleNote(event, note._id)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900">{note.title}</h2>
                                    <p className="text-gray-600 text-sm">{note.date}</p>
                                </div>
                                {isEditing && (
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            deleteNote(note._id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>

                            {openNoteId === note._id && (
                                <div className="mt-4 text-gray-800">
                                    <p>{note.content}</p>
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

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-[#9E1B32] mb-8">Officer Resources</h1>

                {/* Depth Chart Section */}
                <section
                    className="mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 border-transparent hover:border-[#9E1B32]"
                    onClick={() => toggleSection('depth-chart')}
                >
                    <h2 className="text-2xl font-semibold text-gray-800">Depth Chart</h2>
                    <p className="text-gray-600">
                        Skier rankings for our team. View the performance and rankings of each team member based on their recent performances.
                    </p>
                    {openSection === 'depth-chart' && (
                        <div className="mt-4 text-gray-700">
                            <p>Depth Chart details will be added here...</p>
                        </div>
                    )}
                </section>

                {/* Fundraising Section */}
                <section
                    className="mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 border-transparent hover:border-[#9E1B32]"
                    onClick={() => toggleSection('fundraising')}
                >
                    <h2 className="text-2xl font-semibold text-gray-800">Fundraising Addresses</h2>
                    <p className="text-gray-600">
                        Addresses for current and upcoming fundraising activities. Use this to organize fundraising efforts and stay updated on goals.
                    </p>
                    {openSection === 'fundraising' && (
                        <div className="mt-4 text-gray-700">
                            <p>Fundraising Addresses will be added here...</p>
                        </div>
                    )}
                </section>

                {/* Alumni Contacts Section */}
                <section
                    className="mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 border-transparent hover:border-[#9E1B32]"
                    onClick={() => toggleSection('alumni-contacts')}
                >
                    <h2 className="text-2xl font-semibold text-gray-800">Alumni Contacts</h2>
                    <p className="text-gray-600">
                        Access the contact information of team alumni to foster relationships and networking for team growth and sponsorships.
                    </p>
                    {openSection === 'alumni-contacts' && (
                        <div className="mt-4 text-gray-700">
                            <p>Alumni contact information will be added here...</p>
                        </div>
                    )}
                </section>

                {/* Meeting Notes Section */}
                <section
                    className="mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 border-transparent hover:border-[#9E1B32]"
                    onClick={() => toggleSection('meeting-notes')}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Meeting Notes</h2>
                        {openSection === 'meeting-notes' && (
                            <button
                                className="bg-[#9E1B32] text-white px-4 py-2 rounded-lg hover:bg-[#7E1626]"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setIsEditing(!isEditing);
                                }}
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                        )}
                    </div>
                    <p className="text-gray-600">
                        Stay updated with meeting notes and action items from officer meetings. Ensure everyone is on the same page with decisions.
                    </p>
                    {openSection === 'meeting-notes' && (
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
