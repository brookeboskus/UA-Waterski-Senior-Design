import db from '../../db.js';

export const getMeetingNotes = async (req, res) => {
    const query = 'SELECT * FROM meeting_notes ORDER BY date DESC';
    
    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database query error' });
    }
};

export const addMeetingNote = async (req, res) => {
    const { title, content } = req.body;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const query = 'INSERT INTO meeting_notes (title, content, date) VALUES (?, ?, ?)';
    
    try {
        const [result] = await db.query(query, [title, content, formattedDate]);
        res.status(201).json({
            id: result.insertId,
            title: title,
            content: content,
            date: formattedDate,
        });
    } catch (err) {
        console.error('Failed to add note:', err);
        res.status(500).json({ error: 'Failed to add note' });
    }
};

export const deleteMeetingNote = async (req, res) => {
    const { id } = req.query;  
    const query = 'DELETE FROM meeting_notes WHERE id = ?';
    
    try {
        await db.query(query, [id]);
        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        console.error('Failed to delete note:', err);
        res.status(500).json({ error: 'Failed to delete note' });
    }
};

const meetingNotesHandler = (req, res) => {
    if (req.method === 'GET') {
        return getMeetingNotes(req, res);
    } else if (req.method === 'POST') {
        return addMeetingNote(req, res);
    } else if (req.method === 'DELETE') {
        return deleteMeetingNote(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default meetingNotesHandler;
