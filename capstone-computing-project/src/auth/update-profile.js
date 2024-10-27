const bcrypt = require('bcrypt');
const db = require('../../db');

module.exports.updateProfile = async (req, res) => {
    const { email, fname, lname, cwid, phone, gradYear, major } = req.body;
    const pfpimage = req.file ? req.file.buffer : null;
    // Handle getting and updating profile data
    // if (req.method === 'GET') {
    //     // Logic to fetch and return current profile data
    // } else if (req.method === 'POST') {
    //     // Logic to update profile information in the database
    // }
    try {
        // Find the user by email or CWID (assumes these are unique)
        db.query('SELECT * FROM User WHERE Email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            // Check if user exists
            if (!results || results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Prepare the fields to update
            const updates = {
                Fname: fname || results[0].Fname,
                Lname: lname || results[0].Lname,
                CWID: cwid || results[0].CWID,
                Phone: phone || results[0].Phone,
                GradYear: gradYear || results[0].GradYear,
                Major: major || results[0].Major,
                PfpImage: pfpimage ? pfpimage : results[0].PfpImage, // Only update if a new image is provided

            };



            // Update the user in the database
            db.query(
                `UPDATE User SET Fname = ?, Lname = ?, CWID = ?, Phone = ?, GradYear = ?, Major = ?, PfpImage = ?
                 WHERE Email = ?`,
                [
                    updates.Fname, updates.Lname, updates.CWID, updates.Phone,
                    updates.GradYear, updates.Major, updates.PfpImage,

                    email
                ],
                (err, result) => {
                    if (err) {
                        console.error('Database update error:', err);
                        return res.status(500).json({ message: 'Database error' });
                    }
                    res.status(200).json({ message: 'Profile updated successfully!' });
                }
            );
        });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};