// page 2 for forgot password

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
const jwt = require('jsonwebtoken');
const db = require('../../db'); 
const SECRET_KEY = process.env.JWT_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const isValidUAEmail = (email: string): boolean => {
    //pattern=".+@+(.+\.)?ua\.edu"
    const uaEmailPattern = /.+@+(.+\.)?ua\.edu/;
    return uaEmailPattern.test(email);
};

const isEmailRegistered = async (email: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM User WHERE Email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                reject(err);
            } else {
                resolve(results.length > 0);
            }
        });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;

        try {
            if (!isValidUAEmail(email)) {
                return res.status(400).json({ success: false, message: "Please use a valid University of Alabama (ua.edu) email address." });
            }

            const emailExists = await isEmailRegistered(email);
            if (!emailExists) {
                return res.status(400).json({ success: false, message: "This email address is not registered for an account with the UA Waterski Team." });
            }

            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
            const resetLink = `${APP_URL}/reset-password?token=${token}`;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_EMAIL,
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.GMAIL_EMAIL,
                to: email,
                subject: 'Password Reset Request',
                text: `Click the following link to reset your password: ${resetLink}`,
                html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ success: true, message: "Password reset link sent to your email address." });
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ success: false, error: "Failed to send password reset link." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
