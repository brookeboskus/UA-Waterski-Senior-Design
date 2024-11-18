import 'dotenv/config';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import db from '../../db';

interface UserProfilePayload {
    Fname?: string;
    Lname?: string;
    GradYear?: string;
    Major?: string;
    Phone?: string;
    MemberType?: string;
    JumpDriver?: string;
    SlalomDriver?: string;
    TrickDriver?: string;
    PfpImage?: string;
}

const updateUserProfile = async (email: string, payload: UserProfilePayload) => {
    let query = `UPDATE User SET `;
    const values = [];

    if (payload.Fname) {
        query += `Fname = ?, `;
        values.push(payload.Fname);
    }
    if (payload.Lname) {
        query += `Lname = ?, `;
        values.push(payload.Lname);
    }
    if (payload.GradYear) {
        query += `GradYear = ?, `;
        values.push(payload.GradYear);
    }
    if (payload.Major) {
        query += `Major = ?, `;
        values.push(payload.Major);
    }
    if (payload.Phone) {
        let phone = payload.Phone;
        if (phone.length === 10) {
            phone = `(${phone.slice(0, 3)})-${phone.slice(3, 6)}-${phone.slice(6)}`;
        }
        query += `Phone = ?, `;
        values.push(phone);
    }
    if (payload.MemberType) {
        query += `MemberType = ?, `;
        values.push(payload.MemberType);
    }
    if (payload.JumpDriver) {
        query += `JumpDriver = ?, `;
        values.push(payload.JumpDriver);
    }
    if (payload.SlalomDriver) {
        query += `SlalomDriver = ?, `;
        values.push(payload.SlalomDriver);
    }
    if (payload.TrickDriver) {
        query += `TrickDriver = ?, `;
        values.push(payload.TrickDriver);
    }

    if (payload.PfpImage) {
        const imageBuffer = Buffer.from(payload.PfpImage, 'base64'); // Decode Base64 to binary
        query += `PfpImage = ?, `;
        values.push(imageBuffer);
    }

    query = query.slice(0, -2); 
    query += ` WHERE Email = ?`;
    values.push(email);

    const [results] = await db.query(query, values);
    if (results && 'affectedRows' in results && results.affectedRows === 0) {
        throw new Error('User not found.');
    }
    return results;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ error: 'Authentication token missing. Please log in again.' });
        }

        const { payload } = req.body; 

        try {
            const SECRET_KEY = process.env.JWT_SECRET;
            if (!SECRET_KEY) {
                return res.status(500).json({ success: false, message: 'Server error: missing secret key for JWT.' });
            }

            const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
            const email = decoded.email;

            await updateUserProfile(email, payload);

            res.status(200).json({ success: true, message: 'Profile updated successfully.' });
        } catch (error) {
            console.error('Error during profile update:', error);
            const errorMessage = (error instanceof Error) ? error.message : 'Invalid or expired token.';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
