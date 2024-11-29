import db from '../../db.js';

const getRoster = async (req, res) => {
    try {
        const [results] = await db.query(
            'SELECT CWID, Fname, Lname, GradYear, MemberType, Major, Phone, Email, PfpImage, SlalomDriver, TrickDriver, JumpDriver FROM User'
        );

        const rosterWithImages = results.map((user) => {
            if (user.PfpImage) {
                const base64Image = user.PfpImage.toString('base64');
                user.PfpImage = `data:image/png;base64,${base64Image}`;
            }
            return user;
        });

        res.status(200).json(rosterWithImages);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Database error' });
    }
};

const deleteMember = async (req, res) => {
    const { CWID } = req.query; 

    if (!CWID) {
        return res.status(400).json({ message: 'CWID is required to delete a member.' });
    }

    try {
        const [result] = await db.query('DELETE FROM User WHERE CWID = ?', [CWID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Member not found.' });
        }

        res.status(200).json({ message: 'Member deleted successfully.' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Database error.' });
    }
};

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return getRoster(req, res);
    } else if (req.method === 'DELETE') {
        return deleteMember(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' }); 
    }
}
